import { OpenAPIV3 } from 'openapi-types';

import userComponent from '../schemas/user';

export const userSchema: OpenAPIV3.PathsObject = {
  '/register': {
    post: {
      summary: 'Register route',
      description: 'Register route',
      tags: ['user'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              properties: {
                email: {
                  type: 'string',
                  example: 'iago.errera@polijunior.com.br',
                },
                name: {
                  type: 'string',
                  example: 'Iago Errera',
                },
                password: {
                  type: 'string',
                  example: 'password',
                },
              },
            },
          },
        },
      },
      responses: {
        400: {
          description: 'Invalid information',
        },
        200: {
          description: 'User created',
          content: {
            'application/json': {
              schema: {
                properties: userComponent,
              },
            },
          },
        },
      },
    },
  },
  '/session': {
    post: {
      summary: 'Login route',
      description: 'Login route',
      tags: ['user'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              properties: {
                email: {
                  type: 'string',
                  example: 'iago.errera@polijunior.com.br',
                },
                password: {
                  type: 'string',
                  example: 'password',
                },
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Incorrect email/password combination',
        },
        200: {
          description: 'User created',
          content: {
            'application/json': {
              schema: {
                properties: userComponent,
              },
            },
          },
        },
      },
    },
  },
};

export default userSchema;
