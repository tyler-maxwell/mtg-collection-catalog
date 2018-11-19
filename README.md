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
- If logged in, can add cards to inventory, wishlist, or deck from card search
- Card information provided by [MTGJSON 4](https://mtgjson.com/v4/)

#### Strech Goals
- Display different printings of individual cards and associated variations in card information
- Search by set

### Collection Tracking
#### Inventory
- Tabled list of all owned cards
  - Only lists cards with **_owned count greater than 0_**
- Table Columns
  - Owned Count 
    - Can edit directly and update database
  - Needed Count
    - Amount needed to have enough copies for all decks
  - Name
    - Mouse hover displays card image
    - Mouse click displays card in card search with full card information
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
- Remove card via checkbox and dropdown action
  - Sets owned count to zero for all checked cards
  - See [Deckbox](https://deckbox.org/) for example
- Add card to deck via checkbox and dropdown action
  - See [Deckbox](https://deckbox.org/) for example

#### Wishlist
- Tabled list of cards
  - Only lists cards with **_wish count greater than 0_**
- Table Columns
  - Wish Count
    - Can edit directly and update database
  - Owned Count 
    - Can edit directly and update database
  - Needed Count
    - Amount needed to have enough copies for all decks
  - Name
    - Mouse hover displays card image
    - Mouse click displays card in card search with full card information
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
- Remove card via checkbox and dropdown action
  - Sets wish count to zero for all checked cards
  - See [Deckbox](https://deckbox.org/) for example
- Add card to deck via checkbox and dropdown action
  - See [Deckbox](https://deckbox.org/) for example

#### Deckbuilding

## Application Structure
### Database Models
#### User Model
- username
  - string
- password
  - encrypted string
- collection
  - array of CardInvs
- decks
  - array of Decks

#### CardInv Model
- metaverseId
  - number
  - used to get card information from [MTGJSON 4](https://mtgjson.com/v4/)
  - used to get [card image](https://www.reddit.com/r/magicTCG/comments/31v0n4/website_or_api_to_get_mtg_card_images/cq57ihi/)
- ownedCount
  - number
- wishCount
  - number
- neededCount
  - number
  - this is **_never directly edited by user_**; it is only edited when the amount of a card in a deck is changed
- **_if ownedCount, wishCount, and neededCount all equal zero when CardInv is updated the card is removed from the collection in User model_**

#### Deck Model
- name
  - string
- type
  - string
- built
  - bool
- cards
  - array of CardDecks
- sideboard
  - array of CardDecks
- scratchpad
  - array of CardDecks
  - list of cards that you are considering for this deck
  - does not factor into needed counted
- note
  - string

#### CardDeck Model
- metaverseId
  - number
  - used to get card information from [MTGJSON 4](https://mtgjson.com/v4/)
  - used to get [card image](https://www.reddit.com/r/magicTCG/comments/31v0n4/website_or_api_to_get_mtg_card_images/cq57ihi/)
- count
  - number

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
    - Use samepleInventory.txt and sampleDeck.txt to quickly add cards to your account for testing purposes
  - [Scryfall](https://scryfall.com/) for card search
  - [Previous version of this project](https://tyler-maxwell.github.io/project1/)
    - username: demo
    - password: password