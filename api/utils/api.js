module.exports = {
  // Formats review objects
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

  // Formats collection object
  formatCollection: function (input, hostname) {
    let collection = {
      id: parseInt(input.id),
      userID: parseInt(input.userID),
      name: input.name,
      isPrivate: input.isPrivate,
      gameCount: parseInt(input.gameCount) || 0
    }

    collection.url = hostname + '/collections/' + collection.id;
    return collection;

  },

  // Formats collection objects with games
  formatCollectionGames: function (input, hostname) {
    let collection = {
      id: parseInt(input[0].collectionID),
      name: input[0].collectionName,
      isPrivate: input[0].isPrivate,
      user: {
        id: parseInt(input[0].userID),
        username: input[0].username,
        imgFileName: input[0].userImage,
        url: hostname + '/users/' + input[0].userID
      },
      games: []
    }

    input.forEach(e => {
      if (e.id) {
        collection.games.push({
          id: e.id,
          name: e.name,
          imgFileName: e.imgFileName,
          url: hostname + '/games/' + e.id
        });
      }
    });

    collection.url = hostname + '/collections/' + collection.id;
    return collection;
  },
}
