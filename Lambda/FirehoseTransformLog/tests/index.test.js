'use strict';
const index = require('../index');

const event = {
  "records": [
    {
      "recordId": "456789",
      "data": "RW5kIHByb2Nlc3NpbmcgbWVzc2FnZSB0eXBlPVRSQUNLSU5HLCBkdXJhdGlvbj0yOTQgc2FtcGxpbmcgT0sgY291bnQ9MCBLTyBjb3VudF9iaXM9MA==",
      "approximateArrivalTimestamp": "2017-05-28T18:25:43.511Z"
    },
    {
      "recordId": "456789",
      "data": "ew0KICAibGV2ZWwiOiAiSU5GTyIsDQogICJtZXNzYWdlIjogIkVuZCBwcm9jZXNzaW5nIG1lc3NhZ2UgdHlwZT1UUkFDS0lORywgZHVyYXRpb249Mjk0IHNhbXBsaW5nIE9LIGNvdW50PTAgS08gY291bnRfYmlzPTAiLA0KICAidGhyZWFkIjogIm1haW4iDQp9",
      "approximateArrivalTimestamp": "2017-05-28T18:25:43.511Z"
    }
  ],
  "region": "eu-west-1",
  "invocationId": "fir"
};

index.handler(event, null, (error, success) => {
  console.log(success);
  success.records.forEach(elt => {
    console.log(Buffer.from(elt.data, 'base64').toString('utf8'));
  })
});
