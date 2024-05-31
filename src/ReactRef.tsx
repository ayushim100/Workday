import React, { forwardRef, useRef } from "react";

//To use jsx the extension must be tsx
function MyComponent() {
  const myRef = useRef(null);

  const changeColor = () => {
    console.log(myRef.current);
  };


  return (
    <div>
    <input type="text" ref={myRef} />
    <button onClick={changeColor}>Get Value</button>
    </div>

  );
}

export default MyComponent;

