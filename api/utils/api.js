const db = require('./db');

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
    }

    if ("gameCount" in input) {
      collection.gameCount = parseInt(input.gameCount);
    }

    collection.url = hostname + '/collections/' + collection.id;
    return collection;

  },

  // Formats collection objects with games
  formatCollectionGames: function (input, hostname) {
    // Add collection information
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

    // Add info for each game
    const gameFields = db.gameFields;
    input.forEach(e => {
      if (e.id) {
        let game = {
          id: e.id,
          imgFileName: e.imgFileName,
          overallRating: parseFloat(e.overallRating),
          url: hostname + '/games/' + e.id
        };

        for (let field in gameFields) {
          game[field] = e[field];
        }

        collection.games.push(game);
      }
    });

    collection.url = hostname + '/collections/' + collection.id;
    return collection;
  },
}
