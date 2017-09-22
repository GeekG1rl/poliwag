import session from 'next-session-client';
const Handlebars = require('handlebars');
const indexTemplate = require('string-loader!../../views/index.hbs');
const getEvents = require('../get-events').default;

const userIdPromise = session.uuid().then(({ uuid }) => uuid);

export default function () {
  const source = indexTemplate;
  const template = Handlebars.compile(source);

  return userIdPromise
    .then(userId => getEvents(userId))
    .then((events) => {
      const articlesReads = events.filter(e => e.type = 'article-read').length;

      const context = {
        medals: [
          {
            name: 'Newbie',
            max: 10,
            current: 0,
            iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/book.png',
          },
          {
            name: 'Well read',
            max: 20,
            current: articlesReads,
            iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/well-read.png',
          },
          {
            name: 'Socialiser',
            max: 5,
            current: 0,
            iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/socialiser.png',
          },
          {
            name: 'Weekender',
            max: 5,
            current: 0,
            iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/weekender.png',
          },
          {
            name: 'Globetrotter',
            max: 10,
            current: 0,
            iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/globetrotter.png',
          },
          {
            name: 'Follower',
            max: 10,
            current: 0,
            iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/globetrotter.png',
          },
          {
            name: 'Historian',
            max: 5,
            current: 0,
            iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/globetrotter.png',
          },
          {
            name: 'Big Reader',
            max: 5,
            current: 0,
            iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/globetrotter.png',
          },
        ],
      };
      const html = template(context);

      const pageContainer = document.getElementById('site-content');
      const ourDiv = document.createElement('div');
      // pageContainer.innerHTML = '';
      pageContainer.insertBefore(ourDiv, pageContainer.firstChild);
      ourDiv.innerHTML = html;
    });
}

