# RESTful API Node Server Boilerplate

[![Build Status](https://travis-ci.org/hagopj13/node-express-boilerplate.svg?branch=master)](https://travis-ci.org/hagopj13/node-express-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/hagopj13/node-express-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/hagopj13/node-express-boilerplate?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose created by hagopj13. Refer to this [link](https://github.com/hagopj13/node-express-boilerplate) for more details

By running a single command, you will get a production-ready Node.js app installed and fully configured on your machine. The app comes with many built-in features, such as authentication using JWT, request validation, unit and integration tests, continuous integration, docker support, API documentation, pagination, etc. For more details, check the features list below.

## Quick Start
First install the required dependencies:
```bash
npm install 
#or
yarn install
```
Then , run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Connect with the Frontend of the application


## Description

Application fetches top deals from certain category from websites like Amazon, Flipkart and Ajio and displays the deals in the website. User can choose the best deals and buy it from the respective platform. The deals will be refreshed and refetched at the beginning of each day.

*All the rules have been followed for scraping and only publicly available data is being used in this application

