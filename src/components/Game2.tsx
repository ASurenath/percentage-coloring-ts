import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import CustomAlert from "./CustomAlert";
import EndMessage from "./EndMessage";
import Answer from "./Answer";

function Game2({setFrame,color,totalRounds,scorePerRound,nScorePerRound}:{
  setFrame:any,
  color:string,
  totalRounds:number,
  scorePerRound:number,
  nScorePerRound:number}) {
  const [round, setRound] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [answer, setAnswer] = useState<number>(0);
  const [dim, setDim] = useState<any>({ n: 5, m: 5 });
  const [percent, setPercent] = useState<number>(0);
const [showEndMessage, setShowEndMessage] = useState<boolean>(false);
  //   for alert
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("success");
  const [message, setMessage] = useState<string>("");
  const [longMessage, setLongMessage] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const [endLongMessage, setEndLongMessage]=useState<string>("");
  const successMessages: string[] = [
    "Great job!",
    "You're amazing!",
    "Keep it up!",
    "Well done!",
    "You're awesome!",
    "Fantastic!",
    "Superb!",
    "You rock!",
    "Bravo!",
    "Way to go!",
    "You're a star!",
    "Terrific!",
    "You're incredible!",
    "Outstanding!",
    "You're shining!",
    "Thumbs up!",
    "You're brilliant!",
    "Excellent!",
    "Keep shining!",
    "You're a champion!",
  ];
  const encoragingMessages: string[] = [
    "Keep trying, you're close!",
    "Don't worry, you've got this!",
    "Keep going, you'll get there!",
    "Don't worry, try again!",
    "Don't give up, you'll succeed!",
    "Keep trying, you're making progress!",
    "You're almost there, keep going!",
    "Keep pushing, you're on the right track!",
    "Stay positive, try once more!",
    "Don't stop, try one more time!",
    "You'll get it next time!",
    "Don't give up yet, you're improving!",
    "Don't give up, you're doing great!",
    "Don't worry, keep trying, champ!",
  ];

  useEffect(() => {
    let tempDim = dims[(Math.random() * dims.length) | 0];
    setDim(tempDim);
    let p =
      (100 / (tempDim.n * tempDim.m)) *
      Math.floor(Math.random() * (tempDim.n * tempDim.m + 1));
    if(p==0){setPercent((100 / (tempDim.n * tempDim.m)))}
    else{setPercent(p);}
    console.log(tempDim, p);
    setShowAnswer(false);
  }, [round]);
  const dims:{n:number,m:number}[] = [
    { n: 2, m: 1 },
    { n: 1, m: 2 },
    { n: 1, m: 5 },
    { n: 5, m: 1 },
    { n: 2, m: 5 },
    { n: 5, m: 2 },
    { n: 4, m: 5 },
    { n: 5, m: 4 },
    { n: 5, m: 5 },
    { n: 10, m: 5 },
    { n: 5, m: 10 },
    { n: 10, m: 10 },
  ];
//   parameters
//   const totalRounds = 10;
//   const scorePerRound = 10;
//   const nScorePerRound = 0;
  const handleSubmit = () => {
    let correct
   
    if (answer === percent) {
      correct = true;
      console.log("correct");
      let lMessage = successMessages[(Math.random() * successMessages.length) | 0];
      showMessage("Correct", 1500, "success",lMessage);
      setScore(score + scorePerRound);
      setTimeout(() => {
        next();
    }, 1500);
    } else {
      correct=false
      console.log("wrong");
      let lMessage = encoragingMessages[(Math.random() * encoragingMessages.length) | 0];
      showMessage("Try again", 1500, "warning",lMessage);
    }
   
  };
  //   for alert
  const showMessage = (message: string, time: number, type:string,lMessage:string) => {
    setAlertType(type);
    setMessage(message);
    setLongMessage(lMessage);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, time);
  };
const resetGame = () => {
  setRound(1);
  setScore(0);
  setAnswer(0);
  setDim({ n: 5, m: 5 });
  setPercent(0);
  setShowEndMessage(false);
  setShowAnswer(false);
}
const next=()=>{
  if (round == totalRounds) {
    console.log(totalRounds*scorePerRound);
    if(score>=totalRounds*scorePerRound*0.8){
      setEndLongMessage( "Wow! Great Job");
    }
    else if(score>=totalRounds*scorePerRound*0.4){
      setEndLongMessage("Good Job!");
    }
    else{
      setEndLongMessage("Don't give up.Try Again!")
    }
    setShowAnswer(false);
      setShowEndMessage(true);
 
  } else {
    console.log('round',round);
    setRound(round + 1)
  }}
  
  return (
    <>
    <div className="flex justify-start items-center my-5">
      <button onClick={() => setFrame("menu")}className="text-xl font-bold text-white rounded-5 bg-blue-500 p-2 rounded"> Back to menu</button>
    </div>
    <div className="text-center m-1" ><span className="rounded rounded-3xl bg-black p-2 text-white text-3xl"> {round}/{totalRounds}</span></div>
      <h2 className="text-center m-2 text-3xl">Color {percent}% of the grid</h2>
      <div >
        <Grid n={dim.n} m={dim.m} color={color} setAnswer={setAnswer} round={round}></Grid>
      </div>
      <div className="flex flex-wrap justify-evenly items-center p-3">
      <button onClick={() => {setShowAnswer(true);setScore(score-nScorePerRound);}} className="text-xl font-bold py-3 bg-yellow-300 p-2 rounded">Skip & see answer</button>
      <button onClick={handleSubmit} className="text-xl font-bold py-3 bg-green-700 p-2 rounded text-bold text-white">Submit</button>
      </div>
      {showAlert && <CustomAlert message={message} type={alertType} longMessage={longMessage} />}
      {showEndMessage && <EndMessage score={score} totalScore={totalRounds*scorePerRound} longMessage={endLongMessage} resetGame={resetGame} setFrame={setFrame} setShowEndMessage={setShowEndMessage}/>}
      {showAnswer && <Answer n={dim.n} m={dim.m} p={percent} next={next} color={color}></Answer>}
    </>
  );
}

export default Game2;
