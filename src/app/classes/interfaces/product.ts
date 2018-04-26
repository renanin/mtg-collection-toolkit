/**
 * @interface Product
 * @desc A TCGPlayer product
 */
export default interface Product {
  productId: number;
  productName: string;
  image: string;
  categoryId: number;
  groupId: number;
  url: string;
  modifiedOn: string;
  productConditions: {
    productConditionId: number;
    name: string;
    language: string;
    isFoil: boolean;
  }[];
}
