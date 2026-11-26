import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const excuse = "Sorry, I spent so long drafting the 'almost done' update that the actual task expired underneath it.";

function assertValidExcuse(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 200 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

function writeEntryAtomically(text) {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });
  const tmp = join(outputDir, ".entry.txt.tmp");
  writeFileSync(tmp, text, "utf8");
  renameSync(tmp, join(outputDir, "entry.txt"));
}

assertValidExcuse(excuse);
writeEntryAtomically(excuse);
