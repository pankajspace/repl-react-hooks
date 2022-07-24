import React, { useState } from 'react';


const expensiveInitialState = () => {
  return 10;
}
export const UseStateApp1 = () => {
  // expensiveInitialState only gets called once even if the component renders again it will not be called again. Use this syntax if you have to do a heavy computation for getting initial state.
  const [count, setCount] = useState(() => expensiveInitialState());

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}> + </button>
      <div>{count}</div>
    </div>
  );
}


export const UseStateApp2 = () => {
  const [{ count1, count2 }, setCount] = useState({ count1: 0, count2: 0 });
  return (
    <div>
      <button
        onClick={() => setCount(c => ({ ...c, count1: c.count1 + 1 }))}> + </button>
      <div>{count1}</div>
      <div>{count2}</div>
    </div >
  );
}


const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);
  return [
    values,
    e => setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  ];
};
export const UseStateApp3 = () => {
  const [values, handleChange] = useForm({ email: "", password: "" });
  return (
    <>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
    </>
  );
};
