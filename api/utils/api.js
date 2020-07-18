module.exports = {
  // Adds resource urls for review objects
  formatReview: function (input, hostname) {
    let review = {
      user: {},
      game: {},
    };
    review.user = {};
    for (let field in input) {
      if (field === 'userID') {
        review.user.id = parseInt(input[field]);
        review.user.url = hostname + '/users/' + input[field];
      } else if (field === 'username' || field === 'imgFileName') {
        review.user[field] = input[field];
      } else if (field === 'gameID') {
        review.game.id = parseInt(input[field]);
        review.game.url = hostname + '/games/' + input[field];
      } else {
        review[field] = parseInt(input[field]) || input[field];
      }
    }
    review.url = hostname + '/reviews/' + review.id;
    return review;
  },
}