/**
 * @interface CardResult
 * @desc An individual card from a Scryfall search
 */
export default interface CardResult {
  object: 'card';
  id: string;
  oracle_id: string;
  multiverse_ids: number[];
  name: string;
  uri: string;
  scryfall_uri: string;
  layout: string;
  highres_image: boolean;
  image_uris: {
    [size: string]: string;
  };
  cmc: number;
  type_line: string;
  oracle_text: string;
  mana_cost: string;
  power: string;
  toughness: string;
  colors: string[];
  color_identity: string[];
  legalities: {
    [format: string]: string;
  };
  reserved: boolean;
  reprint: boolean;
  set: string;
  set_name: string;
  set_uri: string;
  set_search_uri: string;
  scryfall_set_uri: string;
  rulings_uri: string;
  prints_search_uri: string;
  collector_number: string;
  digital: boolean;
  rarity: string;
  flavor_text: string;
  illustration_id: string;
  artist: string;
  frame: string;
  full_art: boolean;
  border_color: string;
  timeshifted: boolean;
  colorshifted: boolean;
  futureshifted: boolean;
  edhrec_rank: number;
  usd: string;
  eur: string;
  related_uris: {
    [site: string]: string;
  };
  purchase_uris: {
    [site: string]: string;
  };
}
