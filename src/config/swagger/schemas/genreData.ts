import { OpenAPIV3 } from 'openapi-types';

const genreDataComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  genreData: {
    type: 'object',
    properties: {
      male: {
        type: 'number',
        example: '10',
      },
      female: {
        type: 'number',
        example: '10',
      },
      others: {
        type: 'number',
        example: '10',
      },
    },
  },
};

export default genreDataComponent;
