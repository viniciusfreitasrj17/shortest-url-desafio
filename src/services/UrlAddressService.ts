import { getRepository } from 'typeorm';
import { nanoid } from 'nanoid';
import { isUri } from 'valid-url';
import { BASE_URL } from '../config';
import { DecodeUrlAddresDto, EncodeUrlAddresDto } from '../dto/UrlAddresDto';
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
      return 'Invalid original URL';
    }

    const haveUrl = await getRepository(UrlAddress).findOne({
      where: {
        longUrl: url,
      },
    });

    if (haveUrl) {
      return haveUrl.shortUrl;
    }

    const urlCode = nanoid(6);

    const shortUrl = `${BASE_URL}/${urlCode}`;

    const newUrl = {
      longUrl: url,
      shortUrl,
      urlCode,
    };

    const data = await getRepository(UrlAddress).save(newUrl);

    return data.shortUrl;
  }

  public async decode(decodeUrlAddresDto: DecodeUrlAddresDto): Promise<string> {
    let { url } = decodeUrlAddresDto;

    if (url.search('http') === -1) {
      url = 'http://'.concat(url);
    }

    if (!isUri(BASE_URL)) {
      throw new Error('Invalid base URL');
    }

    if (!isUri(url)) {
      return 'Invalid shortened URL';
    }

    const data = await getRepository(UrlAddress).findOne({
      where: {
        shortUrl: url,
      },
    });

    if (!data) {
      return 'Not found URL';
    }

    return data.longUrl;
  }
}

export default new UrlAddresService();
