<template>
        <section class="game">
            <div class="score">
                <div class="player-score">
                    <h2>{{ player }}</h2>
                    <p>{{ pScore }}</p>
                </div>
                <div class="computer-score">
                    <h2>{{ computer }}</h2>
                    <p>{{ cScore }}</p>
                </div>
            </div>
            <div class="intro">
                <h1>Rock, Paper, Scissors Game </h1>
                <button v-on:click="startGame" ref="pvComp">You V Comp</button>
                <button v-on:click="startGame" ref="cvComp">Comp V Comp</button>
            </div>
            <div class="match fadeOut">
                <h2 class="winner">{{ winnerText }}</h2>
                <div class="hands">
                    <img class="player-hand"
                         :src="playerHand"
                         alt=""
                         ref="playerHand"
                    />
                    <img class="computer-hand"
                         :src="computerHand"
                         alt=""
                         ref="computerHand"
                    />
                </div>
                <div class="options">
                    <button class="rock" v-on:click="playGame">rock</button>
                    <button class="paper" v-on:click="playGame">paper</button>
                    <button class="scissors" v-on:click="playGame">scissors</button>
                </div>
            </div>
        </section>
</template>

<script>
    import rock from '@/assets/rock.png'
    import paper from '@/assets/paper.png'
    import scissors from '@/assets/scissors.png'

export default {
    name: 'GameComponent',
    data() {
        return {
            cScore: 0,
            pScore: 0,
            winnerText: 'Choose an option',
            options: ["rock", "paper", "scissors"],
            playerHand: rock,
            computerHand: rock,
            player: 'Player',
            computer: 'Computer',
            optionList: [rock, paper, scissors]
        }
    },
    methods: {
        /**
         * @description fades us into the match screen
         * @param event the click event emitted when the user clicks the button to start playing
         */
        startGame(event) {
            const introScreen = document.querySelector(".intro");
            const match = document.querySelector(".match");
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");
            if(event.target.textContent === 'Comp V Comp') {
                this.player = 'Computer 1';
                this.computer = 'Computer 2';
                this.playGame();
            }
        },

        /**
         * @description passes the choices of each player to the determineWinner function
         * @param event the click event emitted when a user chooses an option
         */
        playGame(event) {
            let playerChoice;
            const computerNumber = Math.floor(Math.random() * 3);
            const computerChoice = this.options[computerNumber];
            // if computers are playing against each other we generate a second random number
            if(this.player === 'Computer 1') {
                playerChoice = this.options[Math.floor(Math.random()* 3 + 1)];
            }
            else {
                playerChoice = event.target.textContent;
            }
            this.determineWinner(playerChoice, computerChoice);
            },

        /** @description determines the winner and updates the hand images
         * @param playerChoice the choice of the first player
         * @param computerChoice the choice of the computer/second player
        */
        determineWinner(playerChoice, computerChoice) {
            setTimeout(() => {
                //compare hands to find the winner
                this.compareHands(playerChoice, computerChoice);
               // iterate through option list and find where there is a match
                // if a match is found update the image
                this.optionList.forEach((option) => {
                    const match = option.indexOf(playerChoice);
                    const computerChoiceMatch = option.indexOf(computerChoice);
                    if(match !== -1) {
                        this.playerHand = option;
                    }
                    if(computerChoiceMatch !== -1) {
                        this.computerHand = option;
                    }
                });
            }, 2000);
            // if players are computers play the game recursively
            if(this.player === 'Computer 1') {
                setInterval(() => {
                    this.playGame()
                }, 3000);
            }
        },    
        /**
         * @description compares the choices of each of the 2 players to determine a winner
         * @param playerChoice a string representing the choice the player made
         * @param computerChoice a string representing the random number generated by the computer
         */
        compareHands(playerChoice, computerChoice) {
            //Checking for a tie
            if (playerChoice === computerChoice) {
                this.winnerText = "It is a tie";
                return;
            }
            //Check for Rock
            if (playerChoice === "rock") {
                if (computerChoice === "scissors") {
                    this.winnerText = `${this.player} Wins`;
                    this.pScore++;
                    return;
                } else {
                    this.winnerText = `${this.computer} Wins`;
                    this.cScore++;
                    return;
                }
            }
            //Check for Paper
            if (playerChoice === "paper") {
                if (computerChoice === "scissors") {
                    this.winnerText = `${this.computer} Wins`;
                    this.cScore++;
                    return;
                } else {
                    this.winnerText = `${this.player} Wins`;
                    this.pScore++;
                    return;
                }
            }
            //Check for Scissors
            if (playerChoice === "scissors") {
                if (computerChoice === "rock") {
                    this.winnerText = `${this.computer} Wins`;
                    this.cScore++;
                } else {
                    this.winnerText = `${this.player} Wins`;
                    this.pScore++;
                }
            }
        }
    }
}
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    section {
        height: 100vh;
        background-color: rgb(39, 41, 68);
        font-family: "Raleway", sans-serif;
    }

    .score {
        color: rgb(224, 224, 224);
        height: 20vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .score h2 {
        font-size: 30px;
    }
    .score p {
        text-align: center;
        padding: 10px;
        font-size: 25px;
    }

    .intro {
        color: rgb(224, 224, 224);
        height: 50vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        transition: opacity 0.5s ease;
    }

    .intro h1 {
        font-size: 50px;
    }
    .intro button,
    .match button {
        width: 200px;
        height: 50px;
        background: none;
        border: none;
        color: rgb(224, 224, 224);
        font-size: 20px;
        background: rgb(45, 117, 96);
        border-radius: 3px;
        cursor: pointer;
    }

    .match {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: opacity 0.5s ease 0.5s;
    }
    .winner {
        color: rgb(224, 224, 224);
        text-align: center;
        font-size: 50px;
    }

    .hands,
    .options {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .player-hand {
        transform: rotateY(180deg);
    }

    div.fadeOut {
        opacity: 0;
        pointer-events: none;
    }

    div.fadeIn {
        opacity: 1;
        pointer-events: all;
    }
</style>