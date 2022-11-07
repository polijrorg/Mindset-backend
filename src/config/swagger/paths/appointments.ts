import { OpenAPIV3 } from 'openapi-types';

import genreDataComponent from '../schemas/genreData';
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
  '/appointments/getGenreData/{:id}': {
    get: {
      summary: 'Route that return genre data used on chart in dashboard',
      description: 'Route that return genre data used on chart in dashboard',
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
                properties: genreDataComponent,
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
};

export default appointmentSchema;
