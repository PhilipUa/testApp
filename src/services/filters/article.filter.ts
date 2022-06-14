import { BaseFilter } from './base';
import _ from 'lodash';

export class ArticleFilter extends BaseFilter {
  constructor(params: object) {
    super(params);
  }
  published() {
    if (_.get(this, 'params.published') === 'disabled') {
      this.filters = {
        where: {
          publishedAt: null,
        },
      };
    }
  }


}
