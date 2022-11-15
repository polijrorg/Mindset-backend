import { OpenAPIV3 } from 'openapi-types';

const appointmentComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  appointment: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        example: 'd5911207-43ec-4e2c-b7a9-d223bae08107',
      },
      companyId: {
        type: 'string',
        example: 'd5911207-43ec-4e2c-b7a9-d223bae08107',
      },
      patientId: {
        type: 'string',
        example: '123456789',
      },
      doctorId: {
        type: 'string',
        example: '987654321',
      },
      doctorSpeciality: {
        type: 'string',
        example: 'Cardilogist',
      },
      transport: {
        type: 'string',
        example: 'car',
      },
      fuel: {
        type: 'string',
        example: 'gasoline',
      },
      state: {
        type: 'string',
        example: 'SP',
      },
      city: {
        type: 'string',
        example: 'São Paulo',
      },
      patientCep: {
        type: 'string',
        example: '17280000',
      },
      reason: {
        type: 'string',
        example: 'Some Reason',
      },
      type: {
        type: 'string',
        example: 'query',
      },
      location: {
        type: 'string',
        example: 'location',
      },
      patientSex: {
        type: 'string',
        example: 'male',
      },
      generatedCC: {
        type: 'number',
        example: 1000,
      },
      CO2: {
        type: 'number',
        example: 1000,
      },
      distance: {
        type: 'number',
        example: 10000,
      },
      created_at: {
        type: 'string',
        example: '2022-11-07T19:55:24.000Z',
      },
    },
  },
};

export default appointmentComponent;
