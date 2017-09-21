import session from 'next-session-client';

function getUserId () {
	return session.uuid()
		.then(({ uuid }) => uuid);
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