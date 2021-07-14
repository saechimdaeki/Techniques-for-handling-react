# 4장 이벤트 핸들링

## 리액트의 이벤트 시스템

리액트의 이벤트 시스템은 웹 브라우저의 HTML 이벤트와 인터페이스가 동일하기 때문에 사용법이 꽤 비슷하지만 주의해야 할 몇가지 사항이 있다.

### 이벤트를 사용할 때 주의 사항

#### 1. 이벤트 이름은 카멜 표기법으로 작성한다

예를들어 HTML의 `onclick` 은 리액트에서 `onClick` 으로 작성해야합니다. 또 `onkeyup` 은 `onKeyUp` 으로 작성

#### 2. 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달한다.

HTML에서 이벤트를 설정할 때는 큰따음표 안에 실행할 코드를 넣었지만, 리액트에서는 함수 형태의 객체를 전달한다. 이전 예제에서 화살표 함수 문법으로 함수를

만들어 전달했는데 이렇게 바로 만들어서 전달해도 되고, 렌더링 부분 외부에 미리 만들어서 전달해도 된다.

#### 3. DOM 요소에만 이벤트를 설정할 수 있다.

즉 `div`,`button`,`ìnput`, `form`, `span`등의 DOM요소에는 이벤트를 설정할 수 있지만, 우리가 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없다.

예를 들어 다음과 같이 MyComponent에 onClick 값을 설정한다면 MyComponent를 클릭할 때 doSomething 함수를 실행하는 것이 아닌 그냥 이름이 

onClick인 props를 MyComponent 에게 전달해 줄 뿐이다.

<code><MyComponent onClick={dosomething}/></code>

따라서 컴포넌트에 자체적으로 이벤트를 설정할 수는 없다. 하지만 전달받은 `props` 를 컴포넌트 내부의 `DOM` 이벤트로 설정할 수는 있다.

```react
<div onClick={this.props.onClick}>
	{/*(...) */}
</div>
```

### 이벤트 종류

리액트에서 지원하는 이벤트 종류는 다음과 같다.

- Clipboard
- Touch
- Composition
- UI
- Keyboard
- Wheel
- Focus
- Media
- Form
- Image
- Mouse
- Animation
- Selection
- Transition

## 예제로 이벤트 핸들링 익히기

### 컴포넌트 생성

먼저 클래스형 컴포넌트로 작성하여 기능을 구현해 보자. 

```react
import React, {Component} from 'react';

class EventPractice extends Component{
    render(){
        return (
            <div>
                <h1>이벤트 연습</h1>
            </div>
        );
    }
}

export default EventPractice;
```

```react
import React from 'react';
import EventPractice from './EventPractice';

const App= () =>{
  return <EventPractice/>;
};

export default App;
```

### onChange 이벤트 핸들링하기

#### onChange 이벤트 설정

EventPractive 컴포넌트에 input요소를 렌더링하는 코드와 해당요소의 onChange 이벤트를 설정하는 코드를 작성한다

```react
import React, {Component} from 'react';

class EventPractice extends Component{
    render(){
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    onChange={
                        (e) => {
                            console.log(e);
                        }
                    }
                    />
            </div>
        );
    }
}

export default EventPractice;
```



이제 코드를 저장하고 웹 브라우저에서 크롬 개발자 도구를 열어 인풋에 아무거나 입력해보면 이벤트 객체가 콘솔에 나타난다.

```javascript
onChange ={
  (e) => {
    console.log(e);
  }
}
```

여기서 콘솔에 기록되는 e 객체는 `SyntheticEvent` 로 웹브라우저의 네이티브 이벤트를 감싸는 객체이다. 네이티브 이벤트와 인터페이스가 같으므로

순수 자바스크립트에서 HTML 이벤트를 다룰 때와 똑같이 사용하면 된다 . `SyntheticEvent` 는 네이티브 이벤트와 달리 이벤트가 끝나고 나면 이벤트가

초기화 되므로 정보를 참조할 수 없다. 예를들어 0.5초 뒤에 e 객체를 참조하면 e 객체 내부의 모든값이 비워지게 된다.

만약 비동기적으로 이벤트를 참조할 일이 있다면 `e.persist()` 함수를 호출해 주어야 한다. 예를들어 onChange 이벤트가 발생할때앞으로 변할 인풋 값인

`e.target.value` 를 콘솔에 기록해보자.

```javascript
onChange={
  (e) => {
    console.log(e.target.value);
  }
}
```

#### state에 Input 값 담기.

```react
import React, {Component} from 'react';

class EventPractice extends Component{
    state={
        message: ''
    }

    render(){
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    value={this.state.message}
                    onChange={
                        (e) => {
                          this.setState({
                              message: e.target.value
                          })
                        }
                      }
                    />
            </div>
        );
    }
}

export default EventPractice;
```



