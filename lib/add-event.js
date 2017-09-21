const urls = {
  root: 'https://jsonblob.com/api/jsonBlob/',
  userIndex: 'https://jsonblob.com/api/jsonBlob/20a13269-9eba-11e7-aa97-49ae4ae22db0'
}

function getJsonId (userId) {
  return fetch(urls.userIndex)
    .then(res => res.json())
    .then(userIndex => {
      if (userIndex[userId]) {
        return userIndex[userId];
      } else {
        return fetch(urls.newJson, {
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