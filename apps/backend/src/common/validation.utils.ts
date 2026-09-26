export function ensure(condition: boolean, problem: string): string[] {
  return condition ? [] : [problem];
}

export function difference(values: string[], excluded: string[]): string[] {
  return values.filter((value) => !excluded.includes(value));
}

export function findDuplicates(values: string[]): string[] {
  const repeated = values.filter((value, i) => values.indexOf(value) !== i);
  return [...new Set(repeated)];
}