#### 버튼을 누를 때 comment 값을 공백으로 설정

이제 입력한 값이 `state` 에 잘 들어갔는지, 인풋에서 그값을 제대로 반영하는지 한번 검증해보자. input 요소 코드 아래쪽에 `button` 을 하나 만들고,

클릭 이벤트가 발생하면 현재 `comment` 값을 메시지 박스로 띄운 후 `comment` 값을 공백으로 설정해보자.

```react
import React, {Component} from 'react';

class EventPractice extends Component{
    state={
        message: ''
    }

    render(){
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    value={this.state.message}
                    onChange={
                        (e) => {
                          this.setState({
                              message: e.target.value
                          })
                        }
                      }
                    />

                    <button onClick={
                        () => {
                            alert(this.state.message);
                            this.setState({
                                message:''
                            });
                        }
                    }>확인</button>
            </div>
        );
    }
}

export default EventPractice;
```

![image](https://user-images.githubusercontent.com/40031858/125542134-c1e7533d-c367-477e-9c3e-65ceee304fde.png)

## 임의 메소드 만들기

위의 주의사항에서 `"이벤트에 실행할 자바스크립트 코드를 전달하는 것이아니라 함수형태의 값을 전달한다"` 라고 배웠습니다. 그렇기에 이벤트 처리할때 렌더링하는 동시에

함수를 만들어서 전달해 주었다. 이 방법 대신 함수를 미리 준비하여 전달하는 방법도 있다. 성능상으로는 차이가 거의 없지만 가독성은 훨씬 높다.

앞서 `onChange` 와 `onClick` 에 전달한 함수를 따로 빼내서 컴포넌트 임의 메소드를 만들어보자

```react
import React, {Component} from 'react';

class EventPractice extends Component{
    state={
        message: ''
    }
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }
    handleChange(e){
        this.setState({
            message: e.target.value
        });
    }

    handleClick(){
        alert(this.state.message);
        this.setState({
            message: ''
        });
    }


    render(){
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    value={this.state.message}
                    onChange={this.handleChange}
                    />
                    <button onClick={this.handleClick}    
                    >확인</button>
            </div>
        );
    }
}

export default EventPractice;
```

함수가 호출될 때 `this` 는 호출부에 따라 결정되므로, 클래스의 임의 메소드가 특정 HTML 요소의 이벤트로 등록되는 과정에서 메소드와 `this` 의 관계가 끊어져 버린다.

이때문에 임의 메소드가 이벤트로 등록되어도 `this` 를 컴포넌트 자신으로 제대로 가리키기 위해서는 메소드를 `this` 와 `바인딩` 하는 작업이 필요하다.

만약 바인딩 하지 않는 경우라면 `this` 가 `undefined` 를 가리키게 된다. 현재 `constructor` 함수에서 함수를 바인딩하는 작업을 하고있다.

#### Property Initializer Syntax를 사용한 메소드 작성

메소드 바인딩은 생성자 메소드에서 하는 것이 정석이다. 하지만 이작업을 불편하다고 느낄수도 있는데 새 메소드를 만들 때마다 `constructor` 도 수정해야 하기때문이다.

이 작업을 좀더 간단하게 하는 방법이 있다. 바로 바벨의 `transform-class-properties` 문법을 사용하여 화살표 함수 형태로 메소드를 정의하는 것이다. 이를 시행해보자

```react
import React, {Component} from 'react';

class EventPractice extends Component{
    state={
        message: ''
    }

    handleChange= (e)=>{
        this.setState({
            message: e.target.value
        });
    }

    handleClick= ()=>{
        alert(this.state.message);
        this.setState({
            message:''
        });
    }
    render(){
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    value={this.state.message}
                    onChange={this.handleChange}
                    />
                    <button onClick={this.handleClick}    
                    >확인</button>
            </div>
        );
    }
}

export default EventPractice;
```



### input 여러 개 다루기

이제까지 `input` 값을 `state` 에 넣는 방법을 배웠다. 하지만 `input` 이 여러 개일 때는 어떻게 작업할까? 메소드를 여러개 만드나?? 그것도 하나의

해법이긴 하지만 더 쉽게 처리하는 방법이 있다. 바로 `event` 객체를 활용하는 것이다. `e.target.name` 값을 사용하면 된다.  `onChange` 이벤트 핸들러에서

`e.target.name` 은 해당 인풋의 `name` 을 가리킨다. 지금은 message인데 이 값을 사용하여 `state` 를 설정하면 쉽게 해결할 수 있다. 

```react
import React, {Component} from 'react';

class EventPractice extends Component{
    state={
        message: '',
        username:''
    }

    handleChange= (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleClick= ()=>{
        alert(this.state.username+ ' : '+this.state.message);
        this.setState({
            message:'',
            username:''
        })
    }

    render(){
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type="text"
                    name="username"
                    placeholder="사용자명"
                    value={this.state.username}
                    onChange={this.handleChange}
                    />
                <input 
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    value={this.state.message}
                    onChange={this.handleChange}
                    />    
                    <button onClick={this.handleClick}    
                    >확인</button>
            </div>
        );
    }
}

export default EventPractice;
```



위의 코드에서는 이 코드가 핵심이다

```javascript
handleChange = e =>{
  this.setState({
    [e.target.name] : e.target.value
  })
}
```

객체안에서 `key` 를 [ ]로 감싸면 그 안에 넣은 래퍼런스가 가리키는 실제 값이 `key` 값으로 사용된다. 예를들어 다음과 같은 객체를 만들면

```javascript
const name='variantKey';
const object={
  [name]: 'value'
};


-------
  결과는
{
  'variantKey': 'value'
}
```

### onKeyPress 이벤트 핸들링

이번에는 키를 눌렀을때 발생하는 `KeyPress` 이벤트를 처리하는 방법을 알아보자 . `comment` 인풋에서 `Enter` 를 눌렀을때 `handleClick` 메소드를 호출하도록 코드를작성하자 

```react
import React, {Component} from 'react';

class EventPractice extends Component{
    state={
        message: '',
        username:''
    }

    handleChange= (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleClick= ()=>{
        alert(this.state.username+ ' : '+this.state.message);
        this.setState({
            message:'',
            username:''
        })
    }

    handleKeyPress= (e)=>{
        if(e.key==='Enter'){
            this.handleClick();
        }
    }


    render(){
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type="text"
                    name="username"
                    placeholder="사용자명"
                    value={this.state.username}
                    onChange={this.handleChange}
                    />
                <input 
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    value={this.state.message}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    />    
                    <button onClick={this.handleClick}    
                    >확인</button>
            </div>
        );
    }
}

export default EventPractice;
```

## 함수형 컴포넌트로 구현해 보기

기존 EventPractice 컴포넌트를 모두 지우고 다음과 같이 작성해 보자.

```react
import React, {useState} from 'react';

const EventPractice= ()=>{
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const onChangeUsername= e =>setUsername(e.target.value);
    const onChangeMessage= e=> setMessage(e.target.value);

    const onClick= ()=>{
        alert(username+': '+message);
        setUsername('');
        setMessage('');
    };
    const onKeyPress = e=>{
        if(e.key==='Enter'){
            onClick();
        }
    };

    return(
        <div>
            <h1>이벤트 연습</h1>
            <input
                type="text"
                name="username"
                placeholder="사용자명"
                value={username}
                onChange={onChangeUsername}
            />
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={message}
                onChange={onChangeMessage}
                onKeyPress={onKeyPress}
            />
            <button onClick={onClick}>확인</button>
        </div>
    )
}
export default EventPractice;
```

위 코드에서는 `e.target.name`을 활용하지 않고 `onChange` 관련 함수 두개를 따로 만들어 주었다. 인풋이 두개밖에 없다면 이런코드도

나쁘지 않지만 인풋의 개수가 많아질 것 같으면 `e.target.name` 을 활용하는것이 더 좋을  수 있다. 

이번에는 `useState` 를 통해 사용하는 상태에 문자열이 아닌 객체를 넣어보겠다. 다음과 같이 코드를 수정하자 

```react
import React, {useState} from 'react';

const EventPractice= ()=>{
    const [form, setForm]=useState({
        username:'',
        message:''
    });

    const {username, message} = form;

    const onChange= e=>{
        const nextForm = {
            ...form, //기존의 form 내용을 이 자리에 복사한 뒤
            [e.target.name]: e.target.value //원하는 값을 덮어 씌우기
        };
        setForm(nextForm);
    }
    
    const onClick= ()=>{
        alert(username+': '+message);
        setForm({
            username:'',
            message:''
        })
    };
    const onKeyPress = e=>{
        if(e.key==='Enter'){
            onClick();
        }
    };

    return(
        <div>
            <h1>이벤트 연습</h1>
            <input
                type="text"
                name="username"
                placeholder="사용자명"
                value={username}
                onChange={onchange}
            />
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={message}
                onChange={onchange}
                onKeyPress={onKeyPress}
            />
            <button onClick={onClick}>확인</button>
        </div>
    )
}
export default EventPractice;
```

`e.target.name` 값을 활용하려면 위와 같이 useState를 쓸때 인풋 값들이 들어있는 `form` 객체를 사용해주면 된다.
