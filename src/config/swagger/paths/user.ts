import { OpenAPIV3 } from 'openapi-types';

import configsComponent from '../schemas/configs';
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
                properties: {
                  token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njg1NTU1MjMsImV4cCI6MTY2ODY0MTkyMywic3ViIjoiZmQ3NjliN2MtZTUzOS00ODQyLWI3NGUtN2QyNTNiZWEyYmQ0In0.PZlOb_ddVuYHHJpq7niJAX0MUwbQgyYLqDq5_XO1QqI',
                  },
                  ...userComponent,
                },
              },
            },
          },
        },
      },
    },
  },
  '/forgotPassword/{:email}': {
    post: {
      summary: 'Route that request a email of password recovery',
      description: 'Route that request a email of password recovery',
      tags: ['user'],
      parameters: [{
        in: 'path',
        name: 'email',
        description: 'User email',
      }],
      responses: {
        400: {
          description: 'Email missing',
        },
        200: {
          description: 'Email sent',
        },
      },
    },
  },
  '/changePassword': {
    post: {
      summary: 'Route that change the user password',
      description: 'Route that change the user password authenticated with the code in the link of the email sent',
      tags: ['user'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              properties: {
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
        404: {
          description: 'Unauthorized',
        },
        400: {
          description: 'Password missing',
        },
        200: {
          description: 'Password changed',
        },
      },
    },
  },
  '/changeConfigs': {
    post: {
      summary: 'Route that change the user password',
      description: 'Route that change the user password authenticated with the code in the link of the email sent',
      tags: ['user'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              properties: {
                defaultTransport: {
                  type: 'string',
                  example: 'car',
                  nullable: true,
                },
                defaultFuel: {
                  type: 'string',
                  example: 'gasoline',
                  nullable: true,
                },
                enableResoluteness: {
                  type: 'string',
                  example: true,
                  nullable: true,
                },
              },
            },
          },
        },
      },
      responses: {
        404: {
          description: 'Unauthorized',
        },
        200: {
          description: 'Configs changed',
          content: {
            'application/json': {
              schema: {
                properties: configsComponent,
              },
            },
          },
        },
      },
    },
  },
};

export default userSchema;
