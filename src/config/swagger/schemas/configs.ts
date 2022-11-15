import { OpenAPIV3 } from 'openapi-types';

const configsComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  configs: {
    type: 'object',
    properties: {
      defaultTransport: {
        type: 'string',
        example: 'car',
      },
      defaultFuel: {
        type: 'string',
        example: 'gasoline',
      },
      enableResoluteness: {
        type: 'boolean',
        example: true,
      },
    },
  },
};

export default configsComponent;
