export type changeTypeType =
  | "added"
  | "copied"
  | "deleted"
  | "modified"
  | "renamed"
  | "type changed"
  | "unmerged"
  | "pairing broken"
  | "unknown"
  | "unmodified"
  | "untracked"
  | "ignored";

export interface IChange {
  /**
   * name of the file
   */
  name: string;
  /**
   * how the file was changed
   */
  changeType: changeTypeType;
  /**
   * if the file was renamed: what the old file's name was
   */
  oldName?: string;
}

export type outputTypeType = "regex" | "json" | "object";

export interface IOptions {
  /**
   * The type of output to deliver. Defaults to "object" - in which case
   * the listSync function returns an IChange[] object
   */
  outputType?: outputTypeType;
  /**
   * When true _only_ takes already tracked files into account.
   * When false also takes untracked files into account.
   *
   * Defaults to false.
   */
  trackedOnly?: boolean;
}

/**
 * returns a list of files changed since pOldRevision.
 *
 * @param pOldRevision The revision against which to compare. E.g. a commit-hash,
 *                 a branch or a tag. When not passed defaults to the _current_
 *                 commit hash (if there's any)
 * @param pNewRevision Newer revision against which to compare. Leave out or pass
 *                 null when you want to compare against the working tree
 * @param pOptions Options that influence how the changes are returned and that
 *                 filter what is returned and
 * @throws {Error}
 */
export function listSync(
  pOldRevision?: string,
  pNewRevision?: string,
  pOptions?: IOptions
): IChange[] | string;

/**
 * Returns the SHA1 of the current HEAD
 *
 * @throws {Error}
 */
export function getSHASync(): string;
