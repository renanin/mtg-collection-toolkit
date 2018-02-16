/**
 * @interface SetResponse
 * @desc Represents a SINGLE Scryfall API set
 */
export default interface SetResponse {
  object: string;
  code: string;
  name: string;
  uri: string;
  scryfall_uri: string;
  search_uri: string;
  released_at: string;
  set_type: string;
  card_count: number;
  digital: boolean;
  foil: boolean;
  icon_svg_uri: string;
}