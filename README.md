# Project starting prerequisites

## Server
Before starting the server you must:
1. Run `cd server && cp .env.example .env` in order to create the env file and add the secrets in it.
2. Run `npm i` in order to install node modules.
3. Run `npm run migrate` in order to create a fresh DB.
4. Run `npm run build && npm start` in order to start the server.

## Client
Before starting the client you must:
1. Run `cd client/src/environments && cp .env.example .env.local` in order to create the env file.
2. Run `npm i` in order to intall node modules.
3. Run `npm start` in order to start the client app.

## ADDITIONAL NOTES
1. For convenience I have added some sample bike images in the folder sample_bike_images of the root of the project.
2. populate the env variables EMAIL_USER, EMAIL_PASS in server .env with a gmail username and password
3. populate the env variable JWT_SECRET with a random string
4. for populating the env variables CLOUDINARY_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET, you will have to create an account on Cloudinary
