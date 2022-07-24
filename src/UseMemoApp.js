import React, { useState, useEffect, useRef, useMemo } from 'react';


const useFetch = (url) => {
  const isCurrent = useRef(true);
  const [state, setState] = useState({ data: [], loading: true })
  useEffect(() => {
    return () => {
      isCurrent.current = false;
    }
  }, []);
  useEffect(() => {
    setState(state => ({ data: state.data, loading: true }));
    fetch(url).then(res => res.json()).then(res => {
      if (isCurrent.current) {
        setState({ data: res, loading: false });
      }
    });
  }, [url, setState]);
  return state;
}
const getLongestWord = (data) => {
  if (data.length == 0) {
    return "";
  }
  console.log("computing longest word");
  let longestWord = "";

  data.forEach(sentence => {
    sentence.split(" ").forEach(word => {
      if (word.length > longestWord.length) {
        longestWord = word;
      }
    })
  })

  return longestWord;
}
// In following example when we are increamenting count our app is re rendering and the getLongestWord() function gets called again and again, to fix this we use useMemo hook.
export const UseMemoApp1 = () => {
  const [count, setCount] = useState(0);
  const { data } = useFetch("https://raw.githubusercontent.com/ajzbc/kanye.rest/quotes/quotes.json");

  const longestWord = useMemo(() => getLongestWord(data), [data]);

  return (
    <>
      <div>Count: {count}</div>
      <button onClick={() => setCount(c => c + 1)} >Increment</button>
      {/*wrong way*/}
      {/*<div>Longest word: {getLongestWord(data)}</div>*/}
      {/*correct way*/}
      {<div>Longest word: {longestWord}</div>}
    </>
  );
};
