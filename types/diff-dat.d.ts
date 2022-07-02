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
  name: string;
  changeType: changeTypeType;
  similarity?: Number;
  oldName?: string;
}
