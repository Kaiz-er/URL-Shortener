# URL Shortener

## Local Development

### Frontend

### Run

`cd client/url-shortener` \
`npm install` \
`ng server`

## Backend

### Environment Variables

Environment variables are required for the url shortener to function. The .env file must be self created and placed in /server directory. The .env file only requires one variable:

> DB_CONNECTION_STRING: 'db connection string here'

### Run

`cd server` \
`npm install` \
`npm start`

## Demo/Deployments

Frontend: Web Application (Deployed on Netlify): https://shorterurl.netlify.app/ \
Backend: Node + Express Server - (Deployed on Render): https://url-shortener-service.onrender.com/ \
&nbsp;&nbsp;&nbsp;Endpoint: /urlpath \
Database: PostgreSQL (Deployed on Render)

## Stack

Angular
NodeJS
Express
PostgreSQL

## NPM packages

### Frontend

Taiga UI: https://taiga-ui.dev/

### Backend

Base62: https://www.npmjs.com/package/base62 \
DotEnv: https://www.npmjs.com/package/dotenv \
Express: http://expressjs.com/ \
Express CORS: https://expressjs.com/en/resources/middleware/cors.html \
Sequelize: https://sequelize.org/ \
Jest: https://www.npmjs.com/package/jest \
isUri: https://www.npmjs.com/package/isuri

## Features

1. Generates a unique short URL for a given long URL
2. Copy button appears after generation
3. Validation to validate long URL input
4. Relevant notifications for copy or invalid operations

## Tests (Jest)

1. Backend test for Case 'Short URLs should be unique'
   > server/tests/urlmap.test.js \
   > Run `npm test` in /server
2. Frontend test for 'createShortUrl should return non-null response'
   > client/url-shortener/src/app/services/shortener.service.ts \
   > Run `ng test` in /client/url-shortener

## Additional Info

Backend server is hosted on Render's free tier, which spins down after 15 minutes of inactivity. Therefore, initial response may be delayed by 15-30 seconds.
