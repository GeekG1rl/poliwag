import session from 'next-session-client';
const Handlebars = require('handlebars');
const awardTemplate = require('string-loader!../../views/award.hbs');
const getEvents = require('../get-events').default;

const userIdPromise = session.uuid().then(({ uuid }) => uuid);

export default function () {
  const source = awardTemplate;
  const template = Handlebars.compile(source);

  const awardName = (new URL(document.location)).searchParams.get('award');

  return userIdPromise
    .then(userId => getEvents(userId))
    .then((events) => {
      const articlesReads = events.filter(e => e.type = 'article-read').length;

      const awards = [
        {
          name: 'Well read',
          max: 20,
          current: articlesReads,
          iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/well-read.png',
        },
        {
          name: 'Globetrotter',
          max: 10,
          current: 0,
          iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/globetrotter.png',
        },
        {
          name: 'Weekender',
          max: 5,
          current: 0,
          iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/weekender.png',
        },
        {
          name: 'Socialiser',
          max: 5,
          current: 0,
          iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/socialiser.png',
        },
        {
          name: 'Newbie',
          max: 10,
          current: 0,
          iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/book.png',
        },
      ];

      const award = awards.find(m => m.name === awardName);

      const html = template({
        award,
      });

      const pageContainer = document.getElementById('site-content');
      const ourDiv = document.createElement('div');
      document.querySelector('.o-header__subnav-item a').innerHTML = 'Awards';
      document.querySelector('.myft-header').remove();
      pageContainer.insertBefore(ourDiv, pageContainer.firstChild);
      ourDiv.innerHTML = html;
    });
}

