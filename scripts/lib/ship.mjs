/* The pure parts of `pnpm ship`. */

/**
 * The GitHub "open a pull request" page for `branch` against `base`, from the remote URL in any of its forms
 * (git@github.com:owner/repo.git, ssh://git@github.com/…, https://user@github.com/…). null for anything that is not
 * a host URL (a local path).
 */
export function pullRequestUrl(remote, branch, base = 'main') {
  const match =
    /^(?:ssh:\/\/)?[^@/\s]+@([^:/\s]+)(?::\d+)?[:/](.+?)(?:\.git)?\/?$/.exec(remote) ??
    /^https?:\/\/(?:[^@/]+@)?([^/]+)\/(.+?)(?:\.git)?\/?$/.exec(remote);
  if (!match) return null;
  const [, host, path] = match;
  /* Slashes stay: GitHub reads feat/x as one branch name in a compare URL. */
  const ref = (name) => name.split('/').map(encodeURIComponent).join('/');
  return `https://${host}/${path}/compare/${ref(base)}...${ref(branch)}?expand=1`;
}
