import React, { useEffect, useState } from 'react'

function Answer({n,m,p,next,color}:{n:number,m:number,p:number,next:any,color:string}) {
    const [boxes, setBoxes] = useState<{[key:number]:{color:boolean}}>({});

  useEffect(() => {
    let temp: any = {};
    let colored = Math.round(n*m*p/100)
    for (let i = 0; i < n * m; i++) {
      temp[i] = { color: i<colored }
    }
    setBoxes(temp);
  }, [n,m])
  const style1 = {
    display: "grid",
    gridTemplateColumns: `repeat(${m}, 1fr)`,
    gridRowHeight: "1fr",
    touchEvents: "none",
    outline:'3px solid white',
  };
  return (
    <div className={`alert-container backdrop-blur-sm `}>
    <div className="alert-box bg-black rounded p-2 p-sm-5 flex flex-col items-center justify-center text-center mx-auto answer">
      <div className="message-box  rounded p-3 ">
      <h1 className="text-white">Answer</h1>
      <p className="text-white">There are total {n*m} boxes.<br/>
In order to color {p}% of the grid,<br/> you need to color  {n*m}x({p}/100)= {Math.round(n*m*p/100)} box{Math.round(n*m*p/100)!=1&&'es'}.
<br/>
eg:-
      </p>
        <div
        style={style1}
        className="border border-black grid-container"
      >
        {Object.keys(boxes).map((index) => (
          <div
            key={index}
            className="border border-black grid-item"
            style={{ backgroundColor: boxes[Number(index)].color ? color : "white" }}
          ></div>
        ))}
      </div>
      </div>
      <div className='flex justify-center'>
        <button onClick={next} className="bg-blue-500 text-white rounded p-2 text-xl font-bold">Next</button>
        </div>

    </div>
  </div>
  )
}

export default Answer