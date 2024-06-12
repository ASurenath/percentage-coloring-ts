import React from 'react'

function EndMessage({score,totalScore,longMessage,resetGame,setFrame,setShowEndMessage}:any) {
  return (
    <div className={`alert-container backdrop-blur-sm `}>
    <div className="alert-box bg-black rounded p-2 sm:p-12 text-center mx-auto">
      <div className="message-box  rounded p-3 "><h1 className="text-white text-3xl">Your Score: {score}/{totalScore} </h1>
      <p className="text-white">{longMessage}</p>
      </div>
      <div className='d-flex justify-content-center'>
        <button onClick={()=>{resetGame();setShowEndMessage(false)}} className="bg-blue-500 p-2 rounded text-lg text-white text-bold">Play Again</button>
        <button onClick={() => {setFrame("menu");setShowEndMessage(false)}} className="bg-blue-500 p-2 rounded ms-2 text-lg text-white text-bold">Back to Menu</button>
        </div>

    </div>
  </div>
  )
}

export default EndMessage