const form = document.getElementById('searchForm');

form.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
  
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error('Pokemon not found!');
    }
    const data = await response.json();
    displayPokemonData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Pokemon not found.try again!');
  }
});

function displayPokemonData(pokemon) {
  const pokemonDataContainer = document.getElementById('pokemonData');
  pokemonDataContainer.innerHTML = `
    <div class="card">
      <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
      <div class="card-body">
        <h5 class="card-title">${pokemon.name}</h5>
        <p class="card-text">Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <p class="card-text">Type(s): ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p class="card-text">Stats:</p>
        <ul>
          ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}
