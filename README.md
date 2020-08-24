
# CABIN ON A HILL

## Description

_Duration: 2 Week Sprint + 1 Day bugfix_

I have not seen a text adventure in years a wanted to try my hand at it. I created it for my Solo Project at Prime Digital Academy.

To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](www.heroku.com)

## Screen Shot

()

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- postgreSQL ( can be downloaded from homebrewery)

## Installation

How do you get your application up and running? This is a step by step list for how another developer could get this project up and running. The good target audience in terms of knowledge, would be a fellow Primer from another cohort being able to spin up this project. Note that you do not need a paragraph here to intro Installation. It should be step-by-step.

Create a `.env` file in the root of your repo and create a variable named `SERVER_SESSION_SECRET` and set it equal to a random string

1. Create a database named `cabin`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. Connect to the server in a browser.
2. Either register a new user or login using your old user name and password to continue where you left off.



## Built With

- JavaScript
- React
- Redux
- Express
- Axios
- PostgreSQL
- Passport
- bcryptjs
- HTML/CSS

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. And thanks to my family and cohort for all of their support.

## Support
If you have suggestions or issues, please email me at [carl@wilcoxon.org](carl@wilcoxon.org)
