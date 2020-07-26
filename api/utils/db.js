module.exports = {

  // Map form field names to database field names for games
  gameFields: {
    name: 'name',
    description: 'description',
    image: '"imgFileName"',
    publisher: 'publisher',
    minPlayers: '"minPlayers"',
    maxPlayers: '"maxPlayers"',
    minPlaytime: '"minPlaytime"',
    maxPlaytime: '"maxPlaytime"',
    year: 'year',
    minAge: '"minAge"',
  },

  // Map form field names to database field names for reviews
  reviewFields: {
    overallRating: '"overallRating"',
    comments: 'comments',
    strategy: '"strategy"',
    luck: '"luck"',
    playerInteraction: '"playerInteraction"',
    replayValue: '"replayValue"',
    complexity: '"complexity"',
    artAndStyle: '"artAndStyle"',
    gfKids: '"gfKids"',
    gfTeens: '"gfTeens"',
    gfAdults: '"gfAdults"',
    gfFamilies: '"gfFamilies"',
    gf2Player: '"gf2Player"',
    gfLargeGroups: '"gfLargeGroups"',
    gfSocialDistancing: '"gfSocialDistancing"'
  },

  // Map form field names to database field names for user
  userFields: {
    username: "username",
    email: "email",
    password: "password",
    image: '"imgFileName"',
  },

  // expand(3, 2) returns "($1, $2), ($3, $4), ($5, $6)" 
  expand: function (rowCount, columnCount, startAt=1){
    var index = startAt
    return Array(rowCount).fill(0).map(v => `(${Array(columnCount).fill(0).map(v => `$${index++}`).join(", ")})`).join(", ")
  },
}