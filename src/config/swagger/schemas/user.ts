import { OpenAPIV3 } from 'openapi-types';

const userComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  ComponentExample: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        example: 'd5911207-43ec-4e2c-b7a9-d223bae08107',
      },
      name: {
        type: 'string',
        example: 'Iago Errera',
      },
      email: {
        type: 'string',
        example: 'iago.errera@hotmail.com.br',
      },
      password: {
        type: 'string',
        example: '###',
      },
      defaultTrasport: {
        type: 'string',
        example: 'Car',
      },
      defaultFuel: {
        type: 'string',
        example: 'Gasoline',
      },
      enableResoluteness: {
        type: 'boolean',
        example: true,
      },
      createdAt: {
        type: 'string',
        example: '2022-05-27T22:26:25.431Z',
      },
    },
  },
};

export default userComponent;
