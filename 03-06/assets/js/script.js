/**
 * Batalha Pokémon - Charmander vs Squirtle
 * Busca apenas os SPRITES da PokéAPI
 * Todos os textos (nomes, níveis, HP, diálogos) estão fixos no HTML/CSS
 */

// Configuração da API
const API_BASE_URL = 'https://pokeapi.co/api/v2';

// IDs fixos dos Pokémon
const CHARMANDER_ID = 4;  // Pokémon do jogador
const SQUIRTLE_ID = 7;    // Pokémon adversário

// Elementos do DOM para os sprites
const elements = {
    // Sprite do jogador (Charmander - visão traseira)
    playerSprite: document.getElementById('player-sprite'),
    
    // Sprite do adversário (Squirtle - visão frontal)
    enemySprite: document.getElementById('enemy-sprite')
};

/**
 * Busca os dados de um Pokémon específico da PokéAPI
 * @param {number} id - ID do Pokémon (4 para Charmander, 7 para Squirtle)
 * @returns {Promise<Object>} Dados do Pokémon
 */
async function fetchPokemonById(id) {
    try {
        // Faz a requisição para a PokéAPI
        const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
        
        // Verifica se a requisição foi bem sucedida
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        
        // Converte a resposta para JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
        return null;
    }
}

/**
 * Carrega e exibe apenas os sprites dos Pokémon
 * Todos os textos (nome, nível, HP) já estão fixos no HTML
 */
async function loadPokemonSprites() {
    try {
        // Busca os dados do Charmander e Squirtle da API
        const charmanderData = await fetchPokemonById(CHARMANDER_ID);
        const squirtleData = await fetchPokemonById(SQUIRTLE_ID);
        
        // Verifica se os dados foram carregados corretamente
        if (!charmanderData || !squirtleData) {
            console.error('Falha ao carregar dados dos Pokémon');
            return;
        }
        
        // ========== CARREGA SPRITE DO CHARMANDER (JOGADOR) ==========
        // Sprite traseira (back_default) - visão do jogador
        // Se não tiver sprite traseira, usa a frontal
        if (elements.playerSprite) {
            const playerSpriteUrl = charmanderData.sprites.back_default || charmanderData.sprites.front_default;
            elements.playerSprite.src = playerSpriteUrl;
            elements.playerSprite.alt = 'Charmander';
        }
        
        // ========== CARREGA SPRITE DO SQUIRTLE (ADVERSÁRIO) ==========
        // Sprite frontal (front_default) - visão do adversário
        if (elements.enemySprite) {
            elements.enemySprite.src = squirtleData.sprites.front_default;
            elements.enemySprite.alt = 'Squirtle';
        }
        
    } catch (error) {
        console.error('Erro ao carregar sprites:', error);
    }
}

/**
 * Inicializa a aplicação
 */
function init() {
    // Carrega apenas os sprites dos Pokémon da API
    loadPokemonSprites();
}

// Inicia a aplicação quando a página terminar de carregar
window.addEventListener('DOMContentLoaded', init);