import session from 'next-session-client';
import addEvent from './lib/add-event';

const userIdPromise = session.uuid().then(({ uuid }) => uuid);

function sendOffAnEvent () {
  return userIdPromise
    .then(userId => addEvent(userId, {
      type: 'article-read',
      articleId: window.location.href.split('/')[window.location.href.split('/').length - 1]
    }))
    .then(() => console.log('Saved event ✌️'))
    .catch(err => console.log('Error saving event 👎', err))
}

const setInt = window.setInterval(onArticle, 2000);

// RUN ON PAGE LOADs
function onArticle () {
  const ifContent = window.location.href.indexOf('content') !== -1; // check if this is an article page
  const scrolledDownEnough = window.scrollY > 2000; // if yes check they've read it enough (with scroll position)
  if (ifContent && scrolledDownEnough) {
    sendOffAnEvent(); // when yes sendOffAnEvent()
    clearInterval(setInt);
  }
}
