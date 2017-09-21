import articlePage from './lib/pages/article';
import myFtPage from './lib/pages/myft';

const ifContent = window.location.href.indexOf('content') !== -1; // check if this is an article page
const ifMyFT = window.location.href.indexOf('myft/following') !== -1; // check if this is a myFT page

if(ifContent) {
  articlePage();
}

else if(ifMyFT) {
  myFtPage();
}