import session from 'next-session-client';

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

