import React, { useState, useEffect, useRef } from 'react';


export const UseRefApp1 = () => {
  const inputRef = useRef();
  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={() => {
        inputRef.current.focus();
      }}>focus</button>
    </>
  );
};


const Hello1 = () => {
  // renderCount will behave like a class variable it will not reintialize even after Hello component renders. 
  let renderCount = useRef(0);
  console.log("renders", renderCount.current++);
  React.useEffect(() => {
    // Even if you change renderCount it will not trigger re-render of Hello component
    console.log("useEffect");
    // cleaning function gets called when component is going to unmount
    return () => {
      console.log("unmount");
    };
  }, []);
  return <div>Hello!</div>;
};
export const UseRefApp2 = () => {
  const [showHello, setShowHellow] = useState(true);
  const [name, setName] = useState("");
  return (
    <>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
      <button onClick={() => setShowHellow(!showHello)}>show/hide Hello</button>
      {showHello ? <Hello1 /> : null}
    </>
  );
};


export const useFetch = (url) => {
  const isCurrent = useRef(true);
  const [state, setState] = useState({ data: null, loading: true })
  useEffect(() => {
    return () => {
      isCurrent.current = false;
    }
  }, [])
  useEffect(() => {
    setState(state => ({ data: state.data, loading: true }));
    fetch(url).then(res => res.text()).then(res => {
      setTimeout(() => {
        if (isCurrent.current) {
          setState({ data: res, loading: false });
        }
      }, 3000);
    });
  }, [url, setState]);
  return state;
}
const Hello2 = () => {
  const [count, setCount] = useState(() => JSON.parse(localStorage.getItem("count")) || 0);
  const { data } = useFetch(`http://numbersapi.com/${count}/trivia`);
  // This will create a class level function 
  const sayHello = useRef(() => { console.log("Hello!") })
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count])

  return (
    <>
      <div>{data ? data : "loading..."}</div>
      <div>count: {count}</div>
      <button onClick={() => {setCount(c => c + 1); sayHello.current()}}>Increament</button>
    </>
  );
};
export const UseRefApp3 = () => {
  const [showHello, setShowHellow] = useState(true);
  return (
    <>
      <button
        onClick={
          () => {
            setShowHellow(!showHello);
          }
        }
      >show/hide Hello</button>
      {showHello ? <Hello2 /> : null}
    </>
  );
};
