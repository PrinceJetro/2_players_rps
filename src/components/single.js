import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./single.css"
import paper from  "./images/icon-paper.png"
import scissors from  "./images/icon-scissors.png"
import rock from  "./images/icon-rock.png"

import songUrl from './song.mp3'
import cheers from './cheers.mp3'


export default function Single(){

  const [score1,setScore1] = useState(0);
  const [check,setCheck] = useState(0);
  const  [winner, setWinner] = useState("")
  const [score2,setScore2] = useState(0);
  const [win,setWin] = useState("NO WINNER YET");
  const [firstPlayer, setFirstPlayer] = useState({
    username: 'P1',
    choice: ''
  });
  const [secondPlayer, setSecondPlayer] = useState({
    username: 'P2',
    choice: ''
  });
  const [next,setNext] = useState(`${firstPlayer.username}'s turn`);

  // Function to redirect user if screen width > 450px
  const redirectToURLIfScreenWidthIsGreaterThan450 = () => {
    if (window.innerWidth > 450) {
      window.location.href = 'https://rock-paper-scissors-challenge-phi.vercel.app/';
    }
  };

  // Use useEffect to call the redirection function
  useEffect(() => {
    redirectToURLIfScreenWidthIsGreaterThan450();
  }, []); // Empty dependency array ensures this runs once after component mounts
  // Function to initialize players
  const initializePlayers = () => {
    const username1 = prompt("Player 1, please enter your username:");
    if(username1 ==  null){
      alert("Please enter a valid username");
      return;
    }
    setFirstPlayer({ username: username1, choice: 'first' });

    alert("Please pass the phone to the seond player");

    const username2 = prompt("Player 2, please enter your username:");
    if(username2 ==  null){
      alert("Please enter a valid username");
      return;
    }
    setSecondPlayer({ username: username2, choice: 'second' });
    new Audio(songUrl).play()
        .then(() => {
      console.log('Audio started playing.');
  })
  .catch(error => {
      console.error('Error playing audio:', error);
  });

    document.getElementById("badge").style.display="flex"
    document.getElementById("game-div").style.display="flex"
    document.getElementById("next").style.display="flex"
    document.getElementById("load").style.display="none"

  };
  // Function to change player choices
  const change = () => {
    setFirstPlayer({ ...firstPlayer, choice: 'rock' });
    console.log(firstPlayer)
    setSecondPlayer({ ...secondPlayer, choice: 'scissors' });
    console.log(secondPlayer)
  };
  //update states
  useEffect(() => {
    console.log(firstPlayer);
  }, [firstPlayer]);

  useEffect(() => {
    console.log(secondPlayer);
  }, [secondPlayer]);

  useEffect(() => {
    console.log(check);
  }, [check]);

  useEffect(() => {
    if (check == 2){
      checkChoices();
    }
  }, [check]);
  
  // const images = document.querySelectorAll('.options');
  const handleImageClick = (event) => {
    const clickedImageId = event.target.id;
    // const id = prompt("Enter your ID:");

    if (check == 0) {
      setFirstPlayer((prevState) => ({
        ...prevState,
        choice: clickedImageId,
      }));
      setCheck(1)
      setNext(`${secondPlayer.username.toUpperCase()}'s turn`)
    } else if (check == 1) {
      setSecondPlayer((prevState) => ({
        ...prevState,
        choice: clickedImageId,
      }));
      setCheck(2)
      setNext(`${firstPlayer.username.toUpperCase()}'s turn`)
    } 
  };
    // Function to check if choices are equal
    const checkChoices = () => {
      document.getElementById("outcome_mobile").style.display="flex"
      document.getElementById("winner-mobile").style.display="flex"
      document.getElementById("game-div").style.display="none"
      document.getElementById("next").style.display="none"
      if (firstPlayer.choice.toLowerCase() === 'rock' && secondPlayer.choice.toLowerCase() === 'scissors') {
        setWin(`${firstPlayer.username.toUpperCase()} Wins`);
        setScore1(score1+1)
        document.getElementById("firstPlayer-image").src = rock;
        document.getElementById("secondPlayer-image").src = scissors;
      } else if (firstPlayer.choice.toLowerCase() === 'rock' && secondPlayer.choice.toLowerCase() === 'paper') {
        setWin(`${secondPlayer.username.toUpperCase()} Wins`);
        setScore2(score2+1)
        document.getElementById("firstPlayer-image").src = rock;
        document.getElementById("secondPlayer-image").src = paper;
      } else if (firstPlayer.choice.toLowerCase() === 'rock' && secondPlayer.choice.toLowerCase() === 'rock') {
        setWin('Draw');
        document.getElementById("firstPlayer-image").src = rock;
        document.getElementById("secondPlayer-image").src = rock;
      } else if (firstPlayer.choice.toLowerCase() === 'scissors' && secondPlayer.choice.toLowerCase() === 'paper') {
        setWin(`${firstPlayer.username.toUpperCase()} Wins`);
        setScore1(score1+1)
        document.getElementById("firstPlayer-image").src = scissors;
        document.getElementById("secondPlayer-image").src = paper;
      } else if (firstPlayer.choice.toLowerCase() === 'scissors' && secondPlayer.choice.toLowerCase() === 'rock') {
        setWin(`${secondPlayer.username.toUpperCase()} Wins`);
        setScore2(score2+1)
        document.getElementById("firstPlayer-image").src = scissors;
        document.getElementById("secondPlayer-image").src = rock;
      } else if (firstPlayer.choice.toLowerCase() === 'scissors' && secondPlayer.choice.toLowerCase() === 'scissors') {
        setWin('Draw');
        document.getElementById("firstPlayer-image").src = scissors;
        document.getElementById("secondPlayer-image").src = scissors;
      } else if (firstPlayer.choice.toLowerCase() === 'paper' && secondPlayer.choice.toLowerCase() === 'rock') {
        setWin(`${firstPlayer.username.toUpperCase()} Wins`);
        setScore1(score1+1)
        document.getElementById("firstPlayer-image").src = paper;
        document.getElementById("secondPlayer-image").src = rock;
      } else if (firstPlayer.choice.toLowerCase() === 'paper' && secondPlayer.choice.toLowerCase() === 'scissors') {
        setWin(`${secondPlayer.username.toUpperCase()} Wins`);
        setScore2(score2+1)
        document.getElementById("firstPlayer-image").src = paper;
        document.getElementById("secondPlayer-image").src = scissors;
      } else if (firstPlayer.choice.toLowerCase() === 'paper' && secondPlayer.choice.toLowerCase() === 'paper') {
        setWin('Draw');
        document.getElementById("firstPlayer-image").src = paper;
        document.getElementById("secondPlayer-image").src = paper;
      }

      setFirstPlayer((prevState) => ({
        ...prevState,
        choice: "",
      }));

      setFirstPlayer((prevState) => ({
        ...prevState,
        choice: "",
      }));
      setCheck(0)
          };

    const again =() =>{
      document.getElementById("outcome_mobile").style.display="none"
      document.getElementById("winner-mobile").style.display="none"
      document.getElementById("game-div").style.display="flex"
      document.getElementById("next").style.display="block"
      setNext(`${firstPlayer.username.toUpperCase()}'s turn`)
    }

  useEffect(() => {
    if(score1 == 2){
      new Audio(cheers).play()
                .then(() => {
              console.log('Someone won.');
          })
          .catch(error => {
              console.error('Error playing audio:', error);
          });
      document.getElementById("badge").style.display="none";
      document.getElementById("game-div").style.display="none";
      document.getElementById("outcome_mobile").style.display="none";
      document.getElementById("next").style.display="none";
      document.getElementById("winner-mobile").style.display="none";
      document.getElementById("winner").style.display="block";
      setWinner(firstPlayer.username.toUpperCase()
      )

    }
    else if (score2  == 2){
      new Audio(cheers).play()
                .then(() => {
              console.log('Someone won.');
          })
          .catch(error => {
              console.error('Error playing audio:', error);
          });
      document.getElementById("badge").style.display="none";
      document.getElementById("game-div").style.display="none";
      document.getElementById("outcome_mobile").style.display="none";
      document.getElementById("checkwinner").style.display="none";
      document.getElementById("winner-mobile").style.display="none";
      document.getElementById("winner").style.display="block";
      setWinner(secondPlayer.username.toUpperCase())
  }
  }, [score1, score2, firstPlayer, secondPlayer]);
  

    return(

      
        <div className="container-fluid">
  <div className="badge" id="badge">
    <div className="title-div">
      <h1>ROCK</h1>
      <h1>PAPER</h1>
      <h1>SCISSORS</h1>
    </div>
    <div className="score-div">
      <p>Score</p>
      <h1 id="score">{`${firstPlayer.username[0].toUpperCase()}: ${score1}` }</h1>
      <h1 id="score">{`${secondPlayer.username[0].toUpperCase()}: ${score2}` }</h1>
    </div>
  </div>

 
 
  <h1 id="next">{next}</h1>
 
  <div className="game-div" id="game-div">

    <div className="options" onClick={handleImageClick} id="paper">
      <img  src={paper} alt="paper" id="PAPER"/>
    </div>
    <div className="options" onClick={handleImageClick} id="scissors">
      <img src={scissors} alt="scissors" id="SCISSORS"/>
    </div>
    <div className="options" onClick={handleImageClick} id="rock">
      <img src={rock} alt="rock" id="ROCK"/>
    </div>

  </div>





  <div id="outcome_mobile" className="outcome_mobile">

    <div className="user-pick-div">
    <div id="user-pick-mobile">
      <img id="firstPlayer-image" alt=""/>
    </div>
    <h4>{firstPlayer.username.toUpperCase()} PICKS</h4>
    </div>

    <div className="house-pick-div">
    <div id="house-pick-mobile">
      <img id="secondPlayer-image" alt=""/>
    </div>
    <h4>{secondPlayer.username.toUpperCase()} PICKS</h4>
    </div> <br/>

  </div>

  <div className="winner" id="winner-mobile">
    <h1 id="win-mobile">{win}</h1>
    <button className="btn" onClick={again} >Play Again</button>
  </div>

  {/* <button className="btn btn-primary m-4" id="myBtn"onClick={change}>Rules</button> */}

  <div id="myModal" className="modal">


    <div className="modal-content">
      <span className="close">&times;</span>
      <h1>Rules</h1>
      <img src="./images/image-rules.png" alt="rules"/>
    </div>
  
  </div>

      <div id="load">
      <div>
      <a href="https://rock-paper-scissors-challenge-phi.vercel.app/"><button className="btn btn-dark p-2 m-3 loadBtn">SINGLE PLAYER MODE</button></a>
        <button className="btn btn-dark p-2 m-3 loadBtn" onClick={initializePlayers}>TWO PLAYERS MODE</button>
      </div>
      </div>

      <div id="winner">
        <h1>{winner} WINS</h1>
        <a href="">Play again</a>
      </div>

</div>
    )
}
