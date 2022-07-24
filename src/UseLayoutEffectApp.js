import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

export const UseLayoutEffectApp1 = () => {
  const [value, setValue] = useState(0);

  // This will cause flicker
  useEffect(() => {
    if (value === 0) {
      setValue(Math.random());
    }
  }, [value]);

  // // This will run smoothly
  // useLayoutEffect(() => {
  //   if (value === 0) {
  //     setValue(Math.random());
  //   }
  // }, [value]);

  return (
    <>
      <div>value: {value}</div>
      <button onClick={() => setValue(0)}>"Click Me!"</button>
    </>
  );
};


const Message = ({ boxRef, children }) => {
  const msgRef = React.useRef(null);

  // Jumpy behaviour
  useEffect(() => {
    const rect = boxRef.current.getBoundingClientRect();
    msgRef.current.style.top = `${rect.height + rect.top}px`;
  }, []);

  // Smooth behaviour
  // useLayoutEffect(() => {
  //   const rect = boxRef.current.getBoundingClientRect();
  //   msgRef.current.style.top = `${rect.height + rect.top}px`;
  // }, []);

  return <div ref={msgRef} className="msg">{children}</div>;
};
export const UseLayoutEffectApp2 = () => {
  const [show, setShow] = React.useState(false);
  const boxRef = React.useRef(null);

  return (
    <div>
      <button ref={boxRef} className="btn" onClick={() => setShow(prev => !prev)}>Show Message</button>
      {show && <Message boxRef={boxRef}>Foo bar baz</Message>}
    </div>
  );

  // Following css applied
  // .btn {
  //   background: green;
  //   color: white;
  // }
  // .msg {
  //   position: relative;
  //   border: 2px solid red;
  // }
};





