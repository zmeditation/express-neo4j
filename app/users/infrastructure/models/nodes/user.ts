import { Node, Integer } from "neo4j-driver";

interface UserProperties {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  created: Integer;
}

export interface UserNode extends Node {
  properties: UserProperties;
}
