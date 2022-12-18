# Realty
Simple CRUD application built in Angular over a two day period. The application helps you to find real estate and homes for sale in the United States.

## Features
- Search for a city or a neighbourhood using a text input with autocomplete.
- Properties for sale in the searched area are displayed on Google maps.
- Information for each property is displayed using cards.
- Click on a marker to zoom to the corresponding card.
- Dynamically filter properties by price. 
- The zoom leve of the map is readjusted to cover all visible properties.

## Tech Stack
- TypeScript
- Angular 15
- SCSS
- ESLint
- Jest, Karma
- Azure

## Requirements
- NodeJS ^14.20.0 || ^16.13.0 || ^18.10.0
- Angular CLI ~15.0.0

## Running the application
To run the application locally:
- Install all the dependences with <code>npm install</code>.
- Run <code>npm run start</code> or <code>ng server</code> for a dev server.
- Navigate to <code>http://localhost:4200/</code>

## Running automated tests
Run <code>npm run lint</code> or <code>ng lint</code> to execute the lint via ESLint.

Run <code>npm run test</code> or <code>ng test</code> to execute the unit tests via Karma.

## Api
Takes south-west corner and north-east corner as parameters and returns properties for sale in that area. For example

<code>https://realty-back-end.azurewebsites.net/api/property?topRight={%22lat%22:22.37,%22lng%22:-154.48}&bottomLeft={%22lat%22:18.55,%22lng%22:-160.53}</code>
