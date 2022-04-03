import { getRepository } from 'typeorm';
import { nanoid } from 'nanoid';
import { isUri } from 'valid-url';
import { BASE_URL } from '../config';
import { EncodeUrlAddresDto } from '../dto/UrlAddresDto';
import { UrlAddress } from '../entity/UrlAddress';

class UrlAddresService {
  public async encode(encodeUrlAddresDto: EncodeUrlAddresDto): Promise<string> {
    let { url } = encodeUrlAddresDto;

    if (url.search('http') === -1) {
      url = 'http://'.concat(url);
    }

    if (!isUri(BASE_URL)) {
      throw new Error('Invalid base URL');
    }

    if (!isUri(url)) {
      throw new Error('Invalid origin URL');
    }

    const urlCode = nanoid(6);

    const shortUrl = `${BASE_URL}/${urlCode}`;

    const newUrl = {
      longUrl: url,
      shortUrl,
      urlCode,
    };

    await getRepository(UrlAddress).save(newUrl);

    return shortUrl;
  }
}

export default new UrlAddresService();
