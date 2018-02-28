import '../types/wear';

/**
 * @interface Condition
 * @desc Represents the condition of a card
 */
export default interface Condition {
  /**
   * The wear of the card - M, NM, LP, MP, HP, or D
   * @name Condition#wear
   * @type {Wear}
   */
  wear: Wear;

  /**
   * Whether the card is foil or not
   * @name Condition#foil
   * @type {boolean}
   */
  foil: boolean;
}
