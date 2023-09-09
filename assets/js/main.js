
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const loadMinusButton = document.getElementById('loadMinusButton')


const maxRecords = 151
const limit = 1
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <div class=" slide-container">
  
        <div class="wrapper">
          <div class="clash-card barbarian">
            <div class="pokemon ${pokemon.type}">
              <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="number">#${pokemon.number}</div>
            <div class="detail">
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
           
            <div class="clash-card__unit-name">${pokemon.name}</div>
            <div class="type">${pokemon.type}</div>

            
            <div class="clash-card__unit-description">
            <p class="type">The Barbarian is a kilt-clad Scottish warrior with an angry, battle-ready expression, hungry for destruction. He has Killer yellow horseshoe mustache.
            </div></p>
              
      
            <div class=" ${pokemon.type} clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
              <div class="one-third">
                <div class="stat">20<sup>S</sup></div>
                <div class="stat-value">Training</div>
              </div>
      
              <div class="one-third">
                <div class="stat">16</div>
                <div class="stat-value">Speed</div>
              </div>
      
              <div class="one-third no-border">
                <div class="stat">test</div>
                <div class="stat-value">ID</div>
              </div>
      
            </div>
      
          </div> <!-- end clash-card barbarian-->
        </div> <!-- end wrapper -->
    
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


