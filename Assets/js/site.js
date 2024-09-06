import { items } from './dados.js';

var result = `
            <div class='movie-info'>
              <p>{0}</p>
              <img src='{1}' alt='{0}' />
            </div>
`;


document.getElementById('search').addEventListener('input', function (event) {
  const searchText = event.target.value.toLowerCase();
  if (searchText.length >= 3) {
    
    const resultsElement = document.getElementById('result');

    // Limpa os resultados anteriores
    resultsElement.innerHTML = '';

    // Filtra os dados com base no gênero
    const filteredData = items.filter(item => {
      return item.genre_ids.some(id => {
        return id.toLowerCase().includes(searchText);
      });
    });

    // Exibe os resultados
    filteredData.forEach(item => {
      const resultHtml = result
        .replaceAll('{0}', item.title)
        .replaceAll('{1}', item.poster_path);

      resultsElement.innerHTML += resultHtml;
    });
  }
});