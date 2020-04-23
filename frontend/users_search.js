const APIUtil = require("./api_util.js")
const FollowToggle = require("./follow_toggle")

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