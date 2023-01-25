import * as Nodes from "./nodes";
import * as Relationships from "./relationships";

export type User = {
  user: Nodes.User;
};

export type Follow = {
  actor: Nodes.User;
  relationship: Relationships.Follows;
  subject: Nodes.User;
};
