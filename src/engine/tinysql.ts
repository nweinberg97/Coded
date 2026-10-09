// TinySQL — a small, honest teaching interpreter for a subset of SQL.
//
// It is NOT a real database: data lives in memory, there are no indexes,
// joins, constraints beyond PRIMARY KEY, concurrency, or durability. It exists
// so learners can type real SQL syntax and watch each step (find table → filter
// rows → sort → return) without downloading a WebAssembly database engine.
//
// Supported:
//   CREATE TABLE t (col TYPE [PRIMARY KEY], ...)        TYPE: INTEGER | REAL | TEXT | BOOLEAN
//   INSERT INTO t (a, b) VALUES (1, 'x'), (2, 'y')
//   SELECT * | a, b | COUNT(*) FROM t [WHERE …] [ORDER BY col [ASC|DESC]] [LIMIT n]
//   UPDATE t SET a = 1, b = 'x' [WHERE …]
//   DELETE FROM t [WHERE …]
//   WHERE: = != <> < <= > >= LIKE, IS [NOT] NULL, AND, OR, NOT, parentheses
//   Comments: -- to end of line

export type Value = number | string | boolean | null;
export type ColType = 'INTEGER' | 'REAL' | 'TEXT' | 'BOOLEAN';
export type Column = { name: string; type: ColType; pk: boolean };
export type Row = Record<string, Value>;
export type Table = { name: string; columns: Column[]; rows: Row[]; nextRowId: number };
export type Database = { tables: Record<string, Table> };

export type StatementResult = {
  sql: string;
  line: number;
  kind: 'create' | 'insert' | 'select' | 'update' | 'delete';
  table: string;
  message: string;
  trace: string[];
  columns?: string[];
  rows?: Value[][];
  affected?: number;
};

export type RunResult = {
  results: StatementResult[];
  error?: { message: string; line: number; sql: string };
  db: Database;
};

export function emptyDatabase(): Database {
  return { tables: {} };
}

export function cloneDatabase(db: Database): Database {
  const tables: Record<string, Table> = {};
  for (const [k, t] of Object.entries(db.tables)) {
    tables[k] = { ...t, columns: t.columns.map((c) => ({ ...c })), rows: t.rows.map((r) => ({ ...r })) };
  }
  return { tables };
}

// ---------------- tokenizer ----------------

type Tok =
  | { k: 'word'; v: string; upper: string; line: number; pos: number }
  | { k: 'num'; v: number; line: number; pos: number }
  | { k: 'str'; v: string; line: number; pos: number }
  | { k: 'sym'; v: string; line: number; pos: number }
  | { k: 'eof'; line: number; pos: number };

export class SqlError extends Error {
  constructor(
    message: string,
    public line: number,
  ) {
    super(message);
  }
}

const KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE',
  'TABLE', 'PRIMARY', 'KEY', 'ORDER', 'BY', 'ASC', 'DESC', 'LIMIT', 'AND', 'OR', 'NOT', 'NULL',
  'IS', 'LIKE', 'TRUE', 'FALSE', 'COUNT', 'INTEGER', 'REAL', 'TEXT', 'BOOLEAN',
];

