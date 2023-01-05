import { OpenAPIV3 } from 'openapi-types';

const cardComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  card: {
    type: 'object',
    properties: {
      car: {
        type: 'number',
        example: '100',
      },
      airplane: {
        type: 'number',
        example: '100',
      },
      train: {
        type: 'number',
        example: '100',
      },
      ship: {
        type: 'number',
        example: '100',
      },
      truck: {
        type: 'number',
        example: '100',
      },
      distance: {
        type: 'number',
        example: '100',
      },
      generatedCC: {
        type: 'number',
        example: '100',
      },
      CO2: {
        type: 'number',
        example: '100',
      },
      cities: {
        type: 'number',
        example: '100',
      },
      doctorSpecialities: {
        type: 'number',
        example: '100',
      },
      doctors: {
        type: 'number',
        example: '100',
      },
      patients: {
        type: 'number',
        example: '100',
      },
      appointments: {
        type: 'number',
        example: '100',
      },
      tree: {
        type: 'number',
        example: '100',
      },
    },
  },
};

export default cardComponent;
