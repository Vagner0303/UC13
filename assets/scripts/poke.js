const nomePokemon = document.querySelector('.nome_pokemon'); // Nome do pokemon
const numeroPokemon = document.querySelector('.numero_pokemon'); // Numero do pokemon
const imagemPokemon = document.querySelector('.imagem_pokemon'); // Imagem do pokemon
const formulario = document.querySelector('.formulario'); // Formulario
const campoBusca = document.querySelector('.campo_busca'); // Campo de busca
const botaoAnterior = document.querySelector('.botao_anterior'); // Botão de navegação anterior
const botaoProximo = document.querySelector('.botao_proximo'); // Botão de navegação proximo

let pokemonAtual = 1; // Numero do Pokemon inicial

// Função para buscar os dados do Pokemon na API
async function buscarPokemon(pokemon) {
    const respostaAPI = await fetch(` https://pokeapi.co/api/v2/pokemon/${pokemon} `);

    if (respostaAPI.status === 200){
        /*
        Aqui, se o pokemon foi encontrado, os dados dele são armazenados em um arquivo chamado JSON

        const dadosPokemon = {
        "nome"; "Pikachu"
        "numero"; 25,
        "habilidade"; "Choque do trovão"
        "tipos"; ["Eletrico"]
        }
    
        */
        const dados = await respostaAPI.json();
        return dados;
    }
}

// Função para renderizar os dados de Pokemon na tela
async function exibirPokemon(pokemon) {
    //Mostra "Carregand..." enquanto os dados são buscados
    nomePokemon.innerHTML = "Carregando...";
    nomePokemon.innerHTML = '';

    // Busca os dados do Pokemon
    const dados = await buscarPokemon(pokemon);

    //Verifica se os dados foram mostrados
    if (dados) {
        imagemPokemon.style.display = 'black';
        nomePokemon.innerHTML = dados.name;
        numeroPokemon.innerHTML = dados.id;
        imagemPokemon.src = dados.sprites.versions['generation-v']['black-white'].animated.front_default;

        campoBusca.valeu = '';
        pokemonAtual = dados.id;
    } else {
    imagemPokemon.style.display = 'none';
    nomePokemon.innerHTML = 'Não encontrado :c';
    numeroPokemon.innerHTML = '';
    }
}
// Evento de submissão do formulario para buscar o Pokemon
formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    exibirPokemon(campoBusca.value.toLowerCase());
});
// Evento para mostrar o Pokemon anterior
botaoAnterior.addEventListener('click', function () {
    if (pokemonAtual > 1) {
        pokemonAtual -= 1;
        exibirPokemon(pokemonAtual);
    }
});
//Evento para mostrar o proximo Pokemon
botaoProximo.addEventListener('click', function () {
    pokemonAtual += 1;
    exibirPokemon(pokemonAtual);
});
//Exibe o Pokemon inicial ao carregar a pagina
exibirPokemon(pokemonAtual);
