# Board at Home API
Documentation for the API endpoints for the Board at Home project

- [Add a game](#add-a-game)
- [Get all games](#get-all-games)
- [Add a review](#add-a-review)
- [Get reviews for a game](#get-reviews-for-a-game)
- [Get all review](#get-all-reviews)
- [Get review](#get-review)
- [Update review](#update-review)
- [Delete review](#delete-review)
- [Get all categories](#get-all-categories)
- [Add a collection](#add-a-collection)
- [Get a collection](#get-a-collection)
- [Update a collection](#update-a-collection)
- [Add game to collection](#add-game-to-collection)
- [Remove game from collection](#remove-game-from-collection)
- [Delete a collection](#delete-a-collection)
- [Get user collections](#get-user-collections)

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
  "gfSocialDistancing": true,
  "url": "<base-url>/reviews/1"
}
```

## Update review
```
PATCH /reviews/:review_id
```

### Request
```JSON
{
  "overallRating": 3,
  "comments": "New comment",
  "strategy": 4,
  "gfTeens": true,
  "gfAdults": false,
  "gfLargeGroups": true
}
```

### Response
Status: 200 OK
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
  "overallRating": 3,
  "comments": "New comment",
  "strategy": 4,
  "luck": 2,
  "playerInteraction": 4,
  "replayValue": 4,
  "complexity": 3,
  "gfKids": false,
  "gfTeens": true,
  "gfAdults": false,
  "gfFamilies": true,
  "gf2Player": false,
  "gfLargeGroups": true,
  "gfSocialDistancing": true,
  "url": "<base-url>/reviews/1"
}
```

## Delete review
```
DELETE /reviews/:review_id
```

### Response
Status: 204 No Content

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

## Add a collection
```
POST /collections
```

### Request
```JSON
{
  "name": "Collection Name",
  "isPrivate": false
}
```

### Response
Status: 201 Created
```JSON
{
  "id": 1,
  "userID": 1,
  "name": "Collection Name",
  "isPrivate": false,
  "url": "<base-url>/collections/1"
}
```

## Get a collection
```
GET /collections/:collection_id
```

### Response
Status: 200 OK
```JSON
{
  "id": 1,
  "name": "Collection Name",
  "isPrivate": false,
  "user": {
    "id": 1,
    "username": "username",
    "imgFileName": "<url-to-image>",
    "url": "<base-url>/users/1"
  },
  "games": [
    {
      "id": 1,
      "name": "Game Name",
      "imgFileName": "<url-to-image>",
      "url": "<base-url>/games/1"
    }
  ],
  "url": "<base-url>/collections/1"
}
```

## Update a collection
```
PATCH /collections/:collection_id
```

### Request
```JSON
{
  "name": "New Collection Name",
  "isPrivate": true
}
```

### Response
Status: 200 OK
```JSON
{
  "id": 1,
  "userID": 1,
  "name": "New Collection Name",
  "isPrivate": true,
  "url": "<base-url>/collections/1"
}
```

## Add game to collection
```
PUT /collections/:collection_id/games/:game_id
```

### Response
Status: 204 No Content

## Remove game from collection
```
DELETE /collections/:collection_id/games/:game_id
```

### Response
Status: 204 No Content

## Delete a collection
```
DELETE /collections/:collection_id
```

### Response
Status: 204 No Content

## Get user collections
```
GET /users/:user_id/collections
```

### Response
Status: 200 OK
```JSON
{
  "collections": [
    {
      "id": 1,
      "userID": 1,
      "name": "Collection Name",
      "isPrivate": false,
      "gameCount": 2,
      "url": "<base-url>/collections/1"
    }
  ]
}
```
