# 5장 ref: DOM에 이름 달기

일반 HTML에서 DOM요소에 이름을 달 때는 `id`를 사용한다

```html
<div id="my-element"></div>
```

특정 DOM 요소에 어떤 작업을 해야 할 때 이렇게 요소에 `id` 를 달면 CSS에서 특정 `id` 에 특정 스타일을 적용하거나 자바스크립트에서 해당 `id` 를 가진 요소를 찾아서 

작업할 수 있다. 지금 현재 리액트 프로젝트에 사용하는 public/index.html 파일에도 `id` 가 root인 div 요소가 있다

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

```

그리고 src/index.js 파일 중에는 `id` 가 root인 요소에 리액트 컴포넌트를 렌더링하라는 코드가 있다.

```react
(...)
ReactDOM.render(<App/> , document.getElementById('root')); 
```

이렇게 HTMLdp  id를 사용하여 DOM에 이름을 다는 것처럼 리액트 프로젝트 내부에서 DOM에 이름을 다는 방법이 있다. 바로 `ref(reference)` 개념이다.

## ref는 어떤 상황에서 사용해야 할까?

먼저 `ref` 는 어떤 상황에 사용해야 하는지 제대로 짚고 넘어가보자. 일단 특정 `DOM` 에 작업을 해야 할 때 `ref`  를 사용해야한다. 하지만 대체 '어떤' 작업을 할때 `ref` 를 사용해야 할까?

정답은 `DOM을 꼭 직접적으로 건드려야 할 때` 이다. 예를 들어 일반 순수 자바스크립트 및 jQuery로 만든 웹사이트에서 input을 검증할때는 다음과 같이특정 id를 가진 input클래스를 설정해준다



```html
<html>
<head>
	<meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Example</title>
  <style>
    .success{
      background-color: green;
    }
    .failure{
      background-color: red;
    }
  </style>
  <script>
  	function validate(){
      var input=document.getElementById('password');
      input.className='';
      if(input.value === '0000'){
        input.className = 'success';
      }else{
        input.className= 'failure';
      }
    }
  </script>
</head>  
  <body>
    <input type="password" id="password"></input>
  	<button oncolick="validate()">Validate</button>
  </body>
</html>
```

하지만 리액트에서는 이런 작업은 굳이 `DOM` 에 접근하지 않아도 `state` 로 구현할 수 있다. 이제 이를 예시로 살펴보자. 이번장에서는 클래스형 컴포넌트에서 `ref` 를알아보고

후에 함수형컴포넌트는 `Hooks` 를 사용하며 알아보자

---

src디렉토리 안에 다음과 같은 파일을 만들자

```css
.success{
    background-color: lightgreen;
}

.failure{
    background-color: lightcoral;
}
```

```react
import React, {Component} from 'react';
import './ValidationSample.css';

class ValidationSample extends Component{
    state={
        password:'',
        clicked:false,
        validated:false
    }

    handleChange = (e) =>{
        this.setState({
            password: e.target.value
        });
    }

    handleButtonClick = () => {
        this.setState({
            clicked: true,
            validated: this.setState.password === '0000'
        })
    }

