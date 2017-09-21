import urls from './json-blob-urls';

export default function getJsonId (userId) {
  return fetch(urls.userIndex)
    .then(res => res.json())
    .then(userIndex => {
      if (userIndex[userId]) {
        return userIndex[userId];
      } else {
        return fetch(urls.root, {
          method: 'POST',
          body: JSON.stringify({
            events: []
          }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
          .then(res => {
            const jsonId = res.headers.get('Location').split('/')[res.headers.get('Location').split('/').length - 1];

            // save the jsonId
            userIndex[userId] = jsonId;
            return fetch(urls.userIndex, {
              method: 'PUT',
              body: JSON.stringify(userIndex),
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }).then(() => {
              return jsonId;
            })
          });
      }
    });
}