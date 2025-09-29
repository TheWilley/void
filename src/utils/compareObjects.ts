/**
 * Compares two objects for equality by converting them to JSON strings.
 * @param obj1 - The first object to compare.
 * @param obj2 - The second object to compare.
 * @returns True if the objects are equal, false otherwise.
 */
export function compareObjects(obj1: object, obj2: object): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
