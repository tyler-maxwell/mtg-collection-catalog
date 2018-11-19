# *Magic The Gathering*: Collection Catalog
## Purpose
This application allows users to maintain a digital catalog of their *Magic The Gathering* playing card collection to assist with card collection organization and management.

## Features
### User Accounts
- User collections stored in database
- Password protected

### Card Search
#### MVP
- Retrieve information on any *Magic The Gathering* card
  - Card Image
  - Artist
  - Name(s)
  - Mana Cost
  - Color Identity
  - Type, Subtype, and Supertype
  - Rarity
  - Text
  - Flavor Text
  - Power
  - Toughness
  - Loyalty
  - Legalities
  - Rulings
- Conditionally render card information if it is available for particular card
  - This is usually dependent upon card type
- Can use search without an account
- If logged in, can add cards to collection or decks from card search
- Card information provided by [MTGJSON 4](https://mtgjson.com/v4/)

#### Strech Goals
- Display different printings of individual cards and associated variations in card information
- Search by set

### Collection Tracking
#### Inventory
- Tabled list of all owned cards
  - Only lists cards with owned count greater than 0
- Table Columns
  - Count (can edit directly and update database)
  - Count needed to have enough copies for all decks
  - Name (mouse hover displays card image, mouse click display card in card search with full card information)
  - Type
  - Mana Cost
- Add cards to inventory through textbox
  - If a single card name is entered add one of that card to the inventory 
    ```
    Raging Goblin
    ```
  - Multiple copies a card can be added by including the amount before the name
    ```
    4 Raging Goblin
    ```
  - Multiple cards can be added at once by writing each card on its own line
    ```
    4 Raging Goblin
    2 Fireball
    10 Mountain
    ```

- Deckbuilding
- Wishlist
  - Tabled list of cards
    - Only lists cards with wish count greater than 0
  - Table Columns
    - Wish Count
      - Can edit directly and update database
    - Owned Count 
      - Can edit directly and update database
    - Needed Count
      - Amount needed to have enough copies for all decks
    - Name (mouse hover displays card image, mouse click display card in card search with full card information)
    - Type
    - Mana Cost

## Application Structure
### Back-end
### Front-end

## Development Notes
- Card Information
  - All card information is provided by [MTGJSON 4](https://mtgjson.com/v4/)
  - Card symbols in svg format provided by [slightlymagic.net](https://www.slightlymagic.net/forum/viewtopic.php?t=4430)
  - Actual card image can be retrieved by using multiverseId
    - [Example](https://www.reddit.com/r/magicTCG/comments/31v0n4/website_or_api_to_get_mtg_card_images/cq57ihi/)
  - Here is an example of a particularly complex card to display
    - [Nicol Bolas, The Ravager](https://scryfall.com/card/m19/218/nicol-bolas-the-ravager-nicol-bolas-the-arisen)
- Use the following websites for inspiration
  - [Deckbox](https://deckbox.org/) for collection management
    - Use samepleInventory.txt to quickly add cards to your account for testing purposes
  - [Scryfall](https://scryfall.com/) for card search
  - [Previous version of this project](https://tyler-maxwell.github.io/project1/)