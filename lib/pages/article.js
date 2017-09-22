import session from 'next-session-client';
import addEvent from '../add-event';
import getEvents from '../get-events';

const userIdPromise = session.uuid().then(({ uuid }) => uuid);

function sendOffAnEvent () {
  return userIdPromise
    .then(userId => addEvent(userId, {
      type: 'article-read',
      articleId: window.location.href.split('/')[window.location.href.split('/').length - 1]
    }))
    .then(() => {
      console.log('Saved event ✌️')
      return userIdPromise
        .then(userId => getEvents(userId))
        .then(events => {
          const articleReads = events.filter(e => e.type = 'article-read').length;
          const wellReadMedalMax = 20;
          if(articleReads === wellReadMedalMax) {
            new Notification('Contratulations! You earned a medal: Well Read 👓');
          } else if(articleReads < wellReadMedalMax) {
            new Notification('Medal: Well Read 👓', {body:`progess: ${articleReads} / 20`});
          }
        });
    })
    .catch(err => console.log('Error saving event 👎', err))
}

export default function () {

  // RUN ON PAGE LOADs
  function onArticle () {

    const scrolledDownEnough = window.scrollY > 2000; // if yes check they've read it enough (with scroll position)
    if (scrolledDownEnough) {
      sendOffAnEvent(); // when yes sendOffAnEvent()
      clearInterval(setInt);
    }
  }

  const setInt = window.setInterval(onArticle, 2000);
}
