module.exports = {
  // Adds resource urls for review objects
  formatReview: function (input, hostname) {
    let review = {};
    for (let field in input) {
      if (field === 'userID') {
        review.user = {};
        review.user.id = input[field];
        review.user.url = hostname + '/users/' + input[field];
      } else if (field === 'gameID') {
        review.game = {};
        review.game.id = input[field];
        review.game.url = hostname + '/games/' + input[field];
      } else {
        review[field] = input[field];
      }
    }
    review.url = hostname + '/reviews/' + review.id;
    return review;
  },
}