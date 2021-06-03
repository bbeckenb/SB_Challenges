"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

$navFavoriteSection.on("click", function(evt) { //pulls up list of all favorited stories
  if (currentUser) {
    console.debug("$navFavoriteSection", evt);
    hidePageComponents();
    putFavoritesOnPage();
  }
  else {
    alert('Please login to see favorites');
  }
});

$navAddedStoryLi.on("click", function(evt) { //pulls up list of all added stories
  if (currentUser) {
    console.debug("$navAddedStorySection", evt);
    hidePageComponents();
    putAddedStoriesOnPage();
  }
  else {
    alert('Please login to see your added stories');
  }
});

$navAddStory.on("click", function(evt) {  //pulls up 'Add Story Form'
  if(currentUser){
    console.debug("addStoryButton", evt);
    hidePageComponents();
    $addStoryForm.show();
    putStoriesOnPage();
  }
  else {
    alert('Please login to add stories');
  }
});

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  putStoriesOnPage();
  $navLogin.hide();
  $navLogOut.show();
  $loginForm.hide();
  $signupForm.hide();
  $navUserProfile.text(`${currentUser.username}`).show();
}


