import React, { useState, useCallback } from 'react';

// When we add React.memo we intend that Hello will be re rendered only when the incrementCount changes, but since it is passed as an arrow function from parent it is changing all the time, so React.memo is not useful here.
const Hello1 = React.memo(({ incrementCount }) => {
  console.log("Hello1 rendered");
  return (
    <button onClick={() => incrementCount(5)} >
      Increment by 5
    </button>
  );
});
export const UseCallbackApp1 = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback((n) => {
    setCount(c => c + n);
  }, [setCount])

  return (
    <>
      <Hello1
        // This arrow function gets created on every single render
        // incrementCount={() => setCount(c => c + 1)}
        // To solve above problem we use useCallback hook
        incrementCount={handleIncrement}
      />
      <div>Count: {count}</div>
    </>
  );
};


const Hello2 = React.memo(({ incrementCount }) => {
  console.log("Hello2 rendered");
  return (
    <button onClick={() => incrementCount(5)} >
      Increment by 5
    </button>
  );
});
const Box = React.memo(({ handleIncrement, n }) => {
  console.log("Box rendered");
  return (
    <button onClick={() => handleIncrement(n)} >
      {n}
    </button>
  );
});
export const UseCallbackApp2 = () => {
  const [count, setCount] = useState(0);
  const favoriteNums = [5, 10, 15];

  const handleIncrement = useCallback((n) => {
    setCount(c => c + n);
  }, [setCount])

  return (
    <>
      <Hello2
        // Incorrect way
        // incrementCount={() => setCount(c => c + 5)}
        // Correct way
        incrementCount={handleIncrement}
      />
      <div>Count: {count}</div>
      {favoriteNums.map((n) => {
        return (
          <Box
            // Incorrect way
            // handleIncrement={() => setCount(c => c + n)}
            // Correct way
            handleIncrement={handleIncrement}
            n={n}
            key={n}
          />
        )
      })}
    </>
  );
};