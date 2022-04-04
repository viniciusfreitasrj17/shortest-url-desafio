import { times } from 'lodash';
import { nanoid } from 'nanoid';
import * as faker from 'faker';
import { UrlAddressInterface } from '../../src/entity/interface/UrlAddress';
import { BASE_URL } from '../../src/config/index';

class UrlAddressFactory {
  create(
    attr: UrlAddressInterface = {
      longUrl: '',
      shortUrl: '',
      urlCode: '',
    }
  ): UrlAddressInterface {
    const code = attr.urlCode || nanoid(6);
    const newUrlAddress: UrlAddressInterface = {
      longUrl: attr.longUrl || faker.internet.url(),
      urlCode: code,
      shortUrl: attr.shortUrl || `${BASE_URL}/${code}`,
    };

    return newUrlAddress;
  }

  async createMany(
    many: number,
    attr: UrlAddressInterface
  ): Promise<UrlAddressInterface[]> {
    return Promise.all(times(many, () => this.create(attr)));
  }
}

export default new UrlAddressFactory();
