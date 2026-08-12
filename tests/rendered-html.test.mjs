import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const root = new URL("..", import.meta.url);
const readProjectFile = (path) => readFile(new URL(path, root), "utf8");

test("course source includes the six instructional modules", async () => {
  const { blocks } = JSON.parse(await readProjectFile("public/course-content.json"));
  const moduleIds = [...new Set(blocks.map((block) => block.module))];

  assert.deepEqual(moduleIds, [0, 1, 2, 3, 4, 5, 6]);
  for (const module of moduleIds.slice(1)) {
    assert.ok(blocks.some((block) => block.module === module));
  }
});

test("reader keeps the accessible study and editorial hooks", async () => {
  const page = await readProjectFile("app/page.tsx");

  for (const hook of [
    "data-reader-block",
    "renderEditorialBlocks",
    "editorial-callout",
    "editorial-checklist",
    "onToggleTextMark",
    "onSaveStudyNote",
  ]) {
    assert.match(page, new RegExp(hook));
  }
});