function tokenize(src: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  let line = 1;
  while (i < src.length) {
    const ch = src[i];
    if (ch === '\n') {
      line++;
      i++;
      continue;
    }
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (ch === '-' && src[i + 1] === '-') {
      while (i < src.length && src[i] !== '\n') i++;
      continue;
    }
    if (ch === "'" || ch === '"') {
      const quote = ch;
      let j = i + 1;
      let s = '';
      while (j < src.length) {
        if (src[j] === quote && src[j + 1] === quote) {
          s += quote;
          j += 2;
          continue;
        }
        if (src[j] === quote) break;
        if (src[j] === '\n') line++;
        s += src[j];
        j++;
      }
      if (j >= src.length) throw new SqlError(`A text value starting with ${quote} is never closed.`, line);
      if (quote === '"') toks.push({ k: 'word', v: s, upper: s.toUpperCase(), line, pos: i });
      else toks.push({ k: 'str', v: s, line, pos: i });
      i = j + 1;
      continue;
    }
    if (/[0-9]/.test(ch) || (ch === '-' && /[0-9]/.test(src[i + 1] ?? '') && prevAllowsSign(toks))) {
      let j = i + 1;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      const v = Number(src.slice(i, j));
      if (Number.isNaN(v)) throw new SqlError(`“${src.slice(i, j)}” isn’t a valid number.`, line);
      toks.push({ k: 'num', v, line, pos: i });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(ch)) {
      let j = i + 1;
      while (j < src.length && /[A-Za-z0-9_]/.test(src[j])) j++;
      const v = src.slice(i, j);
      toks.push({ k: 'word', v, upper: v.toUpperCase(), line, pos: i });
      i = j;
      continue;
    }
    const two = src.slice(i, i + 2);
    if (['!=', '<>', '<=', '>='].includes(two)) {
      toks.push({ k: 'sym', v: two, line, pos: i });
      i += 2;
      continue;
    }
    if ('(),;*=<>'.includes(ch)) {
      toks.push({ k: 'sym', v: ch, line, pos: i });
      i++;
      continue;
    }
    throw new SqlError(`Unexpected character “${ch}”.`, line);
  }
  toks.push({ k: 'eof', line, pos: src.length });
  return toks;
}

function prevAllowsSign(toks: Tok[]): boolean {
  const p = toks[toks.length - 1];
  return !p || p.k === 'sym' || (p.k === 'word' && KEYWORDS.includes(p.upper));
}

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

function suggest(word: string, options: string[]): string | undefined {
  let best: string | undefined;
  let bestD = 3;
  for (const o of options) {
    const d = levenshtein(word.toUpperCase(), o.toUpperCase());
    if (d < bestD) {
      bestD = d;
      best = o;
    }
  }
  return best;
}

// ---------------- parser ----------------

type Operand = { kind: 'col'; name: string } | { kind: 'lit'; value: Value };
type Cond =
  | { kind: 'cmp'; op: string; left: Operand; right: Operand }
  | { kind: 'isnull'; operand: Operand; not: boolean }
  | { kind: 'like'; operand: Operand; pattern: string; not: boolean }
  | { kind: 'and' | 'or'; a: Cond; b: Cond }
  | { kind: 'not'; c: Cond };

type Stmt =
  | { kind: 'create'; table: string; columns: Column[] }
  | { kind: 'insert'; table: string; columns: string[] | null; values: Value[][] }
  | {
      kind: 'select';
      table: string;
      columns: string[] | '*' | 'count';
      where?: Cond;
      orderBy?: { col: string; dir: 'ASC' | 'DESC' };
      limit?: number;
    }
  | { kind: 'update'; table: string; set: [string, Value][]; where?: Cond }
  | { kind: 'delete'; table: string; where?: Cond };

