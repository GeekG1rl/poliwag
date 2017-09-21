import session from 'next-session-client';
const Handlebars = require('handlebars');
const indexTemplate = require('string-loader!../../views/index.hbs');

const mainTemplate = require('string-loader!../../templates/main.hbs');


const userIdPromise = session.uuid().then(({ uuid }) => uuid);

const getEvents = require('../get-events').default;

export default function () {
  const source = mainTemplate;
  const template = Handlebars.compile(source);

  return userIdPromise
    .then(userId => getEvents(userId))
    .then(events => {
      const articlesReads = events.filter(e => e.type = 'article-read').length;

        const context = {
          medals: [
            {
              name: 'Well read',
              progressPercent: articlesReads / 20 * 100
            },
            {
              name: 'Another'
            }
          ]
        };
        const html = template(context);

        const pageContainer = document.getElementById('site-content');
        const ourDiv = document.createElement('div');
        pageContainer.innerHTML = '';
        pageContainer.insertBefore(ourDiv, pageContainer.firstChild);
        ourDiv.innerHTML = html;
    })
}

