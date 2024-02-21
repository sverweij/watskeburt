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

export interface IBaseOptions {
  /**
   * The revision against which to compare. E.g. a commit-hash,
   * a branch or a tag. When not passed defaults to the _current_
   * commit hash (if there's any)
   */
  oldRevision?: string;
  /**
   * Newer revision against which to compare. Leave out or pass
   * null when you want to compare against the working tree
   */
  newRevision?: string;
  /**
   * When true _only_ takes already tracked files into account.
   * When false also takes untracked files into account.
   *
   * Defaults to false.
   */
  trackedOnly?: boolean;
}

export interface IFormatOptions extends IBaseOptions {
  /**
   * The type of output to deliver. Defaults to "object" - in which case
   * the listSync function returns an IChange[] object
   */
  outputType: "regex" | "json";
}

export interface IInternalOptions extends IBaseOptions {
  /**
   * The type of output to deliver. Defaults to "object" - in which case
   * the listSync function returns an IChange[] object
   */
  outputType?: "object";
}

export type IOptions = IFormatOptions | IInternalOptions;

/**
 * returns a promise of a list of files changed since pOldRevision.
 *
 * @throws {Error}
 */
export function list(pOptions?: IInternalOptions): Promise<IChange[]>;

/**
 * returns a promise of a list of files changed since pOldRevision, formatted
 * into a string as a pOptions.outputType
 *
 * @throws {Error}
 */
export function list(pOptions?: IFormatOptions): Promise<string>;

/**
 * Returns the SHA1 of the current HEAD
 *
 * @throws {Error}
 */
export function getSHA(): Promise<string>;
