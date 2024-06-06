// script.js
(() => {
  // Constants
  const SUITS = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const VALUES = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  const cardImages = {
    "2 of Hearts": "./PNG-cards-1.3/2_of_hearts.png",
    "3 of Hearts": "./PNG-cards-1.3/3_of_hearts.png",
    "4 of Hearts": "./PNG-cards-1.3/4_of_hearts.png",
    "5 of Hearts": "./PNG-cards-1.3/5_of_hearts.png",
    "6 of Hearts": "./PNG-cards-1.3/6_of_hearts.png",
    "7 of Hearts": "./PNG-cards-1.3/7_of_hearts.png",
    "8 of Hearts": "./PNG-cards-1.3/8_of_hearts.png",
    "9 of Hearts": "./PNG-cards-1.3/9_of_hearts.png",
    "10 of Hearts": "./PNG-cards-1.3/10_of_hearts.png",
    "J of Hearts": "./PNG-cards-1.3/jack_of_hearts2.png",
    "Q of Hearts": "./PNG-cards-1.3/queen_of_hearts2.png",
    "K of Hearts": "./PNG-cards-1.3/king_of_hearts2.png",
    "A of Hearts": "./PNG-cards-1.3/ace_of_hearts.png",
  
    "2 of Diamonds": "./PNG-cards-1.3/2_of_diamonds.png",
    "3 of Diamonds": "./PNG-cards-1.3/3_of_diamonds.png",
    "4 of Diamonds": "./PNG-cards-1.3/4_of_diamonds.png",
    "5 of Diamonds": "./PNG-cards-1.3/5_of_diamonds.png",
    "6 of Diamonds": "./PNG-cards-1.3/6_of_diamonds.png",
    "7 of Diamonds": "./PNG-cards-1.3/7_of_diamonds.png",
    "8 of Diamonds": "./PNG-cards-1.3/8_of_diamonds.png",
    "9 of Diamonds": "./PNG-cards-1.3/9_of_diamonds.png",
    "10 of Diamonds": "./PNG-cards-1.3/10_of_diamonds.png",
    "J of Diamonds": "./PNG-cards-1.3/jack_of_diamonds2.png",
    "Q of Diamonds": "./PNG-cards-1.3/queen_of_diamonds2.png",
    "K of Diamonds": "./PNG-cards-1.3/king_of_diamonds2.png",
    "A of Diamonds": "./PNG-cards-1.3/ace_of_diamonds.png",
  
    "2 of Clubs": "./PNG-cards-1.3/2_of_clubs.png",
    "3 of Clubs": "./PNG-cards-1.3/3_of_clubs.png",
    "4 of Clubs": "./PNG-cards-1.3/4_of_clubs.png",
    "5 of Clubs": "./PNG-cards-1.3/5_of_clubs.png",
    "6 of Clubs": "./PNG-cards-1.3/6_of_clubs.png",
    "7 of Clubs": "./PNG-cards-1.3/7_of_clubs.png",
    "8 of Clubs": "./PNG-cards-1.3/8_of_clubs.png",
    "9 of Clubs": "./PNG-cards-1.3/9_of_clubs.png",
    "10 of Clubs": "./PNG-cards-1.3/10_of_clubs.png",
    "J of Clubs": "./PNG-cards-1.3/jack_of_clubs2.png",
    "Q of Clubs": "./PNG-cards-1.3/queen_of_clubs2.png",
    "K of Clubs": "./PNG-cards-1.3/king_of_clubs2.png",
    "A of Clubs": "./PNG-cards-1.3/ace_of_clubs.png",
  
    "2 of Spades": "./PNG-cards-1.3/2_of_spades.png",
    "3 of Spades": "./PNG-cards-1.3/3_of_spades.png",
    "4 of Spades": "./PNG-cards-1.3/4_of_spades.png",
    "5 of Spades": "./PNG-cards-1.3/5_of_spades.png",
    "6 of Spades": "./PNG-cards-1.3/6_of_spades.png",
    "7 of Spades": "./PNG-cards-1.3/7_of_spades.png",
    "8 of Spades": "./PNG-cards-1.3/8_of_spades.png",
    "9 of Spades": "./PNG-cards-1.3/9_of_spades.png",
    "10 of Spades": "./PNG-cards-1.3/10_of_spades.png",
    "J of Spades": "./PNG-cards-1.3/jack_of_spades2.png",
    "Q of Spades": "./PNG-cards-1.3/queen_of_spades2.png",
    "K of Spades": "./PNG-cards-1.3/king_of_spades2.png",
    "A of Spades": "./PNG-cards-1.3/ace_of_spades.png",
  };
  

  // Selectors
  const playerHandElement = document.getElementById("player-hand");
  const dealerHandElement = document.getElementById("dealer-hand");
  const hitButton = document.getElementById("hit");
  const standButton = document.getElementById("stand");
  const resetButton = document.getElementById("reset");
  const messageElement = document.getElementById("message");
  const playerForm = document.getElementById("player-form");
  const playerNameInput = document.getElementById("player-name");
  const playerInfoElement = document.getElementById("player-info");
  const statsElement = document.getElementById("stats");
  const getStatsButton = document.getElementById("get-stats");

  // State
  let deck, playerHand, dealerHand, playerName;
  let gameStats = { wins: 0, losses: 0 };

  // Utility functions
  const getCardValue = (card) => {
    const { value } = card;
    if (["J", "Q", "K"].includes(value)) return 10;
    if (value === "A") return 11; // Ace can be 1 or 11, simplified here
    return parseInt(value);
  };

  const createDeck = () => {
    return SUITS.flatMap((suit) => VALUES.map((value) => ({ suit, value })));
  };

  const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  const dealCard = (hand) => {
    const card = deck.pop();
    hand.push(card);
    return card;
  };

  const renderHand = (hand, element) => {
    element.innerHTML = "";
    hand.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "card";
  
      const imageElement = document.createElement("img");
      imageElement.src = cardImages[`${card.value} of ${card.suit}`];
      imageElement.className = "card-image"; // Add a class for styling
  
      cardElement.appendChild(imageElement);
      element.appendChild(cardElement);
    });
  };
  
  

  const calculateHandValue = (hand) => {
    return hand.reduce((sum, card) => sum + getCardValue(card), 0);
  };

  // Game functions
  const startGame = () => {
    deck = shuffleDeck([...createDeck()]);
    playerHand = [];
    dealerHand = [];
    dealCard(playerHand);
    dealCard(dealerHand);
    dealCard(playerHand);
    dealCard(dealerHand);
    renderHand(playerHand, playerHandElement);
    renderHand(dealerHand, dealerHandElement);
    if (playerName === null)
      messageElement.textContent = "Please create an account to play.";
    else
      messageElement.textContent = `${playerName}, make your move! HIT or STAND?`;
  };

  const checkGameOver = () => {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);

    if (playerValue > 21) {
      messageElement.textContent = `Player ${playerName}, you busted! Dealer wins. Press RESET to play again.`;
      gameStats.losses++;
      saveStats();
      return true;
    }

    if (dealerValue > 21) {
      messageElement.textContent = `Dealer busted! Player ${playerName} wins. Press RESET to play again.`;
      gameStats.wins++;
      saveStats();
      return true;
    }

    if (playerValue === 21) {
      messageElement.textContent = `Blackjack! Player ${playerName} wins. Press RESET to play again.`;
      gameStats.wins++;
      saveStats();
      return true;
    }

    return false;
  };

  const saveStats = () => {
    localStorage.setItem("gameStats", JSON.stringify(gameStats));
  };

  const loadStats = () => {
    const savedStats = localStorage.getItem("gameStats");
    if (savedStats) {
      gameStats = JSON.parse(savedStats);
    }
  };

  // Fetch and display player stats
  const fetchStats = () => {
    try {
      // Fetch player stats from localStorage
      const stats = JSON.parse(localStorage.getItem("gameStats"));
      if (stats) {
        displayStats(stats);
      } else {
        console.log("No stats found in localStorage");
      }
    } catch (error) {
      console.error("Failed to fetch stats from localStorage", error);
    }
  };

  const displayStats = (stats) => {
    statsElement.innerHTML = `
        <p>Player: ${playerName}</p>
        <p>Games Won: ${stats.wins}</p>
        <p>Games Lost: ${stats.losses}</p>
        <p>Total Games: ${stats.losses + stats.wins}</p>
    `;
  };

  // Event Listeners
  hitButton.addEventListener("click", () => {
    dealCard(playerHand);
    renderHand(playerHand, playerHandElement);
    if (checkGameOver()) {
      hitButton.disabled = true;
      standButton.disabled = true;
    }
  });

  standButton.addEventListener("click", () => {
    while (calculateHandValue(dealerHand) < 17) {
      dealCard(dealerHand);
      renderHand(dealerHand, dealerHandElement);
    }
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);

    if (dealerValue > 21 || playerValue > dealerValue) {
      messageElement.textContent = `Player ${playerName} wins! Congratulations! Press RESET to play again.`;
      gameStats.wins++;
    } else {
      messageElement.textContent = `Dealer wins. Press RESET to play again.`;
      gameStats.losses++;
    }
    saveStats();
    hitButton.disabled = true;
    standButton.disabled = true;
  });

  resetButton.addEventListener("click", () => {
    startGame();
    hitButton.disabled = false;
    standButton.disabled = false;
  });

  playerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    playerName = playerNameInput.value;
    localStorage.setItem("playerName", playerName);
    playerForm.style.display = "none";
    playerInfoElement.textContent = `Welcome, ${playerName}`;
    startGame();
  });

  getStatsButton.addEventListener("click", fetchStats);

  // Initial game setup
  (async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async initialization
    playerName = localStorage.getItem("playerName");
    if (playerName) {
      playerForm.style.display = "none";
      playerInfoElement.innerHTML = `Welcome back, ${playerName}. <br><br>Not ${playerName}? <a href="#" id="change-player">Create your account</a><br><br>`;
      document.getElementById("change-player").addEventListener("click", () => {
        localStorage.removeItem("playerName");
        localStorage.removeItem("gameStats");
        playerForm.style.display = "block";
        playerInfoElement.textContent = "";
      });
    } else {
      messageElement.textContent = "Please create an account to play.";
      hitButton.disabled = true;
      standButton.disabled = true;
      resetButton.disabled = true;
    }
    loadStats();
    startGame();
  })();
})();