    render(){
        return(
            <div>
                <input
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className={this.state.clicked ? (this.state.validated ? 'success' : 'failure'):''}
                />
                <button onClick={this.handleButtonClick}>검증하기</button>
            </div>
        )
    }
}
export default ValidationSample;
```

`input` 에는 `onChange` 이벤트가 발생하면 `handleChange` 를 호출하여 `state` 의 password 값을 업데이트하게 했다. `button` 에서는 `onClick` 이벤트가 

발생하면 `handleButtonClick` 을 호출하여 `clicked` 값을 참으로 설정했고, validated 값을 검증 결과로 설정했다.

`input` 의 `className` 값은 버튼을 누르기 전에는 비어 있는 문자열을 전달하며, 버튼을 누른 후에는 검증 결과에 따라 success값 또는 failure값을 설정한다.

그리고 이 값에 따라 input 색상이 초록색 또는 빨간색으로 나타난다.

위의 예제에서는 `state` 를 사용하여 우리에게 필요한 기능을 구현했지만, 가끔 `state` 만으로 해결할 수 없는 기능이 있다. 어떤상황인지 예시를보자

- 특정 input에 포커스 주기
- 스크롤 박스 조작하기
- Canvas 요소에 그림 그리기 등

이때는 어쩔 수 없이 `DOM` 에 직접적으로 접근해야 하는데, 이를 위해 바로 `ref` 를 사용한다.



## ref 사용

이제 프로젝트에서 `ref` 를 사용해보자. `ref` 를 사용하는 방법은 두 가지이다.

### 콜백 함수를 통한  ref 설정

`ref` 를 만드는 가장 기본적인 방법은 콜백 함수를 사용하는 것이다. `ref` 를 달고자 하는 요소에 `ref` 라는 콜백 함수를 `props` 로 전달해 주면 된다.

이 콜백 함수는 `ref` 값을, 파라미터로 전달받습니다. 그리고 함수 내부에서 파라미터로 받은 `ref` 를 컴포넌트의 멤버변수로 설정해준다.

```html
<input ref={(ref)=>{this.input=ref}}/>
```

이렇게 하면 앞으로 `this.input` 은 `input` 요소의 `DOM` 을 가리킨다. `ref` 의 이름은 원하는 것으로 자유롭게 지정할 수 있다. 

`DOM` 타입과 관계없이 `this.superman = ref` 처럼 마음대로 지정한다.

### createRef를 통한 ref 설정

`ref` 를 만드는 또 다른 방법은 리액트에 내장되어 있는 `createRef` 라는 함수를 사용하는 것이다. 이 함수를 사용해 만들면 더 적은 코드로 쉽게 사용할 수 있다.

이 기능은 리액트 v16.3부터 도입되었으며 이전 버전에서는 작동하지 않는다. 예시를 보자.

```react
import React, {Component} from 'react';

class RefSample extends Component{
    input = React.createRef();

    handleFocus= () =>{
        this.input.current.focus();
    }

    render(){
        return (
            <div>
                <input ref={this.input}/>
            </div>
        );
    }
}

export default RefSample;
```

`createRef` 를 사용하여 `ref` 를 만들려면 우선 컴포넌트 내부에서 멤버 변수로 `React.createRef()` 를 담아 주어야 한다.

그리고 해당 멤버 변수를 `ref` 를 달고자 하는 요소에 `ref props` 로 넣어주면 `ref` 설정이 완료된다.

설정한 뒤 나중에 `ref` 를 설정해 준 `DOM` 에 접근하려면 `this.input.current` 를 조회하면 된다. 콜백 함수를 사용할 때와 다른 점은 이렇게 뒷

부분에  `.current` 를 넣어 주어야 한다는 것이다. 

## 적용



![image](https://user-images.githubusercontent.com/40031858/125729946-41bc3fa3-14a1-47b4-a01a-3dc511df6ada.png) 

현재 버튼을 누르면 포커스가 버튼으로 넘어가면서 왼쪽 input 요소의 텍스트 커서가 더이상 보이지 않는다. 버튼을 한 번 눌렀을때, 포커스가 다시 `input` 쪽으로

자동으로 넘어가도록 코드를 작성해 보자. 

콜백 함수를 사용해 ValidationSample 컴포넌트에도 ref를 달아보자.

```react
 <input
                 ref={(ref) => this.input=ref} 
                 (...)
                />
```

### 버튼 onClick 이벤트 코드 수정

버튼에서 `onClick` 이벤트가 발생할 때 `input` 에 포커슬르 주도록 코드를 수정해 보자. 이제 `this.input` 이 컴포넌트 내부의 `input` 요소를 가리키고 있으니

일반 `DOM` 을 다루듯이 코드를 작성하자.

```react
handleButtonClick = () => {
        this.setState({
            clicked: true,
            validated: this.state.password === '0000'
        });
        this.input.focus();
    };
```

이제 포커스가 `input` 으로 바로 넘어가진다.

## 컴포넌트에 ref 달기

리액트에서는 컴포넌트에도 `ref` 를 달 수 있다. 이 방법은 주로 컴포넌트 내부에 있는 `DOM` 을 컴포넌트 외부에서 사용할 때 쓴다.

컴포넌트에 `ref` 를 다는 방법은 DOM에 `ref` 를 다는 방법과 똑같다

### 사용법

```javascript
<MyComponent
	ref= {(ref) =>{this.myComponent=ref}}
 />
