import session from 'next-session-client';
import addEvent from '../add-event';

const userIdPromise = session.uuid().then(({ uuid }) => uuid);

function sendOffAnEvent() {
  return userIdPromise
    .then(userId => addEvent(userId, {
      type: 'article-read',
      articleId: window.location.href.split('/')[window.location.href.split('/').length - 1],
    }))
    .then(() => console.log('Saved event ✌️'))
    .catch(err => console.log('Error saving event 👎', err));
}

export default function () {
  // RUN ON PAGE LOADs
  function onArticle() {
    const scrolledDownEnough = window.scrollY > 1000; // if yes check they've read it enough (with scroll position)
    if (scrolledDownEnough) {
      sendOffAnEvent(); // when yes sendOffAnEvent()
      clearInterval(setInt);
    }
  }

  const setInt = window.setInterval(onArticle, 1000);
}
