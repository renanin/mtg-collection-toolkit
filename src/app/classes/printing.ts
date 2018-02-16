/**
 * @class Printing
 * @classdesc A simple representation of a set
 */
export default class Printing {
  /**
   * The full name of the set
   * @name Printing#name
   * @type {string}
   */
  name: string;

  /**
   * The code of the set
   * @name Printing#code
   * @type {string}
   */
  code: string;

  /**
   * @constructs
   */
  constructor(name: string = '', code: string = '') {
    this.name = name;
    this.code = code;
  }
}
