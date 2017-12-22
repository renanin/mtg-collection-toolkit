export default interface SetResponse {
  object: string;
  code: string;
  name: string;
  uri: string;
  scryfall_uri: string;
  search_uri: string;
  set_type: string;
  card_count: number;
  parent_set_code: string;
  digital: boolean;
  foil: boolean;
  block_code: string;
  block: string;
  icon_svg_uri: string;
}
