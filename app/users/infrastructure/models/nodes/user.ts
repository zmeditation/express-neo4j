import { Node, DateTime } from "neo4j-driver";

interface UserProperties {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  created: DateTime;
}

export interface UserNode extends Node {
  properties: UserProperties;
}
