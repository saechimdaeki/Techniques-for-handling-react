# 3장 컴포넌트

## 클래스형 컴포넌트

2장에서 보았던 App 컴포넌트는 함수형 컴포넌트며 코드는 다음과 같은 구조로 이루어져 있었다.

```react
import React from 'react';
import './App.css';

function App() {
  const name='리액트';
  return <div className="react">{name}</div>
}

export default App;
```



컴포넌트를 선언하는 방식은 두가지다 하나는 `함수형 컴포넌트` 또다른 하나는 `클래스형 컴포넌트`

클래스형 컴포넌트도 살펴보자

```react
import React, {Component} from 'react';

class App extends Component{
  render(){
    const name='react';
    return <div className="raact">{name}</div>
  }
}

export default App;
```

클래스형 컴포넌트와 함수형 컴포넌트의 차이점은 클래스형 컴포넌트의 경우 이후 배울 `state 기능 및 라이프사이클 기능을 사용. 임의메소드를 정의 ` 할 수 있다는 것이다.

클래스형 컴포넌트에서는 `render` 함수가 꼭 있어야 하고 그안에서 보여주어야 할 JSX를 반환해야 한다.

```markdown
## 함수형 컴포넌트의 장단점
`장점`
- 우선 클래스형 컴포넌트보다 선언하기 훨씬 편하다
- 메모리 자원도 클래스형 컴포넌트보다 덜 사용한다
- 또한, 프로젝트를 완성하여 빌드한 후 배포할때도 함수형 컴포넌트를 사용하는 것이 결과물의 파일 크기가 더 적다
`단점`
- state와 라이프사이클 API의 사용이 불가능하다. (이단점은 리액트 v16.8 업데이트 이후 `Hooks`라는 기능이 도입되어 해결)
```



## 첫 컴포넌트 생성

함수형 컴포넌트로 다음과 같이 작성해보자.

```react
import React from 'react';

const MyComponent = () =>{
    return <div>나의 새롭고 멋진 컴포넌트</div>;
}

export default MyComponent;
```

이전에 보았던 `function` 키워드를 사용하는 대신 `() => {}` 를 사용해 함수를 만들었다. 이는 ES6에 도입된 화살표 함수 문법이다.

`모듈 내보내기(export)`

위에서 작성한 컴포넌트에서 맨 아래 코드를 확인해보자.

<code>export default MyComponent;</code>

이코드는 다른 파일에서 이 파일을 import할 때, 위에서 선언한 MyComponent 클래스를 불러오도록 설정한다.

`모듈 불러오기`

```react
import React from 'react';
import MyComponent from './MyComponent';

const App= () =>{
  return <MyComponent/>;
};

export default App;
```

## props

`props` 는 properties를 줄인 표현으로 컴포넌트 속성을 설정할 때 사용하는 요소다. `props` 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정할 수 있다.

### JSX 내부에서 props 렌더링

먼저 MyComponent 컴포넌트를 수정하여 해당 컴포넌트에서 `name`  이라는 `props` 를 렌더링하도록 설정해보자.

```react
import React from 'react';

const MyComponent = props => {
    return <div>안녕하세요, 제 이름은 {props.name}입니다.</div>;
}

export default MyComponent;
```



### 컴포넌트를 사용할 때 props값 지정하기

App 컴포넌트에서 MyComponent의 props값을 지정해보자.

```react
import React from 'react';
import MyComponent from './MyComponent';

const App= () =>{
  return <MyComponent name="React"/>;
};

export default App;
```



### props 기본값 설정: defaultProps

방금 설정한 name값을 지워보자. 

```react
(...)
 	return <MyComponent />;
(...) 
```

지금처럼 props 값을 따로 지정하지 않았을 때 보여 줄 기본값을 설정하는 `defaultProps` 에 대해 알아보자. 이값을 설정하는 방법은 다음과 같다.

