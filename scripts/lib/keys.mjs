/* Raw-mode key input for `pnpm menu` and `pnpm run clean:pick`. */

/**
 * The keys in one chunk of raw stdin, one by one: arrows (also application-mode `\x1bOA`), Enter, Ctrl-C, printable
 * characters, and Esc on its own. Any other escape sequence (Home, F2, Alt-q) is dropped whole (not read as
 * letters). Several keys with a newline are a paste: only Ctrl-C counts, so a pasted line never runs or deletes.
 */
export function splitKeys(chunk) {
  const keys =
    chunk
      .replace(/\x1bO/g, '\x1b[')
      .match(/\x1b\[[\d;?]*[~A-Za-z]|\x1b[\s\S]?|[\s\S]/g)
      ?.filter((key) => !key.startsWith('\x1b') || /^\x1b(\[[A-D])?$/.test(key)) ?? [];
  const paste = keys.length > 1 && keys.some((key) => key === '\r' || key === '\n');
  return paste ? keys.filter((key) => key === '\u0003') : keys;
}
