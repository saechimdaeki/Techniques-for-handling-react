# 2장 JSX

## 코드 이해

```react
import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

```

<code>import React, {Component} from 'react' </code>

Node.js의 주요 특징은 코드를 모듈화하여 재사용 할 수 있다는 점입니다. Node.js자체적으로 내장된 모듈도 많고 다른사람이 만든 모듈도 npm으로 쉽게

찾아서 적용할 수 있습니다. 이렇게 설치된 모듈들을 js파일에서 불러와 사용할 수 있는데, 이때 사용하는 코드는 다음과 같다

<code>var fs= require('fs')</code>

fs는 Node.js 내장 모듈 중 파일을 읽고 쓸때 사용하는 모듈이다. 자바스크립트 문법인 `ES6` 에서는 모듈을 불러오는 새로운 키워드가 생겼는데 바로 `import`다.

import 키워드를 사용해 모듈을 불러오는 방법은 다음과 같다 <code>import fs from 'fs'</code>

즉, 코드의 첫 줄을 이전 자바스크립트 문법으로 작성한다면 다음과 같습니다

```javascript
var React = require('react');
var Component = React.Component;
```

이렇게 파일을 모듈화해서 사용하는 것은 Node.js의 기능이다. 웹브라우저에서 사용하는 자바스크립트는 Node.js 런타임으로 실행하는 것이 아니기때문에

자체적으로 이 기능을 지원하지않아 html파일안에서 `script`태그를 사용해 여러파일을 불러오곤 합니다. 하지만 이런특징을 웹브라우저에서도 비슷하게

사용할 수 있는 방법이 있는데 바로 `번들링(bundling)` 도구를 이용하는것이다.  번들링 도구는 Browserify, RequireJS, webPack등이 대표적이며 

리액트 프로젝트에서는 주로 webpack을 사용하는 추세다. 이런 번들링 도굴르 사용하면 require(또는 import)로 모듈을 불러왔을때 번들링되면서 파일하나로 합쳐준다

현재 프로젝트에서는 src/index.js를 시작으로 필요한 파일을 불러온후 파일하나로 합쳐주는 것이다

```react
import logo from './log.svg';
import './App.css';
```

SVG와 CSS파일도 webpack으로 불러올 수 있습니다. 이렇게 파일을 불러오는 것은 webpack의 로더가 담당하며 로더 종류는 여러가지가 있다.

css-loader는 CSS파일을 불러올 수 있고, file-loader는 웹 폰트나 미디어 파일등을 불러올 수 있고 babel-loader는 js파일들을 불러오면서 ES6로 작성된 코드를 ES5문법으로 변환한다.

로더는 원래 직접설치하고 설정해야하지만 `create-react-app` 이 귀찮은 작업들을 대신해준다.

