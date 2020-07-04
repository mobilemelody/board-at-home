# Board at Home
Final project for OSU CS467 Capstone built by Jed Piezas, Melody Reebs, and Zach Reed

# Getting started with local development

# Prerequisites:
1. Fill out the `exampleenv` file with appropriate values for `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB`. This will set up your local DB the first time you spin it up.
2. Rename `exampleenv` to `db.env`
3. Install Docker Desktop for [Mac or Windows](https://docs.docker.com/compose/install/#install-compose)
4. Run the command `docker-compose build`. This builds all necessary dependencies needed to run the client and the api
5. Run the command `docker-compose up -d`.
6. The client can be accessed by `localhost:8080` and the api through `localhost:3000`

# Some helpful commands:

- `docker logs -f <client/api>` to view the logs of the client or the api
- `docker exec -it <client/api> sh` if you need to go into the container
- `docker ps` to get an overall view of what services are on, what ports they're listening on, etc.
- `docker-compose stop <client/api>` If you want to stop a particular service
- `docker-compose down` to tear it all down