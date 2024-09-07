import { data } from './dados.js';

const resultTemplate = `
    <div class='movie-card' data-title='{0}'>
      <div class='movie-info'>
        <h3>{0}</h3>
        <p class='description'>{1}</p>
        <div class='genres'>{2}</div>
        <a href='https://www.google.com/search?q={0}' class='more-info' target='_blank'>Saber Mais</a>
      </div>
      <img src='{3}' alt='{0}' class='movie-poster' />
    </div>
`;

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

document.getElementById('search-btn').addEventListener('click', function() {
    const searchText = document.getElementById('search').value.toLowerCase();
    const resultsElement = document.getElementById('results');

    resultsElement.innerHTML = '';

    let hasResults = false;

    for (const item of data) {
        if (item.title.toLowerCase().includes(searchText) || item.overview.toLowerCase().includes(searchText)) {
            hasResults = true;
            const genreTags = item.genre_ids.map(genreId => `<span class='genre'>${genreId}</span>`).join('');

            const resultHtml = resultTemplate
                .replaceAll('{0}', item.title)
                .replaceAll('{1}', item.overview)
                .replaceAll('{2}', genreTags)
                .replaceAll('{3}', `https://image.tmdb.org/t/p/original/${item.poster_path}`);

            resultsElement.innerHTML += resultHtml;
        }
    }

    if (!hasResults) {
        showToast('Nenhum filme encontrado. Verifique o título e tente novamente.');
    }
});