import React, { useEffect, useRef, useState } from "react";

function Grid({ n, m, color, setAnswer, round }:{n:number, m:number, color:string, setAnswer:any, round:number}) {
  const [cursorX, setCursorX] = useState<number>(0);
  const [cursorY, setCursorY] = useState<number>(0);
  const [deviceType, setDeviceType] = useState<string>("");
  const [coloring, setColoring] = useState<boolean>(false);
  const [tool, setTool] = useState<string>("brush");
  const [boxes, setBoxes] = useState<any>({});
  const [colored, setColored] = useState<number>(0);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let temp1: any = {};
    for (let i = 0; i < n * m; i++) {
      temp1[i] = { color: false };
    }
    setBoxes(temp1);

  }, [n,m,round])

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
      if (boxes?.[i]?.color) {
        count++;
      }
    }
    setColored(count);
    setAnswer(count*100/(n*m));
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
    let index = row * n + col;
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
    <div
      className="main cursor-none"
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
          // variant={tool === "brush" ? "info" : "light"}
          onClick={() => setTool("brush")}
          style={{ marginRight: "10px" }}
          title="Brush"
        >
          <img src="brush.png" height={30} width={30} />
        </button>
        <button
          className={`p-1.5 rounded ${tool === "eraser" ? "bg-blue-300" : "bg-yellow-100"}`}
          // variant={tool === "eraser" ? "info" : "light"}
          onClick={() => setTool("eraser")}
          style={{ marginRight: "10px" }}
          title="Eraser"
        >
          <img src="eraser.png" height={30} width={30} />
        </button>

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
            style={{ backgroundColor: boxes[index].color ? color : "white" }}
            onClick={(e) => setColor(Number(index))}
            onMouseEnter={ (e) => {coloring &&setColor(Number(index))}}
            onMouseDown={(e) => setColor(Number(index))}
            onTouchStart={(e) => setColor(Number(index))}
            draggable="false"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Grid;
