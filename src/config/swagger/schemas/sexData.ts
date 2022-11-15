import { OpenAPIV3 } from 'openapi-types';

const sexDataComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  sexData: {
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
    },
  },
};

export default sexDataComponent;
