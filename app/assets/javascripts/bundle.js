/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    // ...
    return $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: 'JSON',
    })
  },

  unfollowUser: id => {
    // ...
    return $.ajax({
      method: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: 'JSON',
    })
  },

  searchUsers: queryVal => {
    return $.ajax({
      method: 'GET',
      url: '/users/search',
      dataType: 'JSON',
      data: {
        query: queryVal
      }
    });
  },

  createTweet: data => {
    return $.ajax({
      type: "POST",
      url: "/tweets",
      dataType: "JSON",
      data: data
    })
  },

  fetch: (maxCreatedAt) => {
    return $.ajax({
      type: "GET",
      url: "/feed",
      dataType: "JSON",
      data: {
        max_created_at: maxCreatedAt
      }
    })
  }

};

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js")

class FollowToggle {
  constructor(el, options){
    // debugger
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = this.$el.data("initial-follow-state") || options.followState;
    this.render();
    // debugger
    this.$el.on("click", this.handleClick.bind(this))
  }

  render(){
    // debugger
    console.log("test")
    if (this.followState === "unfollowed")
      this.$el.text("Follow!");
    else
      this.$el.text("Unfollow!");
  }

  handleClick(event) {
    event.preventDefault();
    let result;
    const $el = $(this)
    this.$el.prop("disabled", true)

    if (this.followState === "unfollowed")
      result = APIUtil.followUser(this.userId);
    else
      result = APIUtil.unfollowUser(this.userId);
    result
    .then(() => {
      if (this.followState === "unfollowed") 
        this.followState = "followed";
      else 
        this.followState = "unfollowed";
      this.render()})
    .then(()=>{ 
      this.$el.prop("disabled", false)
    })
  }
}
module.exports = FollowToggle; 

/***/ }),

/***/ "./frontend/infinite_tweets.js":
/*!*************************************!*\
  !*** ./frontend/infinite_tweets.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js")
class InfiniteTweets {
    constructor(el) {
        this.maxCreatedAt = null; 
        this.$el = $(el)
        this.$el.on("click", ".fetch-more", this.fetchTweets.bind(this))

        this.$ul = this.$el.find("#feed")
        this.$el.on("insertElement", this.addNewTweet.bind(this) )
    }

    fetchTweets(){
        const result = (this.maxCreatedAt) ? APIUtil.fetch(this.maxCreatedAt): APIUtil.fetch();

        result.then((result)=>{
            result.forEach ( tweet => {
                const $li = $("<li>")
                // $li.text(tweet.id)
                $li.text(JSON.stringify(tweet))
                $li.insertBefore(this.$el.find(".fetch-more"))
            })
            const last = result.length - 1
            this.maxCreatedAt = result[last].created_at
            if (result.length < 20){
                this.removeButton();
            }
        })
    }

    addNewTweet(event, result) {
        const $li = $("<li>")
        $li.text(JSON.stringify(result))
        this.$ul.prepend($li)
        this.maxCreatedAt = (this.maxCreatedAt) ? this.maxCreatedAt : result.created_at
    }

    removeButton() {
        this.$el.find(".fetch-more").remove()
    }

}

module.exports = InfiniteTweets

/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtils = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js")
class TweetCompose {
  constructor(el, options) {
    this.$el = $(el)
    this.content = this.$el.find(".tweet-content") 
    this.mention = this.$el.find(".mentioned-users")
    this.button = this.$el.find(".tweet-add-mention")

    this.content.on("input", this.input.bind(this))
    this.button.click(this.newUserSelect.bind(this))
    this.mention.on("click", ".remove-mentioned-user", this.removeMentionedUser.bind(this))
    this.$el.on("submit", this.submit.bind(this))
  } 

  handlSuccess(result){
    const $inputs = $(":input")
    $inputs.prop("disabled", false);
    this.clearInput();
    const list_class = this.$el.data("tweets-ul");
    const $list = $(`ul${list_class}`);
    // const $li = $("<li>");
    // $li.text(JSON.stringify(result));
    // $list.prepend($li)
    console.log($list)
    $list.trigger("insertElement", result)
    console.log("suc")
  }

  submit(event) {
    // debugger
    event.preventDefault();

    const formData = $(event.currentTarget).serializeJSON();
    const $inputs = $(":input");

    $inputs.prop("disabled", true);
    APIUtils.createTweet(formData).then(this.handlSuccess.bind(this));
  }

  clearInput() {
    // const $inputs = $(":input")
    const $div = this.$el.find(".mentioned-users")
    this.content.val("");
    this.mention.val("")
    $div.empty();
    // $inputs.val("");
  }

  input() {
    const length = this.content.val().length; 
    const $word_count = $(".chars-left")
    const remaining = 140 - length;
    $word_count.text(`${remaining} characters remaining`)
  }
  
  addSelect(){
    const $new_select = this.newUserSelect(); 
  }
  
  newUserSelect() {
    event.preventDefault();
    const users = window.users.map (user =>
        `<option value="${user.id}">${user.username}</option>`)
      .join("");
    const select = `
          <select name='tweet[mentioned_user_ids][]'>
            ${users}
          </select>`
    const button = `
      <button class="remove-mentioned-user">Remove</button>
    `
    const div = `
    <div>Mention:
      ${select}
      ${button}
    </div>`;
    const $div =  $(div)
    $div.addClass("mentioned-users")
    this.mention.append($div);

  }

  removeMentionedUser() {
    event.preventDefault();
    $(event.target).parent().remove()

  }
}

module.exports = TweetCompose

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js")
const TweetCompose = __webpack_require__(/*! ./tweet_compose */ "./frontend/tweet_compose.js")
const InfiniteTweets = __webpack_require__(/*! ./infinite_tweets */ "./frontend/infinite_tweets.js")

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



/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js")
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js")

class UsersSearch {
  constructor (el) {
    this.el = $(el);
    this.input = $('.users-search input');
    this.ul = $('.users-search ul');
    this.el.on("input", this.handleInput.bind(this))
  }

  handleInput () {
    // event.preventDefault();
    // debugger
    this.input = $('.users-search input');
    const val = this.input.val()
    console.log( val)
    const result = APIUtil.searchUsers(val)
    result.then( (res) => {
      this.renderResults(res)
    } )
  }

  renderResults(result) {
    this.ul.empty();
    // debugger
    result.forEach( (user) => {
      const id = user.id 
      const $a = $("<a>", {href: `/users/${id}`})
      // $a.attr("href", `/users/${id}`)
      $a.text(user.username)
      console.log($a)
      const $username = $("<li>").html($a).addClass("search-name")
      this.ul.append($username);
      const $button = $("<button>")
      this.ul.append($button)
      const followState = (user.followed) ? "followed" : "unfollowed";
      new FollowToggle($button, {userId: user.id, followState: followState});
    })
  } 

}

module.exports= UsersSearch

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map