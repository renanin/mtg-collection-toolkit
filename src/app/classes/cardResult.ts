/**
 * @interface CardResult
 * @desc A singular Scryfall card search result
 */
export default interface CardResult {
  object: string;
  id: string;
  oracle_id: string;
  multiverse_ids: number[];
  mtgo_id: number;
  mtgo_foil_id: number;
  name: string;
  uri: string;
  scryfall_uri: string;
  layout: string;
  highres_image: boolean;
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  cmc: number;
  type_line: string;
  oracle_text: string;
  mana_cost: string;
  colors: string[];
  color_identity: string[];
  legalities: {
    standard: string;
    fronteir: string;
    modern: string;
    pauper: string;
    legacy: string;
    penny: string;
    vintage: string;
    duel: string;
    commander: string;
    '1v1': string;
    future: string;
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
  tix: string;
  eur: string;
  related_uris: {
    gatherer: string;
    tcgplayer_decks: string;
    edhrec: string;
    mtgtop8: string;
  };
  purchase_uris: {
    amazon: string;
    ebay: string;
    tcgplayer: string;
    magiccardmarket: string;
    cardhoarder: string;
    card_kingdom: string;
    mtgo_traders: string;
    coolstuffinc: string;
  };
}
