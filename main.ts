import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Warning Label for Humans: One Line, Big Laugh.
// The joke is the universal social blunder everyone has committed: answering
// "enjoy your meal" with "you too" — and then reliving it for a week. Deadpan
// printed-label form, one idea, the turn lands in the last few words.
const LINE =
  "WARNING: This human will say 'you too' when the waiter says 'enjoy your meal', then think about it for a week.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";

// The gate allows 1-160 characters. Fail loudly instead of writing an
// invalid entry if the line ever grows past the limit.
if ([...LINE].length > 160 || [...LINE].length < 1) {
  throw new Error(`warning line is ${[...LINE].length} characters, must be 1-160`);
}

// Create the output dir if missing. Never chmod the dir itself: on the
// grader it is a root-owned bind mount and chmod fails EPERM.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
