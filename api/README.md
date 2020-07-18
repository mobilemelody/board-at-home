# Board at Home API
Documentation for the API endpoints for the Board at Home project

- [Add a game](#add-a-game)
- [Get all games](#get-all-games)
- [Add a review](#add-a-review)
- [Get reviews for a game](#get-reviews-for-a-game)
- [Get all review](#get-all-reviews)
- [Get review](#get-review)
- [Get all categories](#get-all-categories)

## Add a game
```
POST /games
```

### Request
```JSON
{
  "name": "Game Name",
  "description": "Description of the game",
  "image": "URL to game image",
  "publisher": "Publisher Name",
  "minPlayers": 2,
  "maxPlayers": 6,
  "minPlaytime": 60,
  "maxPlaytime": 90,
  "year": 2015,
  "minAge": 10
}
```

### Response
Status: 201 Created
```JSON
{
  "id": 1,
  "isUserCreated": true,
  "identifierID": "userId",
  "name": "Game Name",
  "year": 2015,
  "description": "Description of the game",
  "imgFileName": "<url-to-image>",
  "minAge": 10,
  "minPlaytime": 60,
  "maxPlaytime": 90,
  "publisher": "Publisher Name",
  "minPlayers": 2,
  "maxPlayers": 6,
  "url": "<base-url>/games/104",
  "categories": [
    {
      "id": 1,
      "url": "<base-url>/categories/1"
    },
    {
      "id": 7,
      "url": "<base-url>/categories/7"
    }
  ]
}
```

## Get all games
```
GET /games
```

### Response
Status: 200 OK
```JSON
[
  {
    "id": 1,
    "isUserCreated": true,
    "identifierID": "userId",
    "name": "Game Name",
    "year": 2015,
    "description": "Description of the game",
    "imgFileName": "<url-to-image>",
    "minAge": 10,
    "minPlaytime": 60,
    "maxPlaytime": 90,
    "publisher": "Publisher Name",
    "minPlayers": 2,
    "maxPlayers": 6
  }
]
```

## Add a review
```
POST /games/:game_id/reviews
```

### Request
```JSON
{
    "overallRating": 4,
    "comments": "Lorem ipsum dolor sit amet",
    "strategy": 3,
    "luck": 2,
    "playerInteraction": 4,
    "replayValue": 4,
    "complexity": 3,
    "gfKids": false,
    "gfTeens": true,
    "gfAdults": true,
    "gfFamilies": true,
    "gf2Player": false,
    "gfLargeGroups": false,
    "gfSocialDistancing": true
}
```

### Response
Status: 201 Created
```JSON
{
    "user": {
        "id": 1,
        "url": "<base-url>/users/1"
    },
    "game": {
        "id": 1,
        "url": "<base-url>/games/1"
    },
    "id": 1,
    "overallRating": "4.0",
    "comments": "Lorem ipsum dolor sit amet",
    "strategy": "3.0",
    "luck": "2.0",
    "playerInteraction": "4.0",
    "replayValue": "4.0",
    "complexity": "3.0",
    "gfKids": false,
    "gfTeens": true,
    "gfAdults": true,
    "gfFamilies": true,
    "gf2Player": false,
    "gfLargeGroups": false,
    "gfSocialDistancing": true,
    "url": "<base-url>/reviews/1"
}
```

## Get reviews for a game
```
GET /games/:game_id/reviews
```

### Response
Status: 200 OK
```JSON
{
  "results": [
    {
      "user": {
        "id": 1,
        "url": "<base-url>/users/1",
        "username": "username",
        "imgFileName": "<url-to-image>"
      },
      "game": {
        "id": 1,
        "url": "<base-url>/games/1"
      },
      "id": 1,
      "overallRating": "4.0",
      "comments": "Lorem ipsum dolor sit amet",
      "strategy": "3.0",
      "luck": "2.0",
      "playerInteraction": "4.0",
      "replayValue": "4.0",
      "complexity": "3.0",
      "gfKids": false,
      "gfTeens": true,
      "gfAdults": true,
      "gfFamilies": true,
      "gf2Player": false,
      "gfLargeGroups": false,
      "gfSocialDistancing": true,
      "url": "<base-url>/reviews/1"
    }
  ]
}
```

## Get all reviews
```
GET /reviews
```

### Response
Status: 200 OK
```JSON
{
  "results": [
    {
      "user": {
        "id": 1,
        "url": "<base-url>/users/1",
        "username": "username",
        "imgFileName": "<url-to-image>"
      },
      "game": {
        "id": 1,
        "url": "<base-url>/games/1"
      },
      "id": 1,
      "overallRating": "4.0",
      "comments": "Lorem ipsum dolor sit amet",
      "strategy": "3.0",
      "luck": "2.0",
      "playerInteraction": "4.0",
      "replayValue": "4.0",
      "complexity": "3.0",
      "gfKids": false,
      "gfTeens": true,
      "gfAdults": true,
      "gfFamilies": true,
      "gf2Player": false,
      "gfLargeGroups": false,
      "gfSocialDistancing": true,
      "url": "<base-url>/reviews/1"
    }
  ]
}
```

## Get review
```
GET /reviews/:review_id
```

### Response
Status: 200 OK
```JSON
{
  "user": {
    "id": 1,
    "url": "<base-url>/users/1",
    "username": "username",
    "imgFileName": "<url-to-image>"
  },
  "game": {
    "id": 1,
    "url": "<base-url>/games/1"
  },
  "id": 1,
  "overallRating": "4.0",
  "comments": "Lorem ipsum dolor sit amet",
  "strategy": "3.0",
  "luck": "2.0",
  "playerInteraction": "4.0",
  "replayValue": "4.0",
  "complexity": "3.0",
  "gfKids": false,
  "gfTeens": true,
  "gfAdults": true,
  "gfFamilies": true,
  "gf2Player": false,
  "gfLargeGroups": false,
  "gfSocialDistancing": true,
  "url": "<base-url>/reviews/1"
}
```

## Get all categories
```
GET /categories
```

### Response
Status: 200 OK
```JSON
[
  {
    "id": 1,
    "category": "4x",
    "identifierID": "85OKv8p5Ow"
  }
]
```