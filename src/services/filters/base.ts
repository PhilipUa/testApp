import _ from 'lodash';
export class BaseFilter {
  public pagination: object;
  public filters: object;
  public orderBy: object;

  constructor(public params: any) {
    this.filters = {};
    this.pagination = {};
    this.orderBy = {};
    this.exec();
  }

  limit() {
    _.set(this, 'pagination.take', Number(_.get(this, 'params.limit', 10)));
  }

  page() {
    _.set(this, 'pagination.skip', Number(_.get(this, 'params.page', 1)));
  }

  orderByAsc() {
    this.orderBy = {
      [this.params.orderByAsc]: 'asc',
    };
  }

  exec() {
    Object.keys(this.params).map((key: string) =>
      typeof _.get(this, key, false) === 'function'
        ? _.get(this, key).bind(this)()
        : null
    );
  }
}
