const BASE_URL = `https://pixabay.com/api`;
const key = '37986162-de52f9a52753fd2efa27d9e9b';

async function fetchImages(searchQuery, page) {
  const resp = await fetch(
    `${BASE_URL}/?key=${key}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  return await resp.json();
}

export default {
  fetchImages,
};
