const APIUtil = require("./api_util")
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