import React from 'react';
import ReactDOM from 'react-dom';
// import { UseStateApp1, UseStateApp2, UseStateApp3 } from "./UseStateApp";
// import { UseEffectApp1, UseEffectApp2, UseEffectApp3 } from "./UseEffectApp";
// import { UseRefApp1, UseRefApp2, UseRefApp3 } from "./UseRefApp";
// import { UseLayoutEffectApp1, UseLayoutEffectApp2 } from "./UseLayoutEffectApp";
import { UseMemoApp1 } from "./UseMemoApp";
// import { UseCallbackApp1, UseCallbackApp2 } from "./UseCallbackApp";
// import { UseReducerApp1, UseReducerApp2 } from "./UseReducerApp";
// import { UseContextApp1 } from "./UseContextApp";

ReactDOM.render(
  <div className="App">
    <UseMemoApp1 />
  </div>,
  document.getElementById('root')
);
