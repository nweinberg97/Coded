// Reference solutions for every Build challenge. Used by the unit tests (SQL +
// source checks) and the browser end-to-end test (runtime checks in the real
// sandbox) to prove each challenge is actually completable.
import { CHALLENGE_BY_ID } from '../src/content/challenges';

const s = (id: string) => CHALLENGE_BY_ID[id].starter;

export const SOLUTIONS: Record<string, string> = {
  'first-webpage': `<h1>Nina's Page</h1>
<p>This is my first webpage.</p>
<p>I collect sneakers and learn to code.</p>
<ul>
  <li>Air Byte 1</li>
  <li>Loop Racer</li>
  <li>Boolean Low</li>
</ul>
`,
  'make-it-beautiful': s('make-it-beautiful')
    .replace('background: #f4f4f4;', 'background: #111;')
    .replace('padding: 8px;', 'padding: 28px;')
    .replace('color: black;', 'color: #ff5a1f;')
    .replace('border-radius: 0px;', 'border-radius: 999px;'),
  'button-counter': s('button-counter').replace(
    '    // TODO: add 1 to count, then show the new count on the button.',
    '    count = count + 1;\n    button.textContent = `Clicked ${count} times`;',
  ),
  'score-tracker': s('score-tracker')
    .replace(
      '    // TODO: if score reaches TARGET, show "🏆 Target hit!" in #message',
      '    if (score >= TARGET) {\n      document.getElementById("message").textContent = "🏆 Target hit!";\n    }',
    )
    .replace(
      '    // TODO: set score back to 0, clear the message and re-render',
      '    score = 0;\n    document.getElementById("message").textContent = "";\n    render();',
    ),
  'data-transform': s('data-transform')
    .replace(
      '    { name: "Loop Racer", price: 180, brand: "Stackwear" },',
      '    { name: "Loop Racer", price: 180, brand: "Stackwear" },\n    { name: "Promise Mid", price: 150, brand: "Loopco" },',
    )
    .replace('const affordable = sneakers; // ← use sneakers.filter(...)', 'const affordable = sneakers.filter((shoe) => shoe.price < 200);')
    .replace('document.getElementById("summary").textContent = "";', 'document.getElementById("summary").textContent = `${affordable.length} drops`;'),
  'api-inspector': s('api-inspector')
    .replace(
      '      { "id": 3, "name": "Boolean Low", "price": 95 }',
      '      { "id": 3, "name": "Boolean Low", "price": 95 },\n      { "id": 4, "name": "Loop Racer", "price": 180 }',
    )
    .replace(
      '      // TODO 3: if (!response.ok) show "Couldn\'t load drops" and stop',
      '      if (!response.ok) {\n        document.getElementById("status").textContent = "Couldn\'t load drops";\n        return [];\n      }',
    )
    .replace('li.textContent = drop.name; // TODO 2: also show the price', 'li.textContent = drop.name + " — $" + drop.price;'),
  'mini-database': s('mini-database')
    .replace(
      '-- TODO 1 (Create): add a 5th sneaker with id 5',
      "INSERT INTO sneakers (id, name, brand, price, in_stock) VALUES (5, 'Loop Racer', 'Stackwear', 180, TRUE);",
    )
    .replace('SELECT * FROM sneakers;', 'SELECT name, price FROM sneakers WHERE price < 200 ORDER BY price;')
    .replace('-- TODO 3 (Update): mark Boolean Low (id 3) as back in stock', 'UPDATE sneakers SET in_stock = TRUE WHERE id = 3;')
    .replace('-- TODO 4 (Delete): remove the sneaker with id 4', 'DELETE FROM sneakers WHERE id = 4;'),
  'ship-app': s('ship-app')
    .replace(
      '    // TODO 2: update #count, e.g. "3 items"',
      '    document.getElementById("count").textContent = items.length + (items.length === 1 ? " item" : " items");',
    )
    .replace(
      '    // TODO 1: if value is empty, show "Type something first" in #error and stop (return)',
      '    if (value === "") {\n      document.getElementById("error").textContent = "Type something first";\n      return;\n    }',
    )
    .replace(
      '    // TODO 3: clear the input and the error message',
      '    input.value = "";\n    document.getElementById("error").textContent = "";',
    ),
};
