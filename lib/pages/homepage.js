const bannerTemplate = require('string-loader!../../views/homepage-banner.hbs');

export default function() {
  console.log('homepage 👍');

  const ourDiv = document.createElement('div');
  ourDiv.innerHTML = bannerTemplate;

  document.querySelector('body').appendChild(ourDiv)
}