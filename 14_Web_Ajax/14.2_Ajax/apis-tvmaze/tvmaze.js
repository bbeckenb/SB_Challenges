/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
  console.log(res.data);
  const showArray = [];
  for (let showContainer of res.data) {
    let { id, name, summary, image } = showContainer.show;
    showArray.push({ id, name, summary, image }); 
  }
  console.log(showArray);
  return showArray;
}

searchShows('family guy');

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
          <img class="card-img-top" src="${show.image.medium}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button data-show-id="${show.id}" class="btn btn-outline-primary">See Episodes</button>
           </div>
         </div>
       </div>
      `);
    
    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

$("#shows-list").on("click", "button", async function handleEpisodeSearch(evt) {
  $("#episodes-area").show();
  
  let episodes = await getEpisodes(evt.target.getAttribute('data-show-id'));
  console.log('this passed correctly',episodes);
  populateEpisodes(episodes);
})


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  console.log(res.data);
  const episodeArray = [];
  for (let episodeContainer of res.data) {
    let { id, name, season, number } = episodeContainer;
    episodeArray.push({ id, name, season, number }); 
  }
  console.log(episodeArray);
  return episodeArray;
}

//let episodes = getEpisodes('84')
function populateEpisodes(episodes) {
  const $episodeList = $('#episodes-list');
  $episodeList.empty();
  for (let episode of episodes) {
    let $item = $(
      `<li>${episode.name} (season ${episode.season}, episode ${episode.number})</li>`);
      $episodeList.append($item);
  }
}

