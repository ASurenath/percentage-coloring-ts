import React, { useEffect, useRef, useState } from "react";

function Game1({ color,setFrame }:{color:string,setFrame:any}) {
  const [cursorX, setCursorX] = useState<number>(0);
  const [cursorY, setCursorY] = useState<number>(0);
  const [deviceType, setDeviceType] = useState<string>("");
  const [coloring, setColoring] = useState<boolean>(false);
  const [tool, setTool] = useState<"brush"|"eraser">("brush");
  const [boxes, setBoxes] = useState<{[key:number]:{color:boolean}}>({});
  const [colored, setColored] = useState<number>(0);
  const container = useRef<HTMLDivElement>(null);
  const [n, setN] = useState<number>(5);
  const [m, setM] = useState<number>(5);
  const nMax:number = 10;
  const mMax:number = 10;
  const [selectGrid, setSelectGrid] = useState<any>({});
  const [gridSelectHovered, setGridSelectHovered] = useState<boolean>(false);
  const [hoveredBox, setHoveredBox] = useState<[number,number]>([-1,-1]);
const [showCustomMenu, setShowCustomMenu] = useState<boolean>(false);
console.log(gridSelectHovered,hoveredBox);
useEffect(() => {
  let temp1:{[key:number]:{color:boolean}} = {};
  for (let i = 0; i < n * m; i++) {
    temp1[i] = { color: false };
  }
  setBoxes(temp1);
  let temp2: {[key:number]:{n:number,m:number,selected:boolean}} = {};
  for (let i = 0; i < mMax; i++) {
    for(let j = 0; j < nMax; j++){
      temp2[j * mMax + i] = {n: j+1, m: i+1,selected:j<n && i<m};
    }
  }
  setSelectGrid(temp2);
}, [n,m])

  useEffect(() => {
    // add event listeners
    document.addEventListener("mousedown", () => {
      setColoring(true);
    });
    document.addEventListener("mouseup", () => {
      setColoring(false);
    });
    return () => {
      document.removeEventListener("mousedown", () => {
        setColoring(true);
      });
      document.removeEventListener("mouseup", () => {
        setColoring(false);
      });
    };
  }, []);
  useEffect(() => {
    let count = 0;
    for (let i = 0; i < n * m; i++) {
      if (boxes[i]?.color) {
        count++;
      }
    }
    setColored(count);
  }, [boxes]);

  // check if it is a touch device
  const isTouchDevice = () => {
    try {
      document.createEvent("TouchEvent");
      setDeviceType("touch");
      return true;
    } catch (e) {
      setDeviceType("mouse");
      return false;
    }
  };
  const renderCustomMenu = ()=>
{
      return (
        <div
        className="custom-menu bg-white p-3  border border-3 border-blue-500"
        >
          <div className="flex justify-between items-center">
            <p>Grid dimention</p>
            <p>{`${m} x ${n}`}</p>
            <button onClick={() => setShowCustomMenu(false)} className="pt-0 mt-0"> <i className="fa-solid fa-xmark"></i></button>
          </div>
          <div
            style={{zIndex:1002,display: "grid",
            gridTemplateColumns: `repeat(${nMax}, 1fr)`,
            // gridRowHeight: "1fr",
          }}
            onMouseEnter={() => setGridSelectHovered(true)}
            onMouseLeave={() => setGridSelectHovered(false)}
          >
            
            {Object.values(selectGrid).map((item:any, index:number) => (
              <button
                key={index}
                style={{width:"100%",height:"100%"}}
                className={`m-1 border-box rounded-0 border border-grey-700 p-0 sm:p-2 ${gridSelectHovered?(item.n <= hoveredBox[0] && item.m <= hoveredBox[1] ? "bg-blue-300" : "bg-white"):(item.selected ? "bg-blue-300" : "bg-white")}`}
                onClick={() => {
                  console.log("clicked");
                  setN(item.n);
                  setM(item.m);
                }}
                onMouseEnter={() => setHoveredBox([item.n, item.m])}
  >          </button>
            ))}
          </div>
        </div>
       
      );
    }
  const move = (e: any) => {
    const touchEvent = e.touches ? e.touches[0] : null;
    const x = !isTouchDevice() ? e.clientX : touchEvent?.clientX || 0;
    const y = !isTouchDevice() ? e.clientY : touchEvent?.clientY || 0;
    const offsetX = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft;
    const offsetY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    setCursorX(x+offsetX);
    setCursorY(y+offsetY);
  };
  const handleTouchMove = (event: any) => {
    // Check if touch position is within the element's boundaries
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    let col = Math.floor((touchX - rect.left) / (rect.width / n));
    let row = Math.floor((touchY - rect.top) / (rect.height / m));
    let index: number = row * n + col;
    if (index >= 0 && index < n * m) {
      setColor(index);
    }
  };

  const setColor = (index: number) => {
    let temp = { ...boxes };
    if (tool === "brush") {
      temp[index].color = true;
    } else {
      temp[index].color = false;
    }
    setBoxes(temp);
  };

  const style1 = {
    display: "grid",
    gridTemplateColumns: `repeat(${m}, 1fr)`,
    gridRowHeight: "1fr",
    touchEvents: "none",
  };

  return (
    <>
    <div className="flex justify-start items-center my-5">
      <button onClick={() => setFrame("menu")} className="text-xl font-bold p-2 rounded bg-blue-500 text-white"> Back to menu</button>
    </div>
      <div
        className="main cursor-none bg-yellow"
        ref={container}
        onMouseMove={move}
        onClick={move}
        onTouchMove={move}
        onTouchStart={move}
        onDrag={move}
      >
        
        <img
          src={tool === "brush" ? "brush.png" : "eraser.png"}
          draggable="false"
          id="cursor"
          className="absolute"
          height={50}
          width={50}
          style={{ left: `${cursorX}px`, top: `${cursorY - 50}px`, zIndex: 1001 }}
        ></img>
        <div className="flex justify-center items-center pb-3">
          <button
            className={`p-1.5 rounded ${tool === "brush" ? "bg-blue-300" : "bg-yellow-100"}`}
            onClick={() => setTool("brush")}
            style={{ marginRight: "10px" }}
            title="Brush"
          >
            <img src="brush.png" height={30} width={30} />
          </button>
          <button
            className={`p-1.5 rounded ${tool === "eraser" ? "bg-blue-300" : "bg-yellow-100"}`}
            onClick={() => setTool("eraser")}
            style={{ marginRight: "10px" }}
            title="Eraser"
          >
            <img src="eraser.png" height={30} width={30} />
          </button>
          <button
            className={`p-1.5 rounded  ${showCustomMenu ? "bg-blue-300" : "bg-yellow-100"}`}
            style={{ marginRight: "10px" }}
            onClick={() => setShowCustomMenu(!showCustomMenu)}
            title="Grid dimention"
          >
            <svg height={30} width={30} xmlns="http://www.w3.org/2000/svg">
              <line x1="0" x2="30" y1="1" y2="1" stroke="black" strokeWidth="1" />
              <line
                x1="0"
                x2="30"
                y1="15"
                y2="15"
                stroke="black"
                strokeWidth="1"
              />
              <line
                x1="0"
                x2="30"
                y1="29"
                y2="29"
                stroke="black"
                strokeWidth="1"
              />
              <line
                x1="15"
                x2="15"
                y1="0"
                y2="30"
                stroke="black"
                strokeWidth="1"
              />
              <line x1="1" x2="1" y1="0" y2="30" stroke="black" strokeWidth="1" />
              <line
                x1="29"
                x2="29"
                y1="0"
                y2="30"
                stroke="black"
                strokeWidth="1"
              />
            </svg>
          </button>
  
          {showCustomMenu && (
            renderCustomMenu()
          )}
  
        </div>
        <div
          style={style1}
          className="border border-5 border-black grid-container"
          onTouchMove={handleTouchMove}
        >
          {Object.keys(boxes).map((index) => (
            <div
              key={index}
              className="border border-black grid-item"
              style={ { backgroundColor:boxes[Number(index)].color ? color:'white' }}
              onClick={(e) => setColor(Number(index))}
              onMouseEnter={ (e) => {coloring&&setColor(Number(index))}}
              onMouseDown={(e) => setColor(Number(index))}
              onTouchStart={(e) => setColor(Number(index))}
              draggable="false"
            ></div>
          ))}
        </div>
        <p className="text-center leading-loose">
        Out of  &nbsp;<span className="text-3xl">{(n * m)}</span>&nbsp;box{n * m == 1 ? "" : "es"}, &nbsp;
           <span className="text-3xl">{colored}</span> {colored==1?"box is":"boxes are"} colored. <br/>
          Which is &nbsp;<span className="text-3xl">{colored}/{n * m}</span>&nbsp; part of the grid. <br/>
          So, <span className="text-3xl">({colored}/{n * m}) X 100{" "}</span>
          {Number(((colored / (n * m)) * 100).toFixed(2) )== (colored / (n * m)) * 100
            ? "="
            : "≈"}&nbsp;
          <span className="text-5xl">
            {Math.round((colored / (n * m)) * 100)}% 
          </span>&nbsp;
          of the grid is colored
        </p>
       
      </div>
    </>
  );
}

export default Game1;
