import React, { useState, useEffect } from 'react';

// https://overreacted.io/a-complete-guide-to-useeffect/

// React hooks closure problem : https://www.youtube.com/watch?v=eTDnfS2_WE4

export const Hello = () => {
  useEffect(() => {
    console.log("useEffect");
    return () => {
      console.log("unmount");
    };
  }, []);
  return <div>Hello!</div>;
};
export const UseEffectApp1 = () => {
  const [showHello, setShowHellow] = useState(true);
  return (
    <>
      <button onClick={() => setShowHellow(!showHello)}>show/hide Hello</button>
      {showHello ? <Hello /> : null}
    </>
  );
};


export const UseEffectApp2 = () => {
  useEffect(() => {
    function onMouseMove(e) {
      console.log(e);
    }
    window.addEventListener("mousemove", onMouseMove);
    // cleaning function gets called everytime 
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    }
  }, [])
  return (
    <></>
  );
};


const useFetch = (url) => {
  const [state, setState] = useState({ data: null, loading: true })
  useEffect(() => {
    setState(state => ({ data: state.data, loading: true }));
    fetch(url).then(res => res.text()).then(res => {
      setState({ data: res, loading: false });
      console.log(res);
    });
  }, [url, setState]);
  return state;
}
export const UseEffectApp3 = () => {
  const [count, setCount] = useState(() => JSON.parse(localStorage.getItem("count")) || 0);
  const { data } = useFetch(`http://numbersapi.com/${count}/trivia`);
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count])
  return (
    <>
      <div>{data ? data : "loading..."}</div>
      <button onClick={() => setCount(c => c + 1)}>Increament</button>
    </>
  );
};
