# Board at Home API
Documentation for the API endpoints for the Board at Home project

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
```JSON
{
  "id": 1,
  "isUserCreated": true,
  "identifierID": "userId",
  "name": "Game Name",
  "year": 2015,
  "description": "Description of the game",
  "imgFileName": "URL to game image",
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
    },
    //...
  ]
}
```

## Get all reviews
```
GET /reviews
```

### Response
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
    },
    //...
  ]
}
```

## Get review
```
GET /reviews/:review_id
```

### Response
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
