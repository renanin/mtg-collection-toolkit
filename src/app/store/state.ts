import SetsObject from '../classes/setsObject';
import Collection from '../classes/collection';
import Trade from '../classes/trade';

export default interface state {
  sets: SetsObject;
  collection: Collection;
  trades: Trade[];
}
