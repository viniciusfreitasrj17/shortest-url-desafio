import { getRepository } from 'typeorm';
import { nanoid } from 'nanoid';
import { isUri } from 'valid-url';
import { BASE_URL } from '../config';
import {
  DecodeUrlAddresDto,
  EncodeUrlAddresDto,
  UrlAddressDTO,
} from '../dto/UrlAddresDto';
import { UrlAddress } from '../entity/UrlAddress';

class UrlAddresService {
  public async encode(
    encodeUrlAddresDto: EncodeUrlAddresDto
  ): Promise<UrlAddressDTO> {
    const { url } = encodeUrlAddresDto;

    if (!isUri(BASE_URL)) {
      throw new Error('Invalid base URL');
    }

    if (!isUri(url)) {
      throw new Error('Invalid original URL');
    }

    const haveUrl = await getRepository(UrlAddress).findOne({
      where: {
        longUrl: url,
      },
    });

    if (haveUrl) {
      return { url: haveUrl.shortUrl };
    }

    const urlCode = nanoid(6);

    const shortUrl = `${BASE_URL}/${urlCode}`;

    const newUrl = {
      longUrl: url,
      shortUrl,
      urlCode,
    };

    const data = await getRepository(UrlAddress).save(newUrl);

    return { url: data.shortUrl };
  }

  public async decode(
    decodeUrlAddresDto: DecodeUrlAddresDto
  ): Promise<UrlAddressDTO> {
    const { url } = decodeUrlAddresDto;

    if (!isUri(BASE_URL)) {
      throw new Error('Invalid base URL');
    }

    if (!isUri(url)) {
      throw new Error('Invalid shortened URL');
    }

    const data = await getRepository(UrlAddress).findOne({
      where: {
        shortUrl: url,
      },
    });

    if (!data) {
      throw new Error('Not found URL');
    }

    return { url: data.longUrl };
  }
}

export default new UrlAddresService();
