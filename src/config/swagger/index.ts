import { OpenAPIV3 } from 'openapi-types';

import paths from './paths';
import schemas from './schemas';

const swagger: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Compensas API',
    description: 'Documentação',
    contact: {
      email: 'iago.errera@polijunior.com.br',
    },
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3333/',
      description: 'Local server',
    },
    {
      url: 'https://compensas.polijrinternal.com/',
      description: 'Deployed server',
    },
  ],
  paths,
  components: {
    schemas,
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

export default swagger;
