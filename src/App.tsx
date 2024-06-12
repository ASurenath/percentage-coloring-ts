import './App.css';
import Game1 from './components/Game1';
import Game2 from './components/Game2';
import { useState } from 'react';



function App() {
  const [frame, setFrame] = useState("menu");
  const [color ,setColor] = useState("#d779a7");
  const [totalRounds , setTotalRounds] = useState(10);
  const [scorePerRound , setScorePerRound] = useState(10);
  const [nScorePerRound , setNScorePerRound] = useState(0);
console.log(color);

  return (
    <div className="App p-1 px-5">
        {frame=="menu" && 
        <>
        <div className='menu flex flex-col items-center justify-evenly'>
        <h1 className='text-center text-5xl m-5'>Percentage Coloring</h1>

        <button onClick={() => {setFrame("learning");}} className="text-4xl font-bold p-2 my-5 bg-blue-500 text-white rounded">Learn</button>
          <button onClick={() => {setFrame("game1");}} className="text-4xl font-bold p-2 my-5 bg-blue-500 text-white rounded">Play</button>
          <button onClick={() => {setFrame("settings");}} className="text-4xl font-bold p-2 my-5 bg-blue-500 text-white rounded"><h1><i className="fa-solid fa-gear"/></h1></button>
        </div>
        </>}
        {frame=="learning" && <Game1 setFrame={setFrame} color={color} ></Game1>}
        {frame=="game1" && <Game2 setFrame={setFrame} color={color} totalRounds={totalRounds} scorePerRound={scorePerRound} nScorePerRound={nScorePerRound}></Game2>}
        {frame=="settings" && <>
        <div className='menu flex flex-col items-center justify-evenly'>
        <h1 className='text-5xl mb-5'>Settings</h1>

<div className='settings-grid'>
<label htmlFor='color' className='text-2xl'>Paint color:</label>

            <div className='flex items-center'>
              <input type="color" onChange={(e)=>{setColor(e.target.value)}} value={color} id='color' className='cursor-pointer '/>
              <button onClick={() => { setColor("#d779a7") }} className='m-0 ms-2 text-2xl bg-blue-500 text-white rounded p-1' title='default'> <i className="fa-solid fa-arrow-rotate-left"></i>Default</button>
            </div>
    
             <label htmlFor='rounds' className='text-2xl' >Rounds:</label> <input className='p-2 rounded-lg w-1/2 text-center' type="number" min={5} max={50} onChange={(e)=>{Number(e.target.value)>50?setTotalRounds(50):Number(e.target.value)<5?setTotalRounds(5):setTotalRounds(Number(e.target.value))}} value={totalRounds} id='rounds'/>
    

            <label htmlFor='score' className='text-2xl'>Score per question:</label><input className='p-2 rounded-lg w-1/2 text-center' type="number" min={1} max={50} onChange={(e)=>{Number(e.target.value)>50?setScorePerRound(50):Number(e.target.value)<1?setScorePerRound(1):setScorePerRound(Number(e.target.value))}} value={scorePerRound} id='score' />
    

    <label htmlFor='nSccore' className='text-2xl'>Negative score per question:</label> <input className='p-2 rounded-lg w-1/2 text-center' type="number" min={0} max={10} onChange={(e)=>{Number(e.target.value)>10?setNScorePerRound(10):Number(e.target.value)<0?setNScorePerRound(0):setNScorePerRound(Number(e.target.value))}} value={nScorePerRound} id='nSccore' />
</div>
         <button onClick={() => {setFrame("menu");}} className="text-2xl font-bold p-2 mt-6 bg-blue-500 text-white rounded">Save & back</button>
        </div>
        </>
       }
    </div>
  );
}

export default App;
