const Handlebars = require('handlebars');
const indexTemplate = require('string-loader!../../views/index.hbs');

export default function () {
  console.log('Gonna do some cool stuff here');
  // const source = '<p>lol {{name}}</p>';
  const source = indexTemplate;
  const template = Handlebars.compile(source);

  const context = { name: 'Poli' };
  const html = template(context);
  const pageContainer = document.getElementById('site-content');
  const ourDiv = document.createElement('div');
  pageContainer.insertBefore(ourDiv, pageContainer.firstChild);
  ourDiv.innerHTML = html;
  console.log(html);
}

