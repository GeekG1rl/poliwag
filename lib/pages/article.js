import session from 'next-session-client';
import addEvent from '../add-event';
import getEvents from '../get-events';

const userIdPromise = session.uuid().then(({ uuid }) => uuid);

function sendOffAnEvent() {
  return userIdPromise
    .then(userId => addEvent(userId, {
      type: 'article-read',
      articleId: window.location.href.split('/')[window.location.href.split('/').length - 1],
    }))
    .then(() => {
      console.log('Saved event ✌️');
      return userIdPromise
        .then(userId => getEvents(userId))
        .then((events) => {
          const articleReads = events.filter(e => e.type = 'article-read').length;
          const wellReadMedalMax = 15;
          if (articleReads === wellReadMedalMax) {
            new Notification('Contratulations!', {
              body: 'You earned the \'Well Read\' award',
              icon: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/well-read.png',
              image: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/well-read.png',
              iconUrl: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/well-read.png'
            });
          } else if (articleReads < wellReadMedalMax) {
            new Notification('\'Well Read\' progress', {
              body: `${articleReads} / ${wellReadMedalMax}`,
              icon: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/well-read.png',
              image: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/well-read.png',
              iconUrl: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/well-read.png'
            });
          }
        });
    })
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
