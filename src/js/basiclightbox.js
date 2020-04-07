import * as basicLightbox from 'basiclightbox';

const gallery = document.querySelector('.gallery');

gallery.addEventListener('click', openFullSize);

function openFullSize(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const largePhotoUrl = e.target.dataset.big;
  const instance = basicLightbox.create(`
     <img src=${largePhotoUrl} width="1400" height="900">
`);

  instance.show();
}
