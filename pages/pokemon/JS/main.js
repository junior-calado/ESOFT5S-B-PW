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
                const sprites = Object.values(data.sprites);
                const imageUrls = sprites.filter(item => typeof item === 'string');

                const section = document.querySelector('#evolucao');
                const imgElement = document.createElement('img');

                let currentIndex = 2;
                imgElement.src = imageUrls[currentIndex];
                imgElement.alt = evolucao;

                imgElement.setAttribute('aria-label', evolucao);
                imgElement.setAttribute('role', 'img');

                imgElement.addEventListener('click', function () {
                    currentIndex = (currentIndex + 1) % imageUrls.length;
                    imgElement.src = imageUrls[currentIndex];
                });

                section.appendChild(imgElement);
            })

            .catch(error => {
                console.error('Erro ao buscar dados do Pokémon:', error);
            });
    } else {
        console.error('Nome da evolução não encontrado na query string.');
    }
});
