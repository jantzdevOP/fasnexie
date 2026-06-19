export type NexieContextInput = {
  styleDNA: string;
  wardrobeSummary: string;
  query: string;
};

export function buildNexieContext(input: NexieContextInput) {
  return `Style DNA: ${input.styleDNA}
Wardrobe: ${input.wardrobeSummary}
User Query: ${input.query}`;
}
