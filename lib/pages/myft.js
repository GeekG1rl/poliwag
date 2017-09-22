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
    const articlesReads = Math.min(events.filter(e => e.type = 'article-read').length,15);

    const context = {
      medals: [
        {
          name: 'Newbie',
          max: 1,
          current: 1,
          percentRemaining: 0,
          got: true,
          iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/graduate-icon.svg',
        },
        {
          name: 'Well read',
          max: 15,
          current: articlesReads,
          got: articlesReads >= 15,
          percentRemaining: 100 - articlesReads / 15 * 100,
          iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/glasses-icon.svg',
        },
        {
          name: 'Socialiser',
          max: 5,
          current: 5,
          percentRemaining: 0,
          got: true,
          iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/social-icon.svg',
        },
        {
          name: 'Weekender',
          max: 5,
          current: 0,
          percentRemaining: 100,
          iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/sofa-icon.svg',
        },
        {
          name: 'Globetrotter',
          max: 10,
          current: 4,
          percentRemaining: 100 - 4 / 10 * 100,
          iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/globe-icon.svg',
        },
        {
          name: 'Follower',
          max: 10,
          current: 3,
          percentRemaining: 100 - 3 / 10 * 100,
          iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/follow-icon.svg',
        },
        {
          name: 'Historian',
          max: 5,
          current: 1,
          percentRemaining: 80,
          iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/scroll-icon.svg',
        },
        {
          name: 'Bookish',
          max: 100,
          current: articlesReads,
          percentRemaining: 100 - articlesReads / 100 * 100,
          iconSource: 'https://s3-eu-west-1.amazonaws.com/hackathon-2017-poliwag/magazine-icon.svg',
        },
      ],
    };
    const html = template(context);

    const pageContainer = document.getElementById('site-content');
    const ourDiv = document.createElement('div');
    document.querySelector('.o-header__subnav-item a').innerHTML = 'Awards';
    // pageContainer.innerHTML = '';
    pageContainer.insertBefore(ourDiv, pageContainer.firstChild);
    ourDiv.innerHTML = html;
  });
}