class Parser {
  i = 0;
  constructor(private toks: Tok[]) {}
  peek(): Tok {
    return this.toks[this.i];
  }
  next(): Tok {
    return this.toks[this.i++];
  }
  isWord(upper: string): boolean {
    const t = this.peek();
    return t.k === 'word' && t.upper === upper;
  }
  isSym(v: string): boolean {
    const t = this.peek();
    return t.k === 'sym' && t.v === v;
  }
  describe(t: Tok): string {
    if (t.k === 'eof') return 'the end of the query';
    if (t.k === 'str') return `'${t.v}'`;
    return `“${t.v}”`;
  }
  expectWord(upper: string): void {
    const t = this.peek();
    if (t.k === 'word' && t.upper === upper) {
      this.i++;
      return;
    }
    let tip = '';
    if (t.k === 'word') {
      const s = suggest(t.v, [upper]);
      if (s) tip = ` Did you mean ${upper}?`;
    }
    throw new SqlError(`Expected ${upper} but found ${this.describe(t)}.${tip}`, t.line);
  }
  expectSym(v: string): void {
    const t = this.peek();
    if (t.k === 'sym' && t.v === v) {
      this.i++;
      return;
    }
    throw new SqlError(`Expected “${v}” but found ${this.describe(t)}.`, t.line);
  }
  ident(what: string): string {
    const t = this.peek();
    if (t.k === 'word' && !['FROM', 'WHERE', 'SET', 'VALUES', 'ORDER', 'LIMIT'].includes(t.upper)) {
      this.i++;
      return t.v;
    }
    throw new SqlError(`Expected a ${what} name but found ${this.describe(t)}.`, t.line);
  }
  literal(): Value {
    const t = this.next();
    if (t.k === 'num') return t.v;
    if (t.k === 'str') return t.v;
    if (t.k === 'word' && t.upper === 'NULL') return null;
    if (t.k === 'word' && t.upper === 'TRUE') return true;
    if (t.k === 'word' && t.upper === 'FALSE') return false;
    if (t.k === 'word')
      throw new SqlError(
        `“${t.v}” isn’t a value. Text values need quotes: '${t.v}'.`,
        t.line,
      );
    throw new SqlError(`Expected a value but found ${this.describe(t)}.`, t.line);
  }
  operand(): Operand {
    const t = this.peek();
    if (t.k === 'word' && !['NULL', 'TRUE', 'FALSE'].includes(t.upper)) {
      this.i++;
      return { kind: 'col', name: t.v };
    }
    return { kind: 'lit', value: this.literal() };
  }

