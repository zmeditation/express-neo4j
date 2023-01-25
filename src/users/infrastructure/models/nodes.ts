import { Node, DateTime, Integer } from "neo4j-driver";

enum NodeLabels {
  User = "User",
}

interface UserProperties {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  created: DateTime;
}

export type User = Node<Integer, UserProperties, NodeLabels.User>;
