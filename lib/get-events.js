import urls from './json-blob-urls';
import getJsonId from './get-json-id';

export default function (userId) {
  return getJsonId(userId)
    .then(jsonId => {
      return fetch(urls.root + jsonId)
        .then(res => res.json())
        .then(stuff => {
          return stuff.events;
        })
    });
}