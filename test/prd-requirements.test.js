import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

function findTestFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return findTestFiles(path);
    return entry.name.endsWith('.test.js') && entry.name !== 'prd-requirements.test.js' ? [path] : [];
  });
}

test('every root PRD requirement maps to a named behavioral test', () => {
  const root = process.cwd();
  const prdPath = join(root, 'PRD.md');
  expect(existsSync(prdPath)).toBe(true);
  const prd = readFileSync(prdPath, 'utf8');
  const requirementIds = Array.from(prd.matchAll(/^- \*\*(PRD-\d{3}) - /gm), (match) => match[1])
    .filter((id) => id !== undefined);
  expect(requirementIds.length).toBeGreaterThan(0);

  const testSource = findTestFiles(join(root, 'test'))
    .map((path) => readFileSync(path, 'utf8'))
    .join('\n');
  for (const requirementId of requirementIds) {
    expect(testSource).toContain(`${requirementId}:`);
  }
});
