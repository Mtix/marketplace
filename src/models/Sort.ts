import { Order } from './Order';

type SortField = 'price' | 'rating';
type SortType = 'asc' | 'desc';

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';
const SORT_FIELD_PRICE = 'price';
const SORT_FIELD_RATING = 'rating';

export class Sort {
  public field: SortField = SORT_FIELD_PRICE;
  public type: SortType = SORT_ASC;

  constructor(field: SortField, type: SortType) {
    this.field = field;
    this.type = type;
  }

  public run(array: Order[]): Order[] {
    return array.sort((a: Order, b: Order) => {
      if (this.field === SORT_FIELD_PRICE) {
        return this._compare(a.exchangeRate, b.exchangeRate, this.type);
      } else if (this.field === SORT_FIELD_RATING) {
        return this._compare(a.user.rating, b.user.rating, this.type);
      }

      return 0;
    });
  }

  private _compare(fieldA: any, fieldB: any, type: SortType) {
    if (type === SORT_ASC) {
      if (fieldA < fieldB) {
        return -1;
      }
      if (fieldA > fieldB) {
        return 1;
      }
      return 0;
    } else {
      if (fieldA > fieldB) {
        return -1;
      }
      if (fieldA < fieldB) {
        return 1;
      }
      return 0;
    }
  }
}

export {
  SORT_ASC,
  SORT_DESC,
  SORT_FIELD_PRICE,
  SORT_FIELD_RATING,
  SortField,
  SortType,
};
