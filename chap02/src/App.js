import React from 'react';
import './App.css';

function App(){
  const name='리액트';
  return (
  	<>
    {/* 주석은 이렇게 작성한다*/}
    	<div className="react" //시작 태그를 여러줄로 작성하게 된다면 여기에 주석을 작성할 수 있다.
         
      >{name}</div>
    	<input/>
      //하지만 이런 주석이나
      /* 이런 주석은 페이지에 그대로 나온다 */
    </>
  )
}
export default App;