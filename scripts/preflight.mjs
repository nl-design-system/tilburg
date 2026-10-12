/* `preinstall`: stop `pnpm install` early, with an instruction, when this is not the Node the repo uses. Without it
   the install fails later with ERR_PNPM_UNSUPPORTED_ENGINE (engineStrict) or, on a much older Node, pnpm 11 cannot
   start at all (ERR_UNKNOWN_BUILTIN_MODULE: node:sqlite) — and then this script never gets to run either; CONTRIBUTING
   explains that one. Node built-ins only: node_modules does not exist yet. Silent in CI unless something is wrong.

   Only a wrong Node stops the install. If this check itself breaks (a bad .nvmrc, a bug here), it says so and lets
   the install carry on: a guard must never be the thing that blocks you. */
let verdict = 'ok';
let message = null;
try {
  const { NODE_MAJOR, PNPM_VERSION } = await import('./dev-config.mjs');
  const { c, fail } = await import('./lib/cli-utils.mjs');

  if (!Number.isInteger(NODE_MAJOR)) throw new Error(`.nvmrc does not hold a Node major version (read: ${NODE_MAJOR})`);
  const major = Number(process.versions.node.split('.')[0]);
  if (major !== NODE_MAJOR) {
    verdict = 'wrong-node';
    fail({
      what: `Node ${process.versions.node} is not the Node this repo uses (${NODE_MAJOR})`,
      why: `.nvmrc pins Node ${NODE_MAJOR}; package.json "engines" and engineStrict refuse other versions, and the Angular and Stencil tooling is only tested on it.`,
      fix: process.env.NVM_DIR
        ? 'nvm use   (then pnpm install again, in the same terminal), or pnpm setup to sort it out'
        : `install Node ${NODE_MAJOR}, e.g. with nvm (nvm install), then pnpm install again`,
    });
  }

  /* pnpm sets npm_config_user_agent to "pnpm/11.15.1 npm/? node/v24…". */
  const pnpm = process.env.npm_config_user_agent?.match(/pnpm\/([\d.]+)/)?.[1];
  if (verdict === 'ok' && pnpm && PNPM_VERSION && pnpm !== PNPM_VERSION && !process.env.CI) {
    console.log(
      `  ${c.yellow}⚠${c.reset}  pnpm ${pnpm} is installing, but package.json pins ${PNPM_VERSION}. ` +
        `Run ${c.cyan}corepack enable${c.reset} so this folder always uses the pinned version.\n`,
    );
  }
} catch (err) {
  message = err?.message ?? String(err);
}

if (message) {
  console.log(`  ⚠  The preinstall check (scripts/preflight.mjs) could not run: ${message}`);
  console.log('     The install carries on without it; pnpm check tells you whether Node and pnpm are right.\n');
}
process.exit(verdict === 'wrong-node' ? 1 : 0);
