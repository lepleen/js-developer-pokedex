
const pokeApi = {}

//converte os detalhes API para a solicitacao do pokemon-model.js
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

//Detalhes de pokemons
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())//converte a PROMISSES em json
        .then(convertPokeApiDetailToPokemon)//funcao que converteu do POKE API para o modelo interno
}


    // solicita uma promisse que tras uma quantidade de Pokemons por pagina
pokeApi.getPokemons = (offset = 0, limit = 1) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    //Funcao de conversao - retorna convertido 
    return fetch(url)//busca a lista de pokemons
        .then((response) => response.json()) //recebe a resposta e coverte
        .then((jsonBody) => jsonBody.results)//pega a lista de pokemons
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))//converte a lista de pokemons em uma nova lista de detalhes de pokemon
        .then((detailRequests) => Promise.all(detailRequests))//espera que as PROMISSES terminem
        .then((pokemonsDetails) => pokemonsDetails)//lista de detalhes finais
}
