const APIUtil = require('./api_util.js')

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