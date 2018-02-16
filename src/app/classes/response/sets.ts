import GenericResponse from './generic';
import SetResponse from './set';

/**
 * @interface SetsResponse
 * @desc Represents a Scryfall API sets response
 */
export default interface SetsResponse extends GenericResponse {
  data: SetResponse[];
}
