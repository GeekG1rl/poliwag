import urls from './json-blob-urls';
import getJsonId from './get-json-id';

function getEverythingAtId (jsonId) {
  return fetch(urls.root + jsonId)
    .then(res => res.json());
}

function putEverythingAtId (jsonId, everything) {
  return fetch(urls.root + jsonId, {
    method: 'PUT',
    body: JSON.stringify(everything),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(res => res.json());
}

export default function (userId, eventObject) {
  return getJsonId(userId)
    .then(jsonId => getEverythingAtId(jsonId)
      .then(everthing => {
        everthing.events = everthing.events || [];
        everthing.events.push(eventObject);

        return putEverythingAtId(jsonId, everthing);
      }));
}