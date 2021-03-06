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
- Can use search without an account
#### Stretch Goals
- Display different printings of individual cards and associated variations in card information
- Search by sets
- If logged in, can add cards to inventory, wishlist, or deck from card search
### Collection Catalog
#### MVP
- View a tabled list of cards in inventory, wishlist, and individual decks
- Add and remove cards to and from collection
- Keep notes on decks and cards in decks
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
- multiverseId
  - number
  - used to get card information from [MTGJSON 4](https://mtgjson.com/v4/)
  - used to get [card image](https://scryfall.com/blog/high-resolution-png-images-119)
    - [Additional Information](https://scryfall.com/docs/api/images)
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
- multiverseId
  - number
  - used to get card information from [MTGJSON 4](https://mtgjson.com/v4/)
  - used to get [card image](https://scryfall.com/blog/high-resolution-png-images-119)
    - [Additional Information](https://scryfall.com/docs/api/images)
- count
  - number
  - **_if count equals zero when CardDeck is updated the card is removed from its associated array in Deck model_**
- note
  - string
### Front-end View
#### Logged Out View
- Navigation
  - Top left
    - Home link that routes to /
    - Card search textarea that routes to /search/card-name
  - Top right
    - Login link that routes to /login
- /
  - About page
  - Describe features
  - Technologies used
    - [React](https://reactjs.org/)
    - [Material UI](https://material-ui.com/)
    - [Chart.js](https://www.chartjs.org/)
    - [MongoDB](https://www.mongodb.com/)
    - [MTGJSON 4](https://mtgjson.com/v4/)
  - Contributers
- /login
  - User login form
  - Successful login routes to /
    - / Will display differently when logged in
  - Link at bottom to create new account that routes to /newaccount
- /newaccount
  - Create user form
  - Successful user creation automatically logs user in and routes to /
- /seach/card-name
  - If search results for card-name includes more than one card
    - *This happens if you type "goblin" for example, whereas "raging goblin" results in a single card*
    - Display all card images without description
    - On click of a particular card that card's information is loaded
  - If search results for card-name includes a single card
    - Display card information
      - Card Image
        - Actual card image can be retrieved by using multiverseId
        - [Example](https://scryfall.com/blog/high-resolution-png-images-119)
          - [Additional Information](https://scryfall.com/docs/api/images)
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
    - Card information provided by [MTGJSON 4](https://mtgjson.com/v4/)
    - Card symbols in svg format provided by [slightlymagic.net](https://www.slightlymagic.net/forum/viewtopic.php?t=4430)
    - Here is an example of a particularly complex card to display
      - [Nicol Bolas, The Ravager // Nicol Bolas, The Arisen](https://scryfall.com/card/m19/218/nicol-bolas-the-ravager-nicol-bolas-the-arisen)
#### Logged In View  
- Navigation
  - Top left
    - Home link that routes to /
    - Card search textarea that routes to /search/card-name
  - Top right
    - Username link that routes to /account
    - Logout link that routes to /
- Sidebar
  - Links to view inventory, wishlist, and individual decks
  - Button to create a new deck
  - See [Deckbox](https://deckbox.org/) for example
- /
  - Displays user's inventory
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
- /wishlist
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
- /deck/deck-name
  - Display deck meta information
    - Deck name
      - Can edit directly and update database
    - Deck type
      - Can edit directly and update database
    - Whether deck is built or not
      - Can edit directly and update database
    - Card Color Breakdown
      - Uses doughnut chard provided by Chart.js
  - Tabled list of cards in deck
    - Table Columns
      - Count
        - Can edit directly and update database
      - Owned Count 
        - Can edit directly and update database
      - Wish Count
        - Can edit directly and update database
      - Name
        - Mouse hover displays card image
        - Mouse click displays card in card search with full card information
      - Type
      - Note
        - Can edit directly and update database
  - Tabled list of cards in sideboard
    - Table Columns
      - Count
        - Can edit directly and update database
      - Owned Count 
        - Can edit directly and update database
      - Wish Count
        - Can edit directly and update database
      - Name
        - Mouse hover displays card image
        - Mouse click displays card in card search with full card information
      - Type
      - Note
        - Can edit directly and update database
  - Tabled list of cards in scratchpad
    - Table Columns
      - Count
        - Can edit directly and update database
      - Owned Count 
        - Can edit directly and update database
      - Wish Count
        - Can edit directly and update database
      - Name
        - Mouse hover displays card image
        - Mouse click displays card in card search with full card information
      - Type
      - Note
        - Can edit directly and update database
  - Add cards to deck, sideboard, or scratchpad through textbox
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
  - Remove card from deck, sideboard, or scratchpad via checkbox and dropdown action
    - Removes card from array
    - See [Deckbox](https://deckbox.org/) for example
  - Move card to and from deck, sideboard, or scratchpad via checkbox and dropdown action
    - Removes card from previous array and adds card to other array
    - See [Deckbox](https://deckbox.org/) for example
  - Display textarea with notes on deck
- /account
  - Display form to change username and password
- /seach/card-name
  - If search results for card-name includes more than one card
    - *This happens if you type "goblin" for example, whereas "raging goblin" results in a single card*
    - Display all card images without description
    - On click of a particular card that card's information is loaded
  - If search results for card-name includes a single card
    - Display card information
      - Card Image
        - Actual card image can be retrieved by using multiverseId
        - [Example](https://scryfall.com/blog/high-resolution-png-images-119)
          - [Additional Information](https://scryfall.com/docs/api/images)
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
    - Buttons/Forms to add cards to inventory, wishlist, or deck
    - Card information provided by [MTGJSON 4](https://mtgjson.com/v4/)
    - Card symbols in svg format provided by [slightlymagic.net](https://www.slightlymagic.net/forum/viewtopic.php?t=4430)
    - Here is an example of a particularly complex card to display
      - [Nicol Bolas, The Ravager // Nicol Bolas, The Arisen](https://scryfall.com/card/m19/218/nicol-bolas-the-ravager-nicol-bolas-the-arisen)
## Development Notes
- Card Information
  - All card information is provided by [MTGJSON 4](https://mtgjson.com/v4/)
  - Card symbols in svg format provided by [slightlymagic.net](https://www.slightlymagic.net/forum/viewtopic.php?t=4430)
  - Actual card image can be retrieved by using multiverseId
    - [Example](https://scryfall.com/blog/high-resolution-png-images-119)
    - [Additional Information](https://scryfall.com/docs/api/images)
- Use the following websites for inspiration
  - [Deckbox](https://deckbox.org/) for collection management
    - Use samepleInventory.txt and sampleDeck.txt to quickly add cards to your account for testing purposes
  - [Scryfall](https://scryfall.com/) for card search
  - [Previous version of this project](https://tyler-maxwell.github.io/project1/)
    - username: demo
    - password: password