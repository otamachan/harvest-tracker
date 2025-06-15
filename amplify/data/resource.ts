import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  HarvestRecord: a
    .model({
      date: a.string().required(),
      vegetable: a.enum(['CUCUMBER', 'EGGPLANT', 'PEPPER']),
      count: a.integer().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});