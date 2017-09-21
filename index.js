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

function sendOffAnEvent () {

	//		look up this persons data ID
	//		download their data
	//		add an event to it
	//		push it back up

}


// RUN ON PAGE LOAD

// 	check if this is an article page
// 	if yes
//		check they've read it enough (with scroll position)
//	when yes
//		sendOffAnEvent()