<code>class App extends Component{</code>

이코드는 App이라는 클래스를 선언합니다. 이클래스는 리액트 라이브러리 내부에 있는 Component클래스를 상속한다. 새로운 컴포넌트를 만들때는 이렇게 클래스를 선언.

```javascript
ES6의 클래스문법

ES6전에는 자바스크립트에 클래스가 없었다. 개념 자체는 있었지만 이를 구현하려면 class 대신에 prototype이라는 문법을 사용해 다음과 같이 작업했어야 했다.

function Dog(name){
  this.name=name;
}

Dog.prototype.say=function(){
  console.log(this.name + ': 멍멍');
}
var dog=new Dog('검둥이');
dog.say(); //검둥이 :멍멍

ES6문법부터는 이것과 기능이 똑같은 코드를 class를 사용해 다음과 같이 작성할 수 있다.
class Dog{
  constructor(name){
    this.name=name;
  }
  say(){
    console.log(this.name + ': 멍멍');
  }
}
const dog=new Dog('흰둥이');
dog.say(); //흰둥이 : 멍멍

```



## JSX란?

`JSX` 는 자바스크립트의 확장 문법이며 XML과 매우 비슷하게 생겼으며 이런형식으로 작성한 코드는 브라우저에서 실행되기 전에 코드가 번들링되는

과정에서 바벨을 사용하여 일반 자바스크립트 형태의 코드로 변환된다.

```jsx
function App(){
  return(
  <div>
  	Hello <b>react</b>  
  </div>
  );
}
```

이렇게 작성된 코드는 다음과 같이 변환됩니다.

```javascript
function App(){
  return React.createElement("div",null,"Hello ",Reqct.createElement("b",null,"react"));
}
```

만약 컴포넌트를 렌더링 할때마다 JSX코드를 작성하는게 아닌 위코드처럼 매번 `React.createElement`  함수를 사용한다면 불편할것이다.

`JSX` 를 사용하면 매우 편하게 UI를 렌더링할 수 있다.

## JSX의 장점

### 1. 보기 쉽고 익숙하다

### 2. 더욱 높은 활용도

JSX에서는 우리가 알고 있는 `div` 나 `span` 같은 HTML태그를 사용할 수 있을 뿐 아니라 앞으로 만들 컴포넌트도 `JSX` 안에서 작성할 수 있다.

App.js에서 App 컴포넌트가 만들어졌는데 src/index.js 파일을 열어보면 이 App컴포넌트를 마치 HTML태그 쓰듯이 그냥 작성한다

```react
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
  	<App />
  </React.StrictMode>
  document.getElementById('root')
);
```

```markdown
## ReactDOM.render는 무엇인가?

이 코드는 컴포넌트를 페이지에 렌더링하는 역할을 하며, react-dom 모듈을 불러와 사용할 수 있다. 이 함수의 첫번째 파라미터에는 페이지에 렌더링
할 내용을 JSX형태로 작성하고, 두번째 파라미터에는 해당 JSX를 렌더링할 document 내부 요소를 설정한다.
여기서는 id가 root인 요소 안에 렌더링을 하도록 설정했는데 이 요소는 public/index.html 파일을 열어보면 있다.
```

```markdown
## React.StrictMode는 무엇인가?

`React.StrictMode`는 리액트 프로젝트에서 리액트의 레거시 기능들을 사용하지 못하게 하는 기능이다. 
이를 사용하면 문자열 ref, componentWillMoundt 등 나중에는 완전히 사라지게 될 옛날 기능을 사용했을때 경고를 출력한다.
```

---



## JSX 문법

### `JSX`는 정말 편리한 문법이지만 올바르게 사용하려면 몇가지 규칙을 준수해야 한다.

###  1. 감싸인 요소

컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야한다. App컴포넌트 함수 내부를 지우고 다음과 같이 해보자

```react
// src/App.js

import React from 'react';

function App(){
  return (
  	<h1>리액트 안녕!</h1>
    <h2>잘 동작하니?</h2>
  )
}
```

이런 형태의 코드는 제대로 동작하지 않으며 요소 여러개가 부모 요소 하나에 의하여 감싸져 있지 않기때문에 오류가 발생한것이다.

이 오류는 다음과 같이 코드를 작성해 해결할 수 있다.

```react
// src/App.js

import React from 'react';
function App(){
  return (
  	<h1>리액트 안녕!</h1>
    <h2>잘 동작하니?</h2>
  );
}

export default App;
```



리액트 컴포넌트에서 요소 여러 개를 왜 하나의 요소로 꼭 감싸주어야 할까? 그것은 `Virtual DOM` 에서 컴포넌트 변화를 감지해 낼 때 효율적으로

비교할 수 있도록 컴포넌트 내부는 하나의 DOM트리 구조로 이루어져야 한다는 규칙이 있기 때문이다 . 그런데 여기서 꼭 div요소를 사용하고 싶지

않을 수도 있다. 그런경우 리액트 v16 이상 부터 도입된 `Fragment` 라는 기능을 사용하면 된다.

```react
// src/App.js

import React, {Fragment} from 'react';

function App(){
  return (
  	<Fragment>
    	<h1>리액트 안녕!</h1>
    	<h2>잘 동작하니?</h2>
    </Fragment>
  );
}

export default App;
```



### 2. 자바스크립트 표현

`JSX` 가 단순히 DOM 요소를 렌더링하는 기능밖에 없었다면 아쉬웠을겁니다. `JSX` 안에서는 자바스크립트 표현식을 쓸 수 있다. 자바스크립트 표현식을

작성하려면 `JSX` 내부에서 코드를 { } 로 감싸면 된다. 자바스크립트 값을 `JSX` 안에서 한번 렌더링해보자.

```react
// src/App.js

import React from 'react';

function App(){
  const name= '리액트';
  return (
  	<>
    	<h1>{name} 안녕!</h1>
    	<h2>잘 동작하니?</h2>
    </>
  );
}
```



### 3. If문 대신 조건부 연산자

`JSX` 내부의 자바스크립트 표현식에서 `if` 문을 사용할 수는 없다. 하지만 조건에 따라 다른 내용을 렌더링해야 할 때는 `JSX` 밖에서 `if` 문을 사용해 사전에

값을 설정하거나, { } 안에 조건부 연산자를 사용하면 된다. 조건부 연산자의 또 다른 이름은 삼항연산자이고 예시는 다음과 같다.

```react
// src/App.js

import React from 'react';

function App(){
  const name= '리액트';
  return(
  	<div>
    	{name === '리액트' ? (
      	<h1>리액트입니다.</h1>
      ) : (
      	<h2>리액트가 아닙니다 </h2>
      )}
    </div>
  );
}
```



### 4. AND 연산자(&&)를 사용한 조건부 렌더링

개발하다 보면 특정 조건을 만족할 때 내용을 보여주고 만족하지 않을때 아예 아무것도 렌더링 하지 않아야 하는 상황이 올 수 있다. 이럴때에도 조건부

연산자를 통해 구현할 수는 있다.

```react
// src/App.js

import React from 'react';

function App(){
  const name='뤼왝트';
  return <div>{name === '리액트' ? <h1>리액트입니다.</h1> : null}</div>
}

export default App;
```

위 코드처럼 null을 렌더링하면 아무것도 보여주지 않는다. 하지만 이것보다 더 짧은코드로 &&연산자를 사용해 조건부 렌더링할 수 있다.

```react
// src/App.js

import React from 'react';

function App(){
  const name= '뤼왝트';
  return <div>{name === '래액트' && <h1>리액트입니다.</h1>}</div>;
}
export default App;
```

이렇게 코들르 작성하고 나면 브라우저에 아무것도 나타나지 않을것이다. &&연산자로 조건부 렌더링을 할 수 있는 이유는 리액트에서 `false` 를 렌더링

할 때는 null과 마찬가지로 아무것도 나타나지 않기 때문이다. 여기서 주의해야할 점은 falsy한 값인 0은 예외적으로 화면에 나타난다는 것이다.



```react
const number=0;
return number && <div>내용</div>
  
이런 코드는 화면에 숫자 0을 보여준다  
```



### 5. undefined를 렌더링하지 않기

리액트 컴포넌트에서는 함수에서 `undefined` 만 반환하여 렌더링하는 상황을 만들면 안된다. 예를들어 다음과 같은 코드는 오류를 발생시킨다

```react
// src/App.js

import React from 'react';
import './App.css';

function App(){
  const name=undefined;
  return name;
}
export default App;
```

어떤 값이 `undefined` 일 수도 있다면 `OR(||)` 연산자를 사용하면 해당 값이 `undefined` 일 때 사용 할 값을 지정할 수 있으므로 간단하게 오류를 방지할 수 있다.

```react
import React from 'react';
import './App.css';

function App(){
  const name=undefined;
  return name || '값이 undefined입니다.';
}

export default App;

//반면 JSX 내부에서 undefined를 렌더링하는 것은 괜찮다. 

import React from 'react';
import './App.css';

function App(){
  const name=undefined;
  return <div>{name}</div>
}

export default App;
```

name값이 undefined일 때 보여주고 싶은 문구가 있다면 다음과 같이 코드를 작성하면 된다

```react
import React from 'react';
import './App.css';

function App(){
  const name=undefined;
  return <div>{name || '리액트'}</div>
}

export default App;
```

### 6. 인라인 스타일링

리액트에서 DOM 요소에 스타일을 적용할 때는 문자열 형태로 넣는 것이 아니라 객체 향태로 넣어 주어야 한다. 스타일 이름 중에서 background-color 처럼 - 문자가 포함되는

이름이 있는데 이러한 이름은 - 문자를 없애고 `카멜표기법(camelCase)` 로 작성해야한다.

```react
// src/App.js
import React from 'react';

function App() {
  const name = '리액트';
    const style={
      //background-color는 backgroundColor와 같이 -가 사라지고 카멜표기법으로 작성
      backgroundColor: 'black',
      color: 'aqua',
      fontSize: '48px',
      fontWeight: 'bold',
      padding: 116
    };
    return <div style={style}>{name}</div>

}

export default App;

```

미리 선언하지 않고 바로 style 값을 지정하고 싶다면 다음과 같이 작성하면된다. 

```react
import React from 'react';

function App() {
  const name = '리액트';
    return (
      <div
      style={{
        backgroundColor: 'black',
        color: 'aqua',
        fontSize: '48px',
        fontWeight: 'bold',
        padding: 116
      }}
      >
        {name}
      </div>
    )

}

export default App;

```

### 7. Class 대신 className

기존의 App.css를 열어서 다지운후 다음과 같이 작성해보자

```css
.react{
  background:aqua;
  color: black;
  font-size: 48px;
  font-weight: bold;
  padding: 16px;
}
```

그리고 App.js파일에서 App.css를 불러온후 div요소에 className값을 지정하자.

```react
import React from 'react';
import './App.css';
function App() {
  const name = '리액트';
  return <div className="react">{name}</div> 
}

export default App;

```

### 8 . 꼭 닫아야 하는 태그

HTML 코드를 작성할 때 가끔 태그를 닫지 않은 상태로 코드를 작성하기도한다. 예를들어 input HTML요소는 < input> </ input>이라 안하고 < input>만 입력해도 작동한다

예를들어 HTML에서 다음코드는 문제없이 작동한다

```html
<form>
  성: <br>
  <input><br>
  이름: <br>
  <input>
</form>
```

JSX에서는 위 코드처럼 태그를 닫지않으면 오류가 발생한다 이를 테스트해보자

```react
import React from 'react';
import './App.css';

function App(){
  const name='리액트';
  return (
  	<>
    	<div className="react">{name}</div>
    	<input>
    </>
  )
}
export default App;
```

이처럼 코드를 저장하면 개발서버가 실행중인 터미널에서 다음과 같은 오류가 나타날것이다. 

<code>Failed to compile</code>

이 오류를 해결하려면 다음과 같이 input태그를 닫아주어야한다

```react
import React from 'react';
import './App.css';

function App(){
  const name='리액트';
  return (
  	<>
    	<div className="react">{name}</div>
    	<input></input>
    </>
  )
}
export default App;
```

태그 사이에 별도의 내용이 들어가지 않는경우는 다음과 같이 작성할 수도 있다. 이러한 태그를 `self-closing`  태그라고 부른다. 태그를 서언하면서 동시에 닫을 수 있는태그

```react
import React from 'react';
import './App.css';

function App(){
  const name='리액트';
  return (
  	<>
    	<div className="react">{name}</div>
    	<input/>
    </>
  )
}
export default App;
```

### 9. 주석

JSX안에서 주석을 작성하는 방법은 일반 자바스크립트에서 주석을 작성할 때와 조금 다르다 

```react
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
```

