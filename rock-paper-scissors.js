  let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, ties: 0};

    /* if (!score) {
      score = {
        wins: 0,
        losses: 0,
        ties: 0
      };
    } */
    
    updateScoreElement();
    
    function makeComputerMove(){
      //computer randomly selects a move
      const randomNumber = Math.random();

      let computerMove = '';

      if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
      } else if (randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'paper';
      } else if (randomNumber >= 2/3 && randomNumber < 1){
        computerMove = 'scissors';
      }

      return computerMove;
    }

    function playGame(playerMove){
      const computerMove = makeComputerMove();

      //compare the moves to get the result 
      let result = '';

      if (playerMove === 'rock'){
        if (computerMove === 'rock'){
          result = 'Tie.';
        } else if (computerMove === 'paper'){
          result = 'You lose.';
        } else if (computerMove === 'scissors'){
          result = 'You win.';
        } 

      } else if (playerMove === 'paper'){
        if (computerMove === 'rock'){
          result = 'You win.';
        } else if (computerMove === 'paper'){
          result = 'Tie.';
        } else if (computerMove === 'scissors'){
          result = 'You lose.';
        }

      } else if (playerMove === 'scissors'){
        if (computerMove === 'rock'){
          result = 'You lose.';
        } else if (computerMove === 'paper'){
          result = 'You win.';
        } else if (computerMove === 'scissors'){
          result = 'Tie.';
        }
      }

      if (result === 'You win.') {
        score.wins += 1;
      } else if (result === 'You lose.') {
        score.losses += 1;
      } else if (result === 'Tie.') {
        score.ties += 1;
      }
      
      localStorage.setItem('score', JSON.stringify(score));

      updateScoreElement();
     
      document.querySelector('.js-result')
        .innerHTML = result;

      document.querySelector('.js-moves')
        .innerHTML = `You <img src="img/${playerMove}.webp" class="move-icon"> <img src="img/${computerMove}.webp" class="move-icon"> Computer`;

    }

    function updateScoreElement() {
      document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    } 

    let isAutoPlaying = false;
    let intervalId;

    function autoPlay(){
      if (!isAutoPlaying) {
        intervalId = setInterval(() => {
          const playerMove = makeComputerMove();
          playGame(playerMove); 
        }, 1000);
        isAutoPlaying = true;
      } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
      }
    }

    function stopPlay(){
      const buttonElement = document.querySelector('.js-stop-play');

      if (buttonElement.innerHTML === 'Auto Play') {
        buttonElement.innerHTML = 'Stop Play';
      } else {
        buttonElement.innerHTML = 'Auto Play';
      }
    }

    document.querySelector('.js-rock')
      .addEventListener('click', () => {
      playGame('rock');
    });

    document.querySelector('.js-paper')
      .addEventListener('click', () => {
      playGame('paper');
    });

    document.querySelector('.js-scissors')
      .addEventListener('click', () => {
      playGame('scissors');
    });

    document.querySelector('.js-reset-btn')
      .addEventListener('click', () => {
        showResetConfirmation();
      });

    document.querySelector('.js-stop-play')
      .addEventListener('click', () => {
      autoPlay();
      stopPlay();;
    });

    document.body.addEventListener('keydown', (event) => {
      if(event.key === 'r') {
        playGame('rock');
      } else if (event.key === 'p') {
        playGame('paper');
      } else if (event.key === 's') {
        playGame('scissors');
      } else if (event.key === 'a') {
        autoPlay();
        stopPlay();
      } else if (event.key === 'Backspace') {
        showResetConfirmation();
      }
    });

    function resetScore() {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
    }

    function showResetConfirmation() {
      document.querySelector('.js-confirmation')
        .innerHTML = `Are you sure you want to reset the score?
        <button class="js-reset-confirm-yes reset-confirm-button">
          Yes
        </button>
        <button class="js-reset-confirm-no reset-confirm-button">
          No
        </button>
        `

      document.querySelector('.js-reset-confirm-yes')
      .addEventListener('click', () => {
        resetScore();
        hideResetMessage();
      });
    
      document.querySelector('.js-reset-confirm-no')
        .addEventListener('click', () => {
          hideResetMessage();
        });
    }

    function hideResetMessage() {
      document.querySelector('.js-confirmation')
        .innerHTML = '';
    }
