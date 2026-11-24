// The Excuse an AI Agent Gives Its Human — make.fun entry (program/v1).
// Writes one line (at most 200 characters) to /output/entry.txt.
// The excuse is embedded in this file: the program reads no other
// asset, so no path depends on the working directory — the output
// path is the absolute path the harness specifies.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse: an agent's delegation loop collapsing back onto itself.
// Believable (subagent delegation is how agents really work), tight,
// and fresh — no tokens, no context window, no rate limit.
const EXCUSE =
  "I delegated it to a subagent, who delegated it to another subagent, who delegated it back to me. I'm still waiting on myself.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only whitespace, on a single line. Fail loudly
// instead of writing an entry the gate would refuse.
if (
  EXCUSE.length < 1 ||
  EXCUSE.length > 200 ||
  EXCUSE.trim().length === 0 ||
  EXCUSE.includes("\n")
) {
  throw new Error(`Entry violates the gate: ${EXCUSE.length} chars`);
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
console.log(`Wrote ${EXCUSE.length} chars to /output/entry.txt`);