  statement(): Stmt {
    const t = this.peek();
    if (t.k !== 'word') throw new SqlError(`A statement must start with a command like SELECT.`, t.line);
    switch (t.upper) {
      case 'SELECT':
        return this.select();
      case 'INSERT':
        return this.insert();
      case 'UPDATE':
        return this.update();
      case 'DELETE':
        return this.delete();
      case 'CREATE':
        return this.create();
      default: {
        const s = suggest(t.v, ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE']);
        throw new SqlError(
          `Unknown command “${t.v}”.${s ? ` Did you mean ${s}?` : ' Try SELECT, INSERT, UPDATE, DELETE or CREATE.'}`,
          t.line,
        );
      }
    }
  }

  create(): Stmt {
    this.expectWord('CREATE');
    this.expectWord('TABLE');
    const table = this.ident('table');
    this.expectSym('(');
    const columns: Column[] = [];
    do {
      const name = this.ident('column');
      const tt = this.next();
      const type = tt.k === 'word' ? tt.upper : '';
      const norm: Record<string, ColType> = {
        INTEGER: 'INTEGER', INT: 'INTEGER', REAL: 'REAL', FLOAT: 'REAL', NUMERIC: 'REAL',
        TEXT: 'TEXT', VARCHAR: 'TEXT', STRING: 'TEXT', BOOLEAN: 'BOOLEAN', BOOL: 'BOOLEAN',
      };
      if (!norm[type])
        throw new SqlError(`Column “${name}” needs a type: INTEGER, REAL, TEXT or BOOLEAN.`, tt.line);
      let pk = false;
      if (this.isWord('PRIMARY')) {
        this.next();
        this.expectWord('KEY');
        pk = true;
      }
      columns.push({ name, type: norm[type], pk });
    } while (this.isSym(',') && this.next());
    this.expectSym(')');
    return { kind: 'create', table, columns };
  }

  insert(): Stmt {
    this.expectWord('INSERT');
    this.expectWord('INTO');
    const table = this.ident('table');
    let columns: string[] | null = null;
    if (this.isSym('(')) {
      this.next();
      columns = [];
      do columns.push(this.ident('column'));
      while (this.isSym(',') && this.next());
      this.expectSym(')');
    }
    this.expectWord('VALUES');
    const values: Value[][] = [];
    do {
      this.expectSym('(');
      const row: Value[] = [];
      do row.push(this.literal());
      while (this.isSym(',') && this.next());
      this.expectSym(')');
      values.push(row);
    } while (this.isSym(',') && this.next());
    return { kind: 'insert', table, columns, values };
  }

  select(): Stmt {
    this.expectWord('SELECT');
    let columns: string[] | '*' | 'count';
    if (this.isSym('*')) {
      this.next();
      columns = '*';
    } else if (this.isWord('COUNT')) {
      this.next();
      this.expectSym('(');
      this.expectSym('*');
      this.expectSym(')');
      columns = 'count';
    } else {
      columns = [];
      do columns.push(this.ident('column'));
      while (this.isSym(',') && this.next());
    }
    this.expectWord('FROM');
    const table = this.ident('table');
    const where = this.optWhere();
    let orderBy: { col: string; dir: 'ASC' | 'DESC' } | undefined;
    if (this.isWord('ORDER')) {
      this.next();
      this.expectWord('BY');
      const col = this.ident('column');
      let dir: 'ASC' | 'DESC' = 'ASC';
      if (this.isWord('ASC') || this.isWord('DESC')) dir = (this.next() as { upper: 'ASC' | 'DESC' }).upper;
      orderBy = { col, dir };
    }
    let limit: number | undefined;
    if (this.isWord('LIMIT')) {
      this.next();
      const t = this.next();
      if (t.k !== 'num' || t.v < 0 || !Number.isInteger(t.v))
        throw new SqlError('LIMIT needs a whole number, like LIMIT 3.', t.line);
      limit = t.v;
    }
    return { kind: 'select', table, columns, where, orderBy, limit };
  }

  update(): Stmt {
    this.expectWord('UPDATE');
    const table = this.ident('table');
    this.expectWord('SET');
    const set: [string, Value][] = [];
    do {
      const col = this.ident('column');
      this.expectSym('=');
      set.push([col, this.literal()]);
    } while (this.isSym(',') && this.next());
    return { kind: 'update', table, set, where: this.optWhere() };
  }

  delete(): Stmt {
    this.expectWord('DELETE');
    this.expectWord('FROM');
    const table = this.ident('table');
    return { kind: 'delete', table, where: this.optWhere() };
  }

  optWhere(): Cond | undefined {
    if (!this.isWord('WHERE')) return undefined;
    this.next();
    return this.or();
  }
  or(): Cond {
    let c = this.and();
    while (this.isWord('OR')) {
      this.next();
      c = { kind: 'or', a: c, b: this.and() };
    }
    return c;
  }
  and(): Cond {
    let c = this.not();
    while (this.isWord('AND')) {
      this.next();
      c = { kind: 'and', a: c, b: this.not() };
    }
    return c;
  }
  not(): Cond {
    if (this.isWord('NOT')) {
      this.next();
      return { kind: 'not', c: this.not() };
    }
    if (this.isSym('(')) {
      this.next();
      const c = this.or();
      this.expectSym(')');
      return c;
    }
    const left = this.operand();
    if (this.isWord('IS')) {
      this.next();
      let not = false;
      if (this.isWord('NOT')) {
        this.next();
        not = true;
      }
      this.expectWord('NULL');
      return { kind: 'isnull', operand: left, not };
    }
    let notLike = false;
    if (this.isWord('NOT')) {
      this.next();
      notLike = true;
      if (!this.isWord('LIKE')) throw new SqlError('Expected LIKE after NOT.', this.peek().line);
    }
    if (this.isWord('LIKE')) {
      this.next();
      const t = this.next();
      if (t.k !== 'str') throw new SqlError(`LIKE needs a quoted pattern, like LIKE 'Air%'.`, t.line);
      return { kind: 'like', operand: left, pattern: t.v, not: notLike };
    }
    const t = this.next();
    if (t.k !== 'sym' || !['=', '!=', '<>', '<', '<=', '>', '>='].includes(t.v)) {
      throw new SqlError(
        `Expected a comparison (=, !=, <, >, <=, >=) but found ${this.describe(t)}.`,
        t.line,
      );
    }
    return { kind: 'cmp', op: t.v === '<>' ? '!=' : t.v, left, right: this.operand() };
  }
}

// ---------------- execution ----------------

function getTable(db: Database, name: string, line: number): Table {
  const t = db.tables[name.toLowerCase()];
  if (!t) {
    const s = suggest(name, Object.values(db.tables).map((x) => x.name));
    throw new SqlError(
      `There’s no table called “${name}”.${s ? ` Did you mean ${s}?` : ' Create it first with CREATE TABLE.'}`,
      line,
    );
  }
  return t;
}

function getCol(t: Table, name: string, line: number): Column {
  const c = t.columns.find((x) => x.name.toLowerCase() === name.toLowerCase());
  if (!c) {
    const s = suggest(name, t.columns.map((x) => x.name));
    throw new SqlError(
      `Table ${t.name} has no column “${name}”.${s ? ` Did you mean ${s}?` : ` Columns are: ${t.columns.map((x) => x.name).join(', ')}.`}`,
      line,
    );
  }
  return c;
}

function coerce(c: Column, v: Value, line: number): Value {
  if (v === null) {
    if (c.pk) throw new SqlError(`${c.name} is the primary key, so it can’t be NULL.`, line);
    return null;
  }
  switch (c.type) {
    case 'INTEGER':
      if (typeof v === 'number' && Number.isInteger(v)) return v;
      if (typeof v === 'boolean') return v ? 1 : 0;
      break;
    case 'REAL':
      if (typeof v === 'number') return v;
      break;
    case 'TEXT':
      if (typeof v === 'string') return v;
      break;
    case 'BOOLEAN':
      if (typeof v === 'boolean') return v;
      if (v === 0 || v === 1) return v === 1;
      break;
  }
  throw new SqlError(
    `Type mismatch: ${c.name} is ${c.type}, but got ${typeof v === 'string' ? `'${v}'` : String(v)}.`,
    line,
  );
}

function evalOperand(o: Operand, row: Row, t: Table, line: number): Value {
  if (o.kind === 'lit') return o.value;
  return row[getCol(t, o.name, line).name] ?? null;
}

function like(value: string, pattern: string): boolean {
  const re = new RegExp(
    '^' + pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*').replace(/_/g, '.') + '$',
    'i',
  );
  return re.test(value);
}

function evalCond(c: Cond, row: Row, t: Table, line: number): boolean {
  switch (c.kind) {
    case 'and':
      return evalCond(c.a, row, t, line) && evalCond(c.b, row, t, line);
    case 'or':
      return evalCond(c.a, row, t, line) || evalCond(c.b, row, t, line);
    case 'not':
      return !evalCond(c.c, row, t, line);
    case 'isnull': {
      const v = evalOperand(c.operand, row, t, line);
      return c.not ? v !== null : v === null;
    }
    case 'like': {
      const v = evalOperand(c.operand, row, t, line);
      if (v === null) return false;
      const r = like(String(v), c.pattern);
      return c.not ? !r : r;
    }
    case 'cmp': {
      const a = evalOperand(c.left, row, t, line);
      const b = evalOperand(c.right, row, t, line);
      if (a === null || b === null) return false; // SQL: comparisons with NULL are unknown
      const x = typeof a === 'string' ? a.toLowerCase() : a;
      const y = typeof b === 'string' ? b.toLowerCase() : b;
      switch (c.op) {
        case '=':
          return x === y;
        case '!=':
          return x !== y;
        case '<':
          return x < y;
        case '<=':
          return x <= y;
        case '>':
          return x > y;
        case '>=':
          return x >= y;
      }
      return false;
    }
  }
}

export function describeCond(c: Cond): string {
  const op = (o: Operand) => (o.kind === 'col' ? o.name : typeof o.value === 'string' ? `'${o.value}'` : String(o.value));
  switch (c.kind) {
    case 'and':
      return `${describeCond(c.a)} AND ${describeCond(c.b)}`;
    case 'or':
      return `(${describeCond(c.a)} OR ${describeCond(c.b)})`;
    case 'not':
      return `NOT ${describeCond(c.c)}`;
    case 'isnull':
      return `${op(c.operand)} IS ${c.not ? 'NOT ' : ''}NULL`;
    case 'like':
      return `${op(c.operand)} ${c.not ? 'NOT ' : ''}LIKE '${c.pattern}'`;
    case 'cmp':
      return `${op(c.left)} ${c.op} ${op(c.right)}`;
  }
}

function execute(db: Database, s: Stmt, sql: string, line: number): StatementResult {
  switch (s.kind) {
    case 'create': {
      const key = s.table.toLowerCase();
      if (db.tables[key]) throw new SqlError(`A table called ${s.table} already exists.`, line);
      if (s.columns.filter((c) => c.pk).length > 1)
        throw new SqlError('A table can only have one PRIMARY KEY column here.', line);
      db.tables[key] = { name: s.table, columns: s.columns, rows: [], nextRowId: 1 };
      return {
        sql, line, kind: 'create', table: s.table,
        message: `Created table ${s.table} with ${s.columns.length} columns.`,
        trace: [
          `Define a new table named ${s.table}`,
          ...s.columns.map((c) => `Column ${c.name} holds ${c.type}${c.pk ? ' — the PRIMARY KEY (unique ID for each row)' : ''}`),
        ],
      };
    }
    case 'insert': {
      const t = getTable(db, s.table, line);
      const cols = s.columns ? s.columns.map((n) => getCol(t, n, line)) : t.columns;
      const pk = t.columns.find((c) => c.pk);
      const trace = [`Find table ${t.name} (${t.rows.length} rows)`];
      for (const vals of s.values) {
        if (vals.length !== cols.length)
          throw new SqlError(`${cols.length} columns were listed but ${vals.length} values were given.`, line);
        const row: Row = Object.fromEntries(t.columns.map((c) => [c.name, null]));
        cols.forEach((c, i) => (row[c.name] = coerce(c, vals[i], line)));
        if (pk) {
          if (row[pk.name] === null) {
            if (pk.type !== 'INTEGER') throw new SqlError(`Give ${pk.name} a value — it’s the primary key.`, line);
            row[pk.name] = Math.max(0, ...t.rows.map((r) => Number(r[pk.name]) || 0)) + 1;
          }
          if (t.rows.some((r) => r[pk.name] === row[pk.name]))
            throw new SqlError(
              `UNIQUE constraint failed: a row with ${pk.name} = ${row[pk.name]} already exists. Primary keys must be unique.`,
              line,
            );
        }
        t.rows.push(row);
        trace.push(`Add row → ${t.columns.map((c) => `${c.name}: ${fmt(row[c.name])}`).join(', ')}`);
      }
      return {
        sql, line, kind: 'insert', table: t.name, affected: s.values.length, trace,
        message: `Inserted ${s.values.length} row${s.values.length === 1 ? '' : 's'} into ${t.name}.`,
      };
    }
    case 'select': {
      const t = getTable(db, s.table, line);
      const trace = [`Find table ${t.name} (${t.rows.length} rows)`];
      let rows = t.rows;
      if (s.where) {
        const where = s.where;
        rows = rows.filter((r) => evalCond(where, r, t, line));
        trace.push(`Check every row against WHERE ${describeCond(s.where)} → ${rows.length} match`);
      } else {
        trace.push('No WHERE clause, so every row is kept');
      }
      if (s.orderBy) {
        const col = getCol(t, s.orderBy.col, line).name;
        const dir = s.orderBy.dir === 'DESC' ? -1 : 1;
        rows = [...rows].sort((a, b) => {
          const x = a[col];
          const y = b[col];
          if (x === y) return 0;
          if (x === null) return 1;
          if (y === null) return -1;
          return (x < y ? -1 : 1) * dir;
        });
        trace.push(`Sort by ${col} ${s.orderBy.dir === 'DESC' ? 'high → low' : 'low → high'}`);
      }
      if (s.limit !== undefined) {
        rows = rows.slice(0, s.limit);
        trace.push(`Keep only the first ${s.limit}`);
      }
      if (s.columns === 'count') {
        trace.push(`Count the rows → ${rows.length}`);
        return {
          sql, line, kind: 'select', table: t.name, columns: ['COUNT(*)'], rows: [[rows.length]], trace,
          message: `Counted ${rows.length} row${rows.length === 1 ? '' : 's'}.`,
        };
      }
      const cols = s.columns === '*' ? t.columns.map((c) => c.name) : s.columns.map((n) => getCol(t, n, line).name);
      trace.push(`Return column${cols.length === 1 ? '' : 's'} ${cols.join(', ')}`);
      return {
        sql, line, kind: 'select', table: t.name, columns: cols, trace,
        rows: rows.map((r) => cols.map((c) => r[c])),
        message: `Returned ${rows.length} row${rows.length === 1 ? '' : 's'}.`,
      };
    }
    case 'update': {
      const t = getTable(db, s.table, line);
      const sets = s.set.map(([n, v]) => {
        const c = getCol(t, n, line);
        return [c, coerce(c, v, line)] as const;
      });
      const pk = t.columns.find((c) => c.pk);
      const where = s.where;
      const targets = where ? t.rows.filter((r) => evalCond(where, r, t, line)) : t.rows;
      for (const [c, v] of sets) {
        if (pk && c.name === pk.name && targets.length > 0) {
          if (targets.length > 1) throw new SqlError(`Setting ${pk.name} on several rows would break uniqueness.`, line);
          if (t.rows.some((r) => r !== targets[0] && r[pk.name] === v))
            throw new SqlError(`UNIQUE constraint failed: ${pk.name} = ${v} is already used.`, line);
        }
      }
      for (const r of targets) for (const [c, v] of sets) r[c.name] = v;
      return {
        sql, line, kind: 'update', table: t.name, affected: targets.length,
        message: `Updated ${targets.length} row${targets.length === 1 ? '' : 's'} in ${t.name}.`,
        trace: [
          `Find table ${t.name} (${t.rows.length} rows)`,
          where ? `Match rows WHERE ${describeCond(where)} → ${targets.length} row(s)` : `No WHERE — this changes EVERY row (${targets.length})`,
          `Set ${sets.map(([c, v]) => `${c.name} = ${fmt(v)}`).join(', ')}`,
        ],
      };
    }
    case 'delete': {
      const t = getTable(db, s.table, line);
      const where = s.where;
      const before = t.rows.length;
      t.rows = where ? t.rows.filter((r) => !evalCond(where, r, t, line)) : [];
      const n = before - t.rows.length;
      return {
        sql, line, kind: 'delete', table: t.name, affected: n,
        message: `Deleted ${n} row${n === 1 ? '' : 's'} from ${t.name}.`,
        trace: [
          `Find table ${t.name} (${before} rows)`,
          where ? `Match rows WHERE ${describeCond(where)} → ${n} row(s)` : 'No WHERE — this deletes EVERY row',
          `Remove them → ${t.rows.length} rows left`,
        ],
      };
    }
  }
}

function fmt(v: Value): string {
  if (v === null) return 'NULL';
  if (typeof v === 'string') return `'${v}'`;
  return String(v);
}

/** Run a script of statements against a copy of `db`. Stops at the first error. */
export function runSql(script: string, db: Database = emptyDatabase()): RunResult {
  const work = cloneDatabase(db);
  const results: StatementResult[] = [];
  let toks: Tok[];
  try {
    toks = tokenize(script);
  } catch (e) {
    const err = e as SqlError;
    return { results, db: work, error: { message: err.message, line: err.line ?? 1, sql: '' } };
  }
  const p = new Parser(toks);
  while (p.peek().k !== 'eof') {
    if (p.isSym(';')) {
      p.next();
      continue;
    }
    const startTok = p.peek();
    const startPos = startTok.pos;
    try {
      const stmt = p.statement();
      const end = p.peek();
      if (!(end.k === 'eof' || (end.k === 'sym' && end.v === ';'))) {
        throw new SqlError(`Unexpected ${p.describe(end)} — did you forget a “;” between statements?`, end.line);
      }
      const sql = script.slice(startPos, end.pos).trim();
      results.push(execute(work, stmt, sql, startTok.line));
    } catch (e) {
      if (e instanceof SqlError) {
        const endIdx = script.indexOf(';', startPos);
        const sql = script.slice(startPos, endIdx === -1 ? undefined : endIdx).trim();
        return { results, db: work, error: { message: e.message, line: e.line, sql } };
      }
      throw e;
    }
  }
  return { results, db: work };
}
