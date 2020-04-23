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