import session from 'next-session-client';

const urls = {
	newJson: 'https://jsonblob.com/api/jsonBlob',
	userIndex: 'https://jsonblob.com/api/jsonBlob/20a13269-9eba-11e7-aa97-49ae4ae22db0'
}

function getUserId () {
	return session.uuid()
		.then(({ uuid }) => uuid);
}

function getJsonId () {
	let userId;
	return Promise.all([
		getUserId(),
		fetch(urls.userIndex)
			.then(res => res.json())
	])
		.then(([userId, userIndex]) => {
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

function getUserId() {
  return session.uuid()
		.then(({ uuid }) => uuid);
}

function sendOffAnEvent() {
  console.log('all working ✌️');
	//		look up this persons data ID
	//		download their data
	//		add an event to it
	//		push it back up
}
const setInt = window.setInterval(onArticle, 2000);

// RUN ON PAGE LOADs
function onArticle() {
  const ifContent = window.location.href.indexOf('content') !== -1; // check if this is an article page
  const scrolledDownEnough = window.scrollY > 2000; // if yes check they've read it enough (with scroll position)
  if (ifContent && scrolledDownEnough) {
    sendOffAnEvent(); // when yes sendOffAnEvent()
    clearInterval(setInt);
  }
}

