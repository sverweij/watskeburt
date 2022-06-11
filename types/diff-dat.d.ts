export type changeTypeType =
  | "added"
  | "copied"
  | "deleted"
  | "modified"
  | "renamed"
  | "type changed"
  | "unmerged"
  | "pairing broken";

export interface IChange {
  name: string;
  changeType: changeTypeType;
  similarty?: Number;
  oldName?: string;
}
