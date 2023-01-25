import { DateTime, Integer, Relationship } from "neo4j-driver";

enum RelationshipLabels {
  Follows = "FOLLOWS",
}

interface FollowsProperties {
  created: DateTime;
}

export type Follows = Relationship<
  Integer,
  FollowsProperties,
  RelationshipLabels.Follows
>;
