const APIUtils = require("./api_util")
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