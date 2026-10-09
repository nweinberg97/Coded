// Validates the curriculum: schema, IDs, knowledge-graph links, and — most
// importantly — that the evaluator grades each card's sample answers the way
// a human teacher would. Run one file with: CONTENT_FILE=internet npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { ALL_CONCEPT_IDS, CONCEPT_IDS } from '../src/content/ids';
import { evaluateAnswer } from '../src/engine/evaluate';
import type { Concept } from '../src/content/types';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/content/concepts');
const only = process.env.CONTENT_FILE;
const files = readdirSync(dir).filter(
  (f) => f.endsWith('.ts') && f !== 'index.ts' && (!only || f === `${only}.ts`),
);

const idSet = new Set(ALL_CONCEPT_IDS);

for (const file of files) {
  const trackId = file.replace('.ts', '') as keyof typeof CONCEPT_IDS;
  test(`content: ${file}`, async (t) => {
    const mod = await import(path.join(dir, file));
    const concepts: Concept[] = mod.default;
    assert.ok(Array.isArray(concepts), `${file} must default-export Concept[]`);

    await t.test('defines exactly the IDs from ids.ts, in order', () => {
      assert.deepEqual(
        concepts.map((c) => c.id),
        [...CONCEPT_IDS[trackId]],
      );
    });

    for (const c of concepts) {
      await t.test(`${c.id}`, () => {
        assert.equal(c.trackId, trackId);
        assert.ok(c.term.trim().length >= 2, `${c.id}.term`);
        for (const field of [
          'definition', 'plainEnglish', 'example', 'whyItMatters', 'question',
          'canonicalAnswer', 'hint',
        ] as const) {
          assert.ok(typeof c[field] === 'string' && c[field].trim().length > 8, `${c.id}.${field}`);
        }
        assert.ok([1, 2, 3, 4, 5].includes(c.difficulty), `${c.id}.difficulty`);
        assert.ok(c.keyIdeas.length >= 1 && c.keyIdeas.length <= 4, `${c.id} keyIdeas 1–4`);
        for (const k of c.keyIdeas) assert.ok(k.terms.length >= 2, `${c.id}/${k.id} needs ≥2 terms`);
        assert.ok(c.relatedConceptIds.length >= 1, `${c.id} needs related concepts`);
        for (const r of [...c.relatedConceptIds, ...(c.prerequisiteIds ?? [])]) {
          assert.ok(idSet.has(r), `${c.id} links to unknown id "${r}"`);
          assert.notEqual(r, c.id, `${c.id} links to itself`);
        }
        // The definition should not be circular.
        const term = c.term.toLowerCase();
        assert.ok(
          !c.definition.toLowerCase().startsWith(term + ' is ' + term),
          `${c.id} definition is circular`,
        );

        assert.equal(
          evaluateAnswer(c, c.canonicalAnswer).verdict,
          'correct',
          `${c.id}: canonicalAnswer must grade correct`,
        );
        assert.ok(c.testAnswers.correct.length >= 2, `${c.id} needs ≥2 correct test answers`);
        assert.ok(c.testAnswers.incorrect.length >= 1, `${c.id} needs ≥1 incorrect test answer`);
        for (const a of c.testAnswers.correct) {
          const r = evaluateAnswer(c, a);
          assert.equal(r.verdict, 'correct', `${c.id}: "${a}" should be correct (${r.message})`);
        }
        for (const a of c.testAnswers.partial ?? []) {
          const r = evaluateAnswer(c, a);
          assert.equal(r.verdict, 'partial', `${c.id}: "${a}" should be partial (${r.message})`);
        }
        for (const a of c.testAnswers.incorrect) {
          const r = evaluateAnswer(c, a);
          assert.equal(r.verdict, 'incorrect', `${c.id}: "${a}" should be incorrect (${r.message})`);
        }
      });
    }
  });
}
