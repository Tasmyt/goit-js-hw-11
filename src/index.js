import './style.css';
import API from './pixabay-api';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const searchForm = document.querySelector('.search-form');
const galleryBox = document.querySelector('.gallery');
const target = document.querySelector('.js-guard');
const LightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});
let searchQuery = '';
let page = 1;
let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
let observer = new IntersectionObserver(onLoad, options);

searchForm.addEventListener('submit', onSeach);

function onSeach(e) {
  e.preventDefault();

  searchQuery = e.currentTarget.elements.searchQuery.value;

  galleryBox.innerHTML = '';
  page = 1;
  API.fetchImages(searchQuery, page)
    .then(data => {
      if (data.totalHits === 0 || searchQuery == '') {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      galleryBox.insertAdjacentHTML('beforeend', creatMarkup(data.hits));
      observer.observe(target);
      LightBox.refresh();
    })
    .catch(err => console.log(err));
}

function creatMarkup(arr) {
  console.log(arr);
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a class="image-link" href="${largeImageURL}">
        <div class="photo-card">
        <div class="box">
        <img class='photo' src="${webformatURL}" alt="${tags}" loading="lazy"/>
        </div>
        <div class="info">
        <p class="info-item">
            <b>Likes</b> ${likes}
        </p>
        <p class="info-item">
            <b>Views</b> ${views}
        </p>
        <p class="info-item">
            <b>Comments</b> ${comments}
        </p>
        <p class="info-item">
            <b>Downloads</b> ${downloads}
        </p>
        </div> </div>
        </a>`
    )
    .join('');
}

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;

      API.fetchImages(searchQuery, page)
        .then(data => {
          if (page > data.totalHits / 40) {
            observer.unobserve(target);
            Notiflix.Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
            return;
          }
          galleryBox.insertAdjacentHTML('beforeend', creatMarkup(data.hits));
          LightBox.refresh();
        })
        .catch(err => console.log(err));
    }
  });
}

window.scrollTo({
  top: 100,
  left: 100,
  behavior: "smooth",
});