/**
 * @interface CategoryResult
 * @desc An individual TCGPlayer category
 */
export default interface CategoryResult {
  groupId: number;
  name: string;
  abbreviation: string;
  supplemental: boolean;
  category: {
    categoryId: number;
    name: string;
    modifiedOn: string;
    displayName: string;
    seoCategoryName: string;
    sealedLabel: string;
    nonSealedLabel: string;
    conditionGuideUrl: string;
    isScannable: boolean;
    popularity: number;
  };
  modifiedOn: string;
}
