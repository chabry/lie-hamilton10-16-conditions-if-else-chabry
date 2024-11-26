// jest --detectOpenHandles --forceExit

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function pickBankScore(){
  //Implement the `pickBankScore` function, which should return a random bank score between 16 and 21. 
  let bankScore = Math.floor(Math.random() * (21 - 16) + 16)
  return bankScore
}

function pickPlayerCard(){
  //Implement the `pickPlayerCard` function, which should return a random card value between 1 and 11.
  let playerCard = Math.floor((Math.random() * 11) + 1)
  return playerCard
}


function stateOfTheGame(player_score, bank_score){
  //Implement the `stateOfTheGame` function, responsible for creating a message containing the bank and player's scores. 
  let playerScoreMessage = `score is: ${player_score}`
  let bankScoreMessage = `bank score is: ${bank_score}`

  let message = playerScoreMessage + ' \n' + bankScoreMessage
  return message

}


function endGameMessage(player_score, bank_score){
  //Implement the `endGameMessage` function, to be called at the end of the game, containing the outcome (win, lose, or push).
  /**
    If the player's score is over 21, they "Lose" (bust).
    *If the player's score is exactly 21, they achieve a "Black Jack" and win.
    If the player's score is greater than the bank's score, they "Win".
    If the player's score is less than the bank's score, they "Lose".
    If the player's score is equal to the bank's score, it's a "Push," and the player gets their money back.
   */

    let endGameMessage = ''

    
    if(player_score > 21){
      endGameMessage = 'You lose, score over 21'
    }else if(player_score == 21){
      endGameMessage = 'Black Jack'
    }else if(player_score > bank_score){
      endGameMessage = 'You win'
    }else if(player_score < bank_score){
      endGameMessage = 'You lose'
    }else if(player_score == bank_score){
      endGameMessage = 'Push, money back'
    }
  return endGameMessage   

}



function gameInterface(){
  //Initialiser le score de la banque
  let bankScore = pickBankScore()
  let playerScore = 0
  let answer = 'yes'
  
  function askForCard(){
      rl.question('Card? "y" or "yes" to get a new card : ', (answer) => {
        //Vérifier si l'utilisateur dis bien yes/y ou no/n
  
        if(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes'){
          //Si il dit oui tire une carte et on affiche le score   
          playerScore += pickPlayerCard()
          console.log(stateOfTheGame(playerScore, bankScore))
          //On vérifie si le score du joueur est plus petit que 21
          if(playerScore < 21){
            askForCard()
          }else{
            console.log(endGameMessage(playerScore, bankScore))
            rl.close()
          }
          
          
  
        }else if(answer.toLowerCase() === 'n' || answer.toLowerCase() === 'no'){
          //Si il dit non on affiche le résultat et on ferme le readline
          console.log(endGameMessage(playerScore, bankScore))
          rl.close()
        }else{
          //Si l'entrée est invalide on affiche un message d'erreur et on recommence
          console.log('Invalid input, please press y/yes or n/no')
          askForCard()
        }
        
      })
  
    }

  askForCard()
}

gameInterface()

module.exports = {
  pickBankScore,
  pickPlayerCard,
  stateOfTheGame,
  endGameMessage
};