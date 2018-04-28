/**
 * @interface SKUDictionary
 * @desc Dictionary of SKUs from the cache
 */
export default interface SKUDictionary {
  [groupId: number]: {
    [name: string]: number;
  };
}