```react
import React from 'react';

const MyComponent = props => {
    return <div>안녕하세요, 제 이름은 {props.name}입니다.</div>;
}
MyComponent.defaultProps={
    name: '기본 이름'
};
export default MyComponent;
```

### 태그 사이의 내용을 보여주는 childeren

리액트 컴포넌트를 사용할 때 컴포넌트 태그 사이의 내용을 보여주는 `props` 가 있는데 바로 `childeren` 이다.

```react
import React from 'react';
import MyComponent from './MyComponent';

const App= () =>{
  return <MyComponent>리액트</MyComponent>
};

export default App;
```

위 코드에서 MyComponent 태그 사이에 작성한 리액트라는 문자열을 MyComponent 내부에서 보여주려면 `props.children` 값을 보여주어야한다.

```react
import React from 'react';

const MyComponent = props => {
    return (
    <div>
        안녕하세요, 제 이름은 {props.name}입니다. <br/>
        children 값은 {props.children}
        입니다.
    </div>);
}
MyComponent.defaultProps={
    name: '기본 이름'
};
export default MyComponent;
```

![image](https://user-images.githubusercontent.com/40031858/125371730-59824b00-e3bc-11eb-90f5-244489c38839.png)

브라우저에 이와 같은 결과물이 나타난다.

### 비구조화 할당 문법을 통해 props 내부 값 추출하기

현재 MyComponent에서 `props` 값을 조회할 때마다 props.name, props, children과 같이 props. 이라는 키워드를 앞에 붙여 주고 있습니다.

이러한 작업을 더 편하게 하기 위해 ES6의 비구조화 할당 문법을 사용해 내부 값을 바로 추출하는 방법을 알아보자.

```react
import React from 'react';

const MyComponent = props => {
    const {name, children} = props;
    return (
    <div>
        안녕하세요, 제 이름은 {name}입니다. <br/>
        children 값은 {children}
        입니다.
    </div>);
}
MyComponent.defaultProps={
    name: '기본 이름'
};
export default MyComponent;
```

이렇게 코드를 작성하면 name과 children 값을 더 짧은 코드로 사용할수 있다.

방금 사용한, 객체에서 값을 추출하는 문법을 `비구조화 할당` 이라고 부른다. 이 문법은 구조 분해 문법이라고도 불리며, 함수의 파라미터 부분에서도 사용할 수 있다.

```react
import React from 'react';

const MyComponent = ({name,children}) => {
    return (
    <div>
        안녕하세요, 제 이름은 {name}입니다. <br/>
        children 값은 {children}
        입니다.
    </div>);
}
MyComponent.defaultProps={
    name: '기본 이름'
};
export default MyComponent;
```

이렇게 props를 사용할 때 파라미터 부분에서 비구조화 할당문법을 사용하면 더욱 편하다.

### propTypes를 통한 props 검증

컴포넌트의 필수 props를 지정하거나 props의 타입을 지정할 때는 propTypes를 사용한다. 컴포넌트의 propTypes를 지정하는 방법은 defaultProp을

설정하는 것과 비슷하다. 우선 propTypes를 사용하려면 코드 상단에 import 구문을 불러와야한다.

```react
import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({name,children}) => {
    return (
    <div>
        안녕하세요, 제 이름은 {name}입니다. <br/>
        children 값은 {children}
        입니다.
    </div>);
}
MyComponent.defaultProps={
    name: '기본 이름'
};

MyComponent.protoTypes={
    name:PropTypes.string
};
export default MyComponent;
```

이처럼 설정해주면 `name` 값은 무조건 문자열 형태로 전달해야 된다는 것을 의미한다. 

#### isRequired를 사용하여 필수 propTypes 설정

propTypes를 지정하지 않았을 때 경고 메시지를 띄워 주는 작업을 해보자. propTypes를 지정할 때 뒤에 `isRequired` 를 붙여주면 된다.

```react
import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({name,favoriteNumber, children}) => {
    return (
    <div>
        안녕하세요, 제 이름은 {name}입니다. <br/>
        children 값은 {children}
        입니다.
        <br/>
        제가 좋아하는 숫자는 {favoriteNumber} 입니다.
    </div>
    );
}
MyComponent.defaultProps={
    name: '기본 이름'
};

MyComponent.protoTypes={
    name:PropTypes.string,
    favoriteNumber:PropTypes.number.isRequired
};

export default MyComponent;
```

```react
import React from 'react';
import MyComponent from './MyComponent';

const App= () =>{
  return (
  <MyComponent name="React" favoriteNumber={1}>리액트</MyComponent>
  );
};

export default App;
```

#### 더 많은 PropTypes 종류

`PropTypes` 에서는 여러 가지 종류를 설정할 수 있습니다. 어떤것이 있는지 보자

- `array `: 배열

- `arrayOf(다른 PropType)` : 특정 PropType으로 이루어진 배열을 의미. 예를들어 arrayOf(PropTypes.number) 는 숫자로 이루어진 배열

- `bool`: true 혹은 false 값

- `Func`: 함수

- `number` : 숫자

- `object`: 객체

- `string`: 문자열

- `symbol`: ES6의 Symbol

- `node`: 렌더링할 수 있는 모든 것

- `instanceOf(클래스)` : 특정 클래스의 인스턴스(예: InstanceOf(MyClass))

- `oneOf(['dog','cat'])` : 주어진 배열 요소 중 값 하나

- `oneOfType([React.PropTypes.string, PropTypes.number])` : 주어진 배열 안의 종류 중 하나

- `Objector(React.PropTypes.number)`: 객체의 모든 키 값이 인자로 주어진 PropType인 객체

- `shape({name: PropTypes.string, num:PropTypes.number })` : 주어진 스키마를 가진 객체

- `any`: 아무 종류

  

  ---

  

  ## 클래스형 컴포넌트에서 props 사용하기

  

  클래스형 컴포넌트에서 props를 사용할때는 render 함수에서 this.props를 조회함녀된다. 그리고 `defaultProps` 와 `propTypes` 는 똑같은 방식으로 설정할 수 있다.

  

  이제 껏 작성했던 MyComponent를 클래스형 컴포넌트로 반환해보자

  ```react
  import React, {Component} from 'react';
  import PropTypes from 'prop-types';
  
  class MyComponent extends Component{
      render(){
          const {name, favoriteNumber, childeren} = this.props;
          return (
              <div>
                  안녕하세요, 제 이름은 {name} dlqslek. <br/>
                  childeren 값은 {childeren} 
                  입니다.
                  <br/>
                  제가 좋아하는 숫자는 {favoriteNumber} 입니다.
              </div>
          );
      }
  }
  
  MyComponent.defaultProps={
      name: '기본 이름'
  };
  
  MyComponent.propTypes={
      name: PropTypes.string,
      favoriteNumber: PropTypes.number.isRequired
  };
  
  export default MyComponent;
  ```

  

  ## state

  리액트에서 `state` 는 컴포넌트 내부에서 바뀔 수 있는 값을 의미한다. `props` 는 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값이며,

  컴포넌트 자신은 `props` 를 읽기 전용으로만 사용할 수 있다. `props` 를 바꾸려면 부모 컴포넌트에서 바꾸어 주어야한다. 예를들어 현재 상황에서

  App컴포넌트에서 MyComponent를 사용할 때 `props` 를 바꾸어 주어야 값이 변경 될 수 있다. 반면 `MyComponent` 에서는 전달받은 `name` 을 직접바꿀수없다.

  리액트에서는 두가지 종류의 `state` 가 있다. 하나는 클래스형 컴포넌트가 가지고 있는 `state` 이고 다른하나는 함수형 컴포넌트에서 `useState` 

  라는 함수를 통해 사용하는 `state` 다.

  ### 클래스형 컴포넌트의 state

  새로운 컴포넌트를 다음과 같이 만들어보자

  ```react
  import React, { Component } from 'react';
  
  class Counter extends Component{
      constructor(props){
          super(props);
          //state의 초깃값 설정하기
          this.state={
              number:0
          };
      }
  
      render(){
          const {number} = this.state;
          return (
              <div>
                  <h1>{number}</h1>
                  <button
                      // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정한다.
                      onClick={() => {
                          //this.setState를 사용해 state에 새로운 값을 넣을 수 있다.
                          this.setState({number:number+1});
                      }}
                      >
                          +1
                      </button>
              </div>
          );
      }
  }
  export default Counter;
  ```

  

   컴포넌트에  `state` 를 설정할 때는 다음과 같이 `constructor` 메소드를 작성하여 설정한다

  

  ```javascript
  constructor(props){
          super(props);
          //state의 초깃값 설정하기
          this.state={
              number:0
          };
      }
  ```

  이는 컴포넌트의 생성자 메소드이며 클래스형 컴포넌트에서 `constructor` 를 작성할 때는 반드시 `super(props)` 를 호출해 주어야한다.

  이 함수가 호출되면 현재 클래스형 컴포넌트가 상속받고 있는 리액트의 `Component` 클래스가 지닌 생성자 함수를 호출해준다.

  그 다음에는 `this.state` 값에 초깃값을 설정해 주었다. 컴포넌트의 `state` 는 객체 형식 이어야 한다.

  

이제 `rende` 함수를 보자.

```react
 render(){
        const {number} = this.state;
        return (
            <div>
                <h1>{number}</h1>
                <button
                    // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정한다.
                    onClick={() => {
                        //this.setState를 사용해 state에 새로운 값을 넣을 수 있다.
                        this.setState({number:number+1});
                    }}
                    >
                        +1
                    </button>
            </div>
        );
    }
```

`render`함수에서 현재 `state`를 조회할 때는 `this.state` 를 조회하면 된다. 그리고 `button` 안에 onClick이라는 값을 `props`로 넣었는데 이는

버튼이 클릭될 때 호출시킬 함수를 설정할 수 있게 해준다.

#### state 객체 안에 여러 값이 있을때

```react
import React, { Component } from 'react';

class Counter extends Component{
    constructor(props){
        super(props);
        //state의 초깃값 설정하기
        this.state={
            number:0,
            fixedNumber: 0
        };
    }

    render(){
        const {number, fixedNumber} = this.state;
        return (
            <div>
                <h1>{number}</h1>
                <h2> 바뀌지 않는 값: {fixedNumber}</h2>
                <button
                    // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정한다.
                    onClick={() => {
                        //this.setState를 사용해 state에 새로운 값을 넣을 수 있다.
                        this.setState({number:number+1});
                    }}
                    >
                        +1
                    </button>
            </div>
        );
    }
}
export default Counter;
```

###  state를 constructor에서 꺼내기

앞에서 `state`의 초기값을 지정하기 위해 `constructor`메소드를 선언해주었는데 또 다른 방식으로도 `state`의 초기 값을 지정해줄 수 있다.

```react
import React, { Component } from 'react';

class Counter extends Component{
    state={
        number:0,
        fixedNumber: 0
    };

    render(){
        const {number, fixedNumber} = this.state;
        return (
            <div>
                <h1>{number}</h1>
                <h2> 바뀌지 않는 값: {fixedNumber}</h2>
                <button
                    // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정한다.
                    onClick={() => {
                        //this.setState를 사용해 state에 새로운 값을 넣을 수 있다.
                        this.setState({number:number+1});
                    }}
                    >
                        +1
                    </button>
            </div>
        );
    }
}
export default Counter;
```

이렇게 하면 `constructor` 메소드를 선언하지 않고도 `state` 초깃값을 설정할 수 있다. 

### this.setState에 객체 대신 함수 인자 전달하기

`this.setState`를 사용하여 `state` 값을 업데이트할 때는 상태가 비동기적으로 업데이트 된다. 만약 다음과 같이 onClick에함수내부에 `this.setState`를 두번호출한다면?

```javascript
onClick={
  ()=>{
    this.setState({number: number+1});
    this.setState({number: this.state.number+1});
  }
}
```

코드를 위와 같이 작성하면 `this.setState` 를 두 번 사용하는 것임에도 불구하고 버튼을 클릭할때 숫자가 1씩 더해진다. `this.setState`를 사용한다고

해서 `state` 값이 바로 바뀌지는 않기 때문이다. 이에 대한 해결책은 `this.setState`를 사용할 때 객체 대신 함수를 인자로 넣어주는 것이다.

`this.setState` 의 인자로 함수를 넣어 줄 때는 코드를 다음과 같은 형식으로 작성한다

```javascript
this.setState((prevState,props) =>{
  return{
    //업데이트하고 싶은 내용
  }
})
```

여기서 `prevState`는 기존상태이고 , `props`는 현재 지니고 있는 `props`를 가리킨다. 만약 업데이트하는 과정에서 `props`가 필요하지않다면 생략가능

```react
<button
                    // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정한다.
                    onClick={() => {
                        this.setState(prevState =>{
                            return {
                                number: prevState.number+1
                            };
                        });
                        //위 코드와 아래코드는 완전히 똑같은 기능알 한다.
                        //아래 코드는 함수에서 바로 객체를 반환한다는 의미
                        this.setState(prevState=>({
                            number:prevState.number+1
                        }));
                    }}
                    >
                        +1
                    </button>
```

### this.setState가 끝난 후 특정작업 실행하기

`setState`를 사용하여 값을 업데이트하고 난 다음에 특정작업을 하고 싶을때는 `setState`의 두 번째 파라미터로 `콜백함수`를 등록하여 작업을 처리할수있다.

```react
<button
                    // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정한다.
                    onClick={()=>{
                        this.setState(
                            {
                                number:number+1
                            },
                            ()=>{
                                console.log('방금 setState가 호출되었습니다.');
                                console.log(this.state);
                            }
                        )
                    }}
                    >
                        +1
                    </button>
```

### 함수형 컴포넌트에서 useState 사용하기

리액트 16.8이전 버전에서는 함수형 컴포넌트에서 `state` 를 사용할 수 없었습니다. 하지만 16.8이후부터는 `useState`라는 함수를 사용하여 함수형컴포넌트에서도

`state`를 사용할 수 있게되었습니다만 사용법은 조금다릅니다. 이과정에서 `Hooks` 라는 것을 사용하게되는데 이번 장에서는 `useState`만 배워보고 추후에 공부하자.

### 배열 비구조화 할당

`Hooks` 를 사용하기 전에 배열 비구조화 할당이라는 것을 알아보자. 배열 비구조화 할당은 이전에 배운 객체 비구조화 할당과 비슷하다. 즉, 배열안에 들어있는

값을 쉽게 추출할 수 있도록 해주는 문법.

```javascript
const array = [1,2];
const one = array[0];
const two = array[1];
```

array안에 있는 값을 one과 two에 담아주는 코드인데 위 코드는 배열 비구조화 할당을 사용하면 다음과 같이 표현할 수 있다.

```javascript
const array=[1,2];
const [one, two]= array;
```

### useState 사용하기

배열 비구조화 할당문법을 알고나면 `useState` 사용방법을 쉽게 이해할 수 있다. 새 컴포넌트를 만들어서 useState를 사용해보자. 

```react
import React, {useState} from 'react';

const Say= () => {
    const [message, setMessage] = useState('');
    const onClickEnter = () => setMessage('안녕하세요!');
    const onClickLeave = () => setMessage('안녕히 가세요!');

    return(
        <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClickLeave}>퇴장</button>
            <h1>{message}</h1>
        </div>
    );
};

export default Say;

```

`useState` 함수의 인자에는 상태의 초깃값을 넣어준다. 클래스형 컴포넌트에서의 `state` 초깃값은 객체 형태를 넣어주어야 한다고 했는데 `useState`에서는

반드시 객체가 아니어도 상관없이 값의 형태는 자유이다.



### 한 컴포넌트에서 useState 여러번 사용하기

`useState` 는 한 컴포넌트에서 여러번 사용해도 상관없다. 또 다른 상태를 `useState` 로 한번 관리해본다.

```react
import React, {useState} from 'react';

const Say= () => {
    const [message, setMessage] = useState('');
    const onClickEnter = () => setMessage('안녕하세요!');
    const onClickLeave = () => setMessage('안녕히 가세요!');
    const [color, setColor] = useState('black');

    return(
        <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClickLeave}>퇴장</button>
            <h1 style={{color}}>{message}</h1>
            <button style={{color:'red'}} onClick={()=> setColor('red')}>
                빨간색
            </button>

            <button style={{color:'green'}} onClick={()=>setColor('green')}>
                초록색
            </button>
            
            <button style={{color:'blue'}} onClick={()=>setColor('blue')}>
                파란색
            </button>
        </div>
    );
};

export default Say;

```

## state를 사용할 때 주의 사항

클래스형 컴포넌트든 함수형 컴포넌트든 `state`를 사용할 때는 주의해야할 사항이 있다. `state` 값을 바꿀때는 `setState` 혹은 `useState`를

통해 전달받은 세터함수를 사용해야한다. 예를들어 다음코드는 잘못된 코드다.

```javascript
//클래스형 컴포넌트에서
this.state.number= this.state.number+1;
this.state.array=this.array.push(2);
this.state.object.value=5;

//함수형 컴포넌트에서
const [object, setObject] = userState({a:1, b:1});
object.b=2;
```

그렇다면 배열이나 객첼를 업데이트해야 할 때는 어떻게 해야할까? 이런상황에서는 배열이나 객체 사본을 만들고 그 사본에 값을 업데이트한 후, 그사본의

상태를 `setState` 혹은 세터함수를 통해 업데이트 한다. 사본을 만들어서 업데이트 하는 예시는 다음과 같다

```javascript
//객체 다루기
const object = {a:1, b:2, c:3};
const nextObject= {... object, b:2}; //사본을 만들어서 b값만 덮어 쓰기

//배열 다루기
const array=[
  {id:1,value:true},
  {id:2,value:true},
  {id:3,value:false}
];

let nextArray= array.concat({id:4}); //새 항목 추가
nextArray.filter(item=>item.id !==2); // id가 2인 항목 제거
nextArray.map(item => (item.id===1 ? {...item, value:false } : item)); //id가 1인 항목의 value를 false로 설정
```

객체에 대한 사본을 만들때는 `spread` 연산자라 불리는 `...` 을 사용하여 처리하고, 배열에 대한 사본을 만들 때는 배열의 내장함수들을 활용한다.

---

# 정리

`props` 와 `state` 는 둘 다 컴포넌트에서 사용하거나 렌더링할 데이터를 담고있으므로 비슷해 보일 수 있지만 그역할은 매우 다르다. `props`는 

부모 컴포넌트가 설정하고, `state`는 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값을 업데이트 할 수 있다.

`props`를 사용한다고 해서 값이 무조건 고정적이지는 않다. 부모 컴포넌트의  `state` 를 자식 컴포넌트의 `props`로 전달하고 자식 컴포넌트에서

특정 이벤트가 발생할 때 부모 컴포넌트의 메소드를 호출하면 `props`도 유동적으로 사용할 수 있다.

앞으로 새로운 컴포넌트를 만들때는 `useState`를 사용할 것을 권장한다. 이로써 코드가 더 간결해질 뿐 아니라 리액트 개발팀이

함수형 컴포넌트에서 `Hooks`를 사용하는 것이 주요 컴포넌트 개발방식이라고 공지하였기 때문이다.
