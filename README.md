# *Magic The Gathering*: Collection Tracker

## Purpose
This application allows users to maintain a digital record of their *Magic The Gathering* playing card collection to assist with card collection organization and management.

## Features
- User Accounts
  - User collections stored in database
  - Password protected
- Card Search
  - Retrieve information on any *Magic The Gathering* card
    - MVP
      - Card Image
      - Name
      - Mana Cost
      - Type and Subtype
      - Color Identity
      - Flavor Text
      - Artist
    - Strech Goals
      - Display different printings of individual cards and associated variations in card information
  - Card information sourced from 
  - Can search without an account
  - If logged in, can add cards to collection or decks from card search
- Collection Tracking
  - Inventory
    - Complete listing of all owned cards
  - Deckbuilding
  - Wishlist

## Development Notes
- Card Information
  - All card information is provided by [MTGJSON 4](https://mtgjson.com/v4/)
  - Actual card image can be retrieved by using multiverseId
    - [Example](https://www.reddit.com/r/magicTCG/comments/31v0n4/website_or_api_to_get_mtg_card_images/cq57ihi/)
- Use the following websites for inspiration
  - [Deckbox](https://deckbox.org/) for collection management
  - [Scryfall](https://scryfall.com/) for card search
  - [Previous version of this project](https://tyler-maxwell.github.io/project1/)