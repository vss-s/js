import photoMarcup from './../hbs/photocard.hbs';
import photoApi from './../API/photo-servise.js';

// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=cat&page=1&per_page=12&key=1992005-0c423af9a07f13d941d831108
const refs = {
  gallery: document.querySelector('#gallery'),
  searchForm: document.querySelector('#search-form'),
  loadbtn: document.querySelector('.load_more'),
};

refs.searchForm.addEventListener('submit', search);

start();

function start() {
  photoApi.fetchPhoto().then(insertToPage);
}

function search(e) {
  e.preventDefault();

  const value = e.currentTarget.elements.query.value;

  photoApi.searchQuery = value;
  photoApi.resetPage();
  cleanPage(gallery);

  photoApi.fetchPhoto().then(insertToPage);
}

export default function insertToPage(item) {
  const marcup = photoMarcup(item);
  refs.gallery.insertAdjacentHTML('beforeend', marcup);
}

function cleanPage(page) {
  page.innerHTML = '';
}
