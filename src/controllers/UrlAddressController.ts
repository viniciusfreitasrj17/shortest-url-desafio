import { Request, Response } from 'express';
import { urlLogger } from '../config/logger';
import UrlAddressService from '../services/UrlAddressService';

class UrlAddressController {
  public async encode(request: Request, response: Response): Promise<Response> {
    try {
      const data = await UrlAddressService.encode(request.body);

      return response.status(201).json(data);
    } catch (error: any) {
      urlLogger.error(error);
      throw new Error(error);
    }
  }

  public async decode(request: Request, response: Response): Promise<Response> {
    try {
      const data = await UrlAddressService.decode(request.body);

      return response.status(200).json(data);
    } catch (error: any) {
      urlLogger.error(error);
      throw new Error(error);
    }
  }
}

export default new UrlAddressController();
