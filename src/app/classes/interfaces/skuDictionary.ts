/**
 * @interface SKUDictionary
 * @desc Dictionary of SKUs from the cache
 */
export default interface SKUDictionary {
  [group: string]: {
    [name: string]: {
      [condition: string]: number;
    };
  };
}
