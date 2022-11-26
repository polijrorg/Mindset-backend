import { OpenAPIV3 } from 'openapi-types';

import sexDataComponent from '../schemas/sexData';
import specialityDataComponent from '../schemas/specialityData';
import cardComponent from '../schemas/card';
import appointmentComponent from '../schemas/appointment';

export const appointmentSchema: OpenAPIV3.PathsObject = {
  '/appointments/getCards/{:id}': {
    get: {
      summary: 'Route that return all informatons used on cards in dashboard',
      description: 'Route that return all informatons used on cards in dashboard',
      tags: ['appointments'],
      parameters: [{
        in: 'path',
        name: 'id',
        description: 'User id',
      }],
      responses: {
        401: {
          description: 'Unauthorized',
        },
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                properties: cardComponent,
              },
            },
          },
        },
      },
    },
  },
  '/appointments/getSexData/{:id}': {
    get: {
      summary: 'Route that return sex data used on chart in dashboard',
      description: 'Route that return sex data used on chart in dashboard',
      tags: ['appointments'],
      parameters: [{
        in: 'path',
        name: 'id',
        description: 'User id',
      }],
      responses: {
        401: {
          description: 'Unauthorized',
        },
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                properties: sexDataComponent,
              },
            },
          },
        },
      },
    },
  },
  '/appointments/getSpecialityData/{:id}': {
    get: {
      summary: 'Route that return data of the doctor specialities to chart in dashboard',
      description: 'Route that return data of the doctor specialities to chart in dashboard',
      tags: ['appointments'],
      parameters: [{
        in: 'path',
        name: 'id',
        description: 'User id',
      }],
      responses: {
        401: {
          description: 'Unauthorized',
        },
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  properties: specialityDataComponent,
                },
              },
            },
          },
        },
      },
    },
  },
  '/appointments/getTable/{:id}': {
    get: {
      summary: 'Route that return data used on table in dashboard',
      description: 'Route that return data used on table in dashboard',
      tags: ['appointments'],
      parameters: [{
        in: 'path',
        name: 'id',
        description: 'User id',
      }],
      responses: {
        401: {
          description: 'Unauthorized',
        },
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                properties: appointmentComponent,
              },
            },
          },
        },
      },
    },
  },
  '/appointments/getCarbonPerTimeData/{:year}': {
    get: {
      summary: 'Route that return carbon emission avoided over a year in dashboard',
      description: 'Route that return carbon emission avoided over a year in dashboard',
      tags: ['appointments'],
      parameters: [{
        in: 'path',
        name: 'year',
        description: 'Year of the query',
      }],
      responses: {
        401: {
          description: 'Unauthorized',
        },
        200: {
          description: 'Array wiht 12 values, about each month of the year',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'integer',
                },
              },
            },
          },
        },
      },
    },
  },
  '/appointments/create': {
    post: {
      summary: 'Route that create a appointment',
      description: 'Route that create a appointment',
      tags: ['appointments'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              properties: {
                patientId: {
                  type: 'string',
                  example: '123',
                },
                doctorId: {
                  type: 'string',
                  example: '321',
                },
                companyId: {
                  type: 'string',
                  example: '636f1d75-72eb-4607-9c4a-97f61e712c7e',
                },
                doctorSpeciality: {
                  type: 'string',
                  example: 'Cardiologist',
                },
                transport: {
                  type: 'string',
                  example: 'car',
                },
                fuel: {
                  type: 'string',
                  example: 'gasoline',
                },
                patientCep: {
                  type: 'string',
                  example: '05362-070',
                },
                establishmentCep: {
                  type: 'string',
                  example: '01246-904',
                },
                establishment: {
                  type: 'string',
                  example: 'establishment',
                },
                reason: {
                  type: 'string',
                  example: 'your reason',
                },
                type: {
                  type: 'string',
                  example: 'type of your appointment',
                },
                patientSex: {
                  type: 'string',
                  example: 'male',
                },
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        400: {
          description: 'Wrong informations',
        },
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                properties: appointmentComponent,
              },
            },
          },
        },
      },
    },
  },
};

export default appointmentSchema;
