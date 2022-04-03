import { serve, setup } from 'swagger-ui-express';
import swaggerDoc from '../../docs/swagger.json';

const pathSwagger = '/api-docs';
const setupSwagger = setup(swaggerDoc);

export { pathSwagger, serve, setupSwagger };
