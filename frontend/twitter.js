const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js")
const TweetCompose = require("./tweet_compose")
const InfiniteTweets = require("./infinite_tweets")

$(()=>{ 
  const $followButtons = $(".follow-toggle");
  $followButtons.each( (idx, followButton)=> {
    // debugger
    new FollowToggle(followButton);
  })

  const $search = $(".users-search")
  $search.each( (idx, searchBox)=>{
    new UsersSearch(searchBox)
  })

  const $tweets = $(".tweet-compose")
  $tweets.each( (idx, tweet)=>{
    new TweetCompose(tweet)
  })

  const $infiniteTweets = $(".infinite-tweets")
  $infiniteTweets.each( (idx, el)=>{
    new InfiniteTweets(el)
  })
});

