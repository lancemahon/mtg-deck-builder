Magic: The Gathering Deck Builder is a full-stack web application for planning out your Magic decks.

The front end is built with React.js. The entire structure is made from React components, with HTML inside them. Styling is done from within the React components as well.

The back end is built with Express, with MongoDB for persistence. The back end is hosted on Heroku. The only resources in the back end are 'user' and 'deck', but there are plans to add 'card' as a resource.

My planning process admittedly involved a lot of 'code first, plan later.' Some of this was motivated by realizations that initial goals were too difficult to achieve in four days. There was a hefty amount of re-planning following such realizations.

Problem-solving for this project usually involved use of the issue queue. Instructor guidance was instrumental in overcoming some confusions. Most of my biggest difficulties came down to improperly formatted HTTP requests, or simple typos. One issue that took hours to track down was simply a matter of pointing my front end to the wrong API URL. Jen Meade sat with me through many of these issues.
I made liberal use of console logs to help me track down the source of errors/bugs. It was helpful being able to gradually corner the problem area with these console logs.

There are plenty of things I would like to add in future iterations of this app.
First and foremost, I want a user to be able to see all the cards in their deck, for visual reference. Extending that further, I would like to implement a deck building interface that allows for a few things:
  - Clicking on cards to bring up a focused view, with buttons for
    - Removing the card from the deck
    - Moving the card to the deck's 'sideboard'
    - Finding alternate art for the card
  - Displaying deck stats, such as the number of each card type
  - Sorting cards in the deck by various attributes

In addition to this deck building interface, I would like to add a few things:
  - In the back end, set up a 'card' resource, to be referenced (in an array of other cards) inside the 'deck' resource
  - Styling! The web site needs lots of love in the good-looks department.

As a stretch goal, I would love to be able to export decks in various forms, such as an Excel document.

These are the routes that the API expects.
User Routes:
  - ```/sign-up``` (POST)
  - ```/sign-in``` (POST)
  - ```/change-password``` (PATCH)
  - ```/sign-out``` (DELETE)

Deck Routes:
  - ```/decks``` (GET)
  - ```/decks/:id``` (GET)
  - ```/decks``` (POST)
  - ```/decks/:id/``` (PATCH)
  - ```/decks/:id/``` (DELETE)

Wireframes & Entity Relationship Diagram: https://imgur.com/a/lKaeMFJ
Screenshot: https://imgur.com/a/bJZcpua

User Stories:
 - As a user, I want to be able to sign up with an email and password
 - As a user, I want to be able to sign in with an email and password
 - As a user, I want to be able to create a new deck
 - As a user, I want to be able to view my decks
 - As a user, I want to be able to delete a deck
 - As a user, I want to be able to view a specific deck of mine
 - As a user, I want to be able to search for cards to add to a deck
 - As a user, I want to be able to remove cards from a deck of mine
 - As a user, I want to be able to update details about a deck of mine
 - As a user, I want to be able to sign out when signed in
 - As a user, I want to be able to navigate between pages with buttons

There are no dependencies, so no installations are required to run this app. A browser and internet connection are all that's needed.

Front end repository: https://github.com/lancemahon/mtg-deck-builder
Front end deployed site: https://lancemahon.github.io/mtg-deck-builder/
Technologies used:
  - JavaScript
  - React
  - HTML
  - CSS

Back end repository: https://github.com/lancemahon/mtg-card-database
Back end deployed site: https://intense-garden-72889.herokuapp.com
Technologies used:
  - Express
  - MongoDB
  - Heroku