```

이렇게 하면 MyComponent 내부의 메소드 및 멤버 변수에도 접근할 수 있다. 즉, 내부의 `ref` 에도 접근할 수 있다. (예: myComponent,handleClick, myComponent.input 등)

이번에는 스크롤 박스가 있는 컴포넌트를 하나 만들고, 스크롤바를 아래로 내리는 작업을 부모 컴포넌트에서 실행해보자.

```react
import React , {Component} from 'react';

class ScrollBox extends Component{
    render(){
        const style={
            border: '1px solid black',
            height: '300px',
            width: '300px',
            overflow: 'auto',
            position: 'relative'
        };

        const innerStyle={
            width: '100%',
            height: '650px',
            background: 'linear-gradient(white, black)'
        }
        return (
            <div
                style={style}
                ref={(ref) => {this.box=ref}}>
                <div style={innerStyle}/>
            </div>
        );
    }
}
export default ScrollBox;
```



### 컴포넌트에 메소드 생성

컴포넌트에 스크롤바를 맨 아래쪽으로 내리는 메소드를 만들어보자. 자바스크립트로 스크롤바를 내릴 때는 `DOM` 노드가 가진 다음 값들을 사용한다

- `scrollTop` : 세로 스크롤바 위치(0~350)
- `scrollHeight` : 스크롤이 있는 박스안의 div 높이(650)
- `clientHeight` : 스크롤이 있는 박스의 높이 (300)

스크롤바를 맨아래 로 내리려면 `scrollHeight` 에서 `clientHeight` 높이를 빼면 된다.

```react
scrollToBottom= () =>{
        const {scrollHeight, clientHeight} =this.box;
        this.box.scrollTop=scrollHeight-clientHeight;
    }
render(){
  (...)
}
```

이제 이렇게 만든 메소드는 부모 컴포넌트인 App컴포넌트에서 `ScrollBox` 에 `ref` 를 달면 사용할 수 있다.

### 컴포넌트에 ref를 달고 내부 메소드 사용

그럼 App컴포넌트에서 `ScrollBox` 에 `ref` 를 달고 버튼을 만들어 누르면, `ScrollBox` 컴포넌트의 `scrollToBottom` 메소드를 실행하도록 코드를 작성하자

```react
import React, {Component} from 'react';
import ScrollBox from './ScrollBox';

class App extends Component{
  render(){
    return(
        <div>
          <ScrollBox ref={(ref)=>this.scrollBox=ref}/>
          <button onClick={()=>this.scrollBox.scrollToBottom()}>
            맨 밑으로
          </button>
        </div>
    );
  }
}
export default App;
```

여기서 주의할점이 하나 있다. 문법상으로는 `onClick={this.scrollBox.scrollBottom}` 같은 형식으로 작성해도 틀린것은 아니다. 하지만 컴포넌트가 처음 렌더링 될 때는

`this.scrollBox` 값이 `undefined` 이므로 `this.scrollBox.scrollToBottom` 값을 읽어 오는 과정에서 오류가 발생한다. 화살표 함수 문법을 사용하여 아예 새로운 함수를

만들고 그 내부에서 `this.scrollBox.scrollToBottom` 메소드를 실행하면, 버튼을 누를 때 `this.scrollBox.scrollToBottom` 값을 읽어 와서 실행하므로 오류가 발생하지 않는다.

---

# 정리

```markdown
컴포넌트 내부에서 `DOM` 에 직접 접근해야 할 때는 `ref` 를 사용한다. 먼저 `ref`를 사용하지 않고도 원하는 기능을 구현할 수 있는지 반드시 고려후 활용하자.

서로 다른 컴포넌트에서 데이터를 교류할 때 `ref` 를 사용한다면 이는 잘못 사용된 것이다. 물론 할 수 는있다 .컴포넌트에 `ref` 를 달고 그 `ref`를 다른 컴포넌트로 전달
하고 ... 다른 컴포넌트에서 `ref` 로 전달받은 컴포넌트의 메소드를 실행하고 ... 하지만 이방법은 리액트 사상에 어긋난 설계이다.

앱 규모가 커지면 마치 스파게티처럼 구조가 꼬여 유지보수가 불가능하다. 컴포넌트끼리 데이터를 교류할 때는 언제나 `데이터를 부모 <-> 자식 흐름` 으로 교류해야한다.
나중에 `리덕스` 혹은 `Context API`를 사용하여 효율적으로 교류하는 방법을 알아보자. 
```

