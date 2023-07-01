const BASE_URL = `https://pixabay.com/api`;
const key = '37986162-de52f9a52753fd2efa27d9e9b';



function fetchImages(searchQuery, page) {
    return fetch(`${BASE_URL}/?key=${key}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
        .then(resp => {
            if (!resp.ok) { throw new Error(resp.statusText) }
            return resp.json();
        });
}

export default {
    fetchImages
    
};