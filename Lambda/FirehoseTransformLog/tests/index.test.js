'use strict';
const index = require('../index');

const event = {
  "records": [
    {
      "recordId": "456789",
      "data": "RW5kIHByb2Nlc3NpbmcgbWVzc2FnZSB0eXBlPVRSQUNLSU5HLCBkdXJhdGlvbj0yOTQgbXMgY291bnQ9MTIgaWRzPVsiMTIiLCAiNjc4OSIsICI5ODciXQ==",
      "approximateArrivalTimestamp": "2017-05-28T18:25:43.511Z"
    },
    {
      "recordId": "456789",
      "data": "ew0KICAibGV2ZWwiOiAiSU5GTyIsDQogICJtZXNzYWdlIjogIkVuZCBwcm9jZXNzaW5nIG1lc3NhZ2UgdHlwZT1UUkFDS0lORywgZHVyYXRpb249Mjk0IHNhbXBsaW5nIE9LIGNvdW50PTAgS08gY291bnRfYmlzPTAiLA0KICAidGhyZWFkIjogIm1haW4iDQp9",
      "approximateArrivalTimestamp": "2017-05-28T18:25:43.511Z"
    },
    {
      "recordId": "456790",
      "data": "VHJ5aW5nIHRvIGNvbm5lY3QgdXNpbmcgdGhlIGZvbGxvd2luZyBhbXFwIGNvbmZpZyBBbXFwe3VzZVNTTD10cnVlLCBwb3J0PTU2NzEsIGhvc3Q9J3B1c2gtYXJ2YWwuZXUuYWlydmFudGFnZS5uZXQnLCB1c2VybmFtZT0nYXJ2YWwnLCBwYXNzd29yZD0nUHJhdmd1bmFkcycsIHZpcnR1YWxIb3N0PScvYXJ2YWwnLCBxdWV1ZU5hbWU9J2Y3ZmE4NDlmODI4NzQ4MmY4OGRiMzhlMGVlODRjN2IxJywgcHJveHlIb3N0PSdudWxsJywgcHJveHlQb3J0PTAsIGNvbnN1bWVycz0xMH0=",
      "approximateArrivalTimestamp": "2017-05-28T18:25:43.511Z"
    }
  ],
  "region": "eu-west-1",
  "invocationId": "fir"
};

index.handler(event, null, (error, success) => {
  success.records.forEach(elt => {
    console.log('', JSON.parse(Buffer.from(elt.data, 'base64').toString('utf8'), null, 2));
  })
});
