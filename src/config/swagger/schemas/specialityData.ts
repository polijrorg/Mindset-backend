import { OpenAPIV3 } from 'openapi-types';

const specialityDataComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  specialityData: {
    type: 'object',
    properties: {
      speciality: {
        type: 'string',
        example: 'Cardiologist',
      },
      number: {
        type: 'number',
        example: '10',
      },
    },
  },
};

export default specialityDataComponent;
