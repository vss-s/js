import photoApi from './../API/photo-servise.js';
import insertToPage from './main.js';
import * as InfiniteScroll from 'infinite-scroll';

const elem = document.querySelector('.gallery');

const infScroll = new InfiniteScroll(elem, {
  // options
  path: '.pagination__next',
  scrollThreshold: 150,
  history: false,
});
infScroll.on('scrollThreshold', function() {
  if (photoApi.page === 1) return;

  if (photoApi.prevPage === photoApi.page) return;

  console.log(photoApi.page);

  photoApi.fetchPhoto().then(insertToPage);
  photoApi.prevPage = photoApi.page;
});
