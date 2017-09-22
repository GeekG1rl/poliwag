import articlePage from './lib/pages/article';
import myFtPage from './lib/pages/myft';
import myFtExplorePage from './lib/pages/myft-explore';
import homePage from './lib/pages/homepage';

const ifContent = window.location.href.indexOf('content') !== -1; // check if this is an article page
const ifMyFT = window.location.href.indexOf('myft/following') !== -1; // check if this is a myFT page
const ifMyFTExplore = window.location.href.indexOf('myft/explore') !== -1; // check if this is a myFT page
const isHomepage = window.location.href.match(/ft.com\/$/) // check if this is the homepage

if (ifContent) {
  articlePage();
} else if (ifMyFT) {
  myFtPage();
} else if (ifMyFTExplore) {
  myFtExplorePage();
} else if (isHomepage) {
  homePage();
}
