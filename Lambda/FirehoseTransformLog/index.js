'use strict';

// Regex to extract key values in logs
// "End processing message type=TRACKING, duration=294 ms sampling OK count=0 KO count_bis=0"
const parser = new RegExp("([\\w\\d-]+=[\\w\\d-]+)+", 'gi');

exports.handler = (event, context, callback) => {

  // Process the list of records and transform them
  const output = event.records.map(record => {
    const data = Buffer.from(record.data, 'base64').toString('utf8');
    let finalPayload, message;

    // Data can be a string or a json object
    try {
      // Convert data into JSON
      const entry = JSON.parse(data);
      finalPayload = entry;
    } catch(e) {
      finalPayload = {
        message: data
      }
    }

    // Extract key-value from message
    const matches = (finalPayload.message||'').match(parser) || [];

    // Append key value into entry
    matches.forEach(elt => {
      const split = elt.split("=");
      Object.assign(finalPayload, {[split[0]]: split[1]})
    });

    const payload = (Buffer.from(JSON.stringify(finalPayload), 'utf8')).toString('base64');

    return {
      recordId: record.recordId,
      result: 'Ok',
      data: payload,
    };
  });

  callback(null, { records: output });
};
