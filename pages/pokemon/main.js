document.addEventListener('DOMContentLoaded', function () {
    function getQueryStringValue(key) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
    }

    const evolucao = getQueryStringValue('evolucao');

    if (evolucao) {
        document.title = `Página do ${evolucao}`;

        document.querySelector('#header h1').textContent = evolucao.toUpperCase();
        document.querySelector('h2').textContent = `Informações sobre ${evolucao}`;


        fetch(`https://pokeapi.co/api/v2/pokemon/${evolucao}`)
            .then(response => response.json())
            .then(data => {
                const imageUrl = data.sprites.front_default;

                const imgElement = document.createElement('img');

                imgElement.src = imageUrl;
                imgElement.alt = evolucao;

                imgElement.setAttribute('aria-label', evolucao);
                imgElement.setAttribute('role', 'img');

                const section = document.querySelector('#evolucao'); 
                section.appendChild(imgElement);
            })

            .catch(error => {
                console.error('Erro ao buscar dados do Pokémon:', error);
            });
    } else {
        console.error('Nome da evolução não encontrado na query string.');
    }
});
