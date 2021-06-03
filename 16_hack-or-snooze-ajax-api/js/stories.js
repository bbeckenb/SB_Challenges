"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList
//let faveList

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

function checkIfStoryFavorited(story) {  //compares currentUser favorite list to story being checked
  const uniqueId = story.storyId;
  if(currentUser) {
    for (let item of currentUser.favorites) {
      if (uniqueId === item.storyId) {
        return true;
      }
    }
    return false;
  }
}

function checkIfStoryAdded(story) { //compares currentUser added story list to story being checked
  const uniqueId = story.storyId;
  if(currentUser) {
    for (let item of currentUser.ownStories) {
      if (uniqueId === item.storyId) {
        return true;
      }
    }
    return false;
  }
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  //console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  let $storyOut
  if(currentUser) { //adds 'favorite' button and data tags based on currentUser data
    $storyOut = $(`
    <li id="${story.storyId}" data-favorite="${checkIfStoryFavorited(story)}" data-added-story="${checkIfStoryAdded(story)}">
      <input type="radio">
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
    `);
  }
  else {
    $storyOut = $(`
    <li id="${story.storyId}" data-favorite="${checkIfStoryFavorited(story)}">
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
    `);
  }

  return $storyOut;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    if($story.attr('data-favorite') === 'true'){  //checks data-favorite tag and dynamically checks 'favorite' button accordingly
      $story.find('input').prop('checked', 'true')
      console.debug($story);
    }
   
    $allStoriesList.append($story);
  }
  $allStoriesList.attr('data-last-call', 'all');
  $allStoriesList.show();
}

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $allStoriesList.empty();

  let storyCount = 0;
  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) { //filters list by data-favorite tag
    const $story = generateStoryMarkup(story);
    if($story.attr('data-favorite') === 'true'){
      $story.find('input').prop('checked', 'true')
      console.debug($story);
      $allStoriesList.append($story);
      storyCount++;
    }
  }
  if(storyCount === 0) {
    $allStoriesList.append("You have 0 favorites!");
  }
  $allStoriesList.attr('data-last-call', 'fave');
  $allStoriesList.show();
}

function putAddedStoriesOnPage() {
  $allStoriesList.empty();

  let storyCount = 0;
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    if($story.attr('data-added-story') === 'true') {  //filters list by data-added-story tag
      if($story.attr('data-favorite') === 'true') {
        $story.find('input').prop('checked', 'true')
      }
      $story.append(`<button type="submit">delete</button>`) //adds delete button in UI for each story
      $allStoriesList.append($story);
      storyCount++;
    }
  }
  if(storyCount === 0) {
    $allStoriesList.append("You have 0 added stories!");
  }
  $allStoriesList.attr('data-last-call', 'added-stories'); //tracks most recent filter call
  $allStoriesList.show();
}


async function storyFormtoAPIandStoryList(evt) {  
  evt.preventDefault();
  console.debug("storyFormtoAPIandStoryList", evt);
  const storyObj = {
    author: $('#author-name').val(), 
    title: $('#title-input').val(), 
    url: $('#url-input').val()
  };
    console.debug(storyObj, storyList.stories);
    await storyList.addStory(currentUser, storyObj); //creates new story, updates API, storyList, currentUser, clears input form
    $addStoryForm.hide();
    putStoriesOnPage();
    $('#author-name').val(''); 
    $('#title-input').val(''); 
    $('#url-input').val('');
}

$('#story-submit').on('click', storyFormtoAPIandStoryList);
