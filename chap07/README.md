# 7장 컴포넌트의 라이프사이클 메소드

모든 리액트 컴포넌트에는 라이프사이클 (수명주기)이 존재한다. 컴포넌트의 수명은 페이지에 렌더링 되기 전인 준비과정에서 시작하여 페이지에서 사라질때 끝난다

리액트 프로젝트를 진행하다 보면 가끔 컴포넌트를 처음으로 렌더링할 때 어떤 작업을 처리해야하거나 컴포넌트를 업데이트하기 전후로 어떤 작업을 처리해야 할 수도있고,

또 불필요한 업데이트를 방지해야 할 수도 있다.

이따는 컴포넌트의 라이프사이클 메소드를 사용한다. 참고로 라이프사이클 메소드는 클래스형 컴포넌트에서만 사용할 수 있고 함수형 컴포넌트에서는 사용할 수 없다.

그대신 `Hooks` 기능을 사용해 비슷한 작업을 처리할 수 있다. 

## 라이프사이클 메소드의 이해

라이프 사이클 메소드의 종류는 총 아홉 가지이다. `Will` 접두사가 붙은 메소드는 어떤 작업을 작동하기 전에 실행하는 메소드이고, 

`Did` 접두사가 붙은 메소드는 어떤 작업을 작동한 후에 실행되는 메소드이다. 이메소드들은 우리가 컴포넌트 클래스에서 덮어 써 선언함으로써 사용할수있다

라이프사이클은 총 세가지, 즉 `마운트` , `업데이트` , `언마운트` 카테고리로 나눈다. 우선 어떤것들이 있는지 간단히 알아보고 큰흐름을 이해해보자

![image](https://user-images.githubusercontent.com/40031858/126023944-d92f79b8-62f7-48b0-a9f0-bcff104a53a7.png)

### `마운트`

DOM이 생성되고 웹 브라우저상에 나타나는것을 `마운트(mount)` 라고한다. 이때 호출하는 메소드는 다음과 같다.

![image](https://user-images.githubusercontent.com/40031858/126024068-9535a3ae-2d0d-41e7-8160-61b9494602b1.png)

- `constructor` : 컴포넌트를 새로 만들 때마다 호출되는 생성자 메소드이다
- `getDerivedStateFromProps`: props에 있는 값을 state에 넣을 때 사용하는 메소드이다.
- `render` : 우리가 준비한 UI를 렌더링하는 메소드이다
- `componentDidMount` : 컴포넌트가 웹 브라우저상에 나타난후 호출하는 메소드이다.

### `업데이트`

컴포넌트는 다음과 같은 총 네가지 경우에 업데이트한다

#### 1. props가 바뀔때

#### 2. state가 바뀔때

#### 3. 부모 컴포넌트가 리렌더링될 떄

#### 4. this.forceUpdate로 강제로 렌더링을 트리거할 때

이렇게 컴포넌트를 업데이트 할 때는 다음 메소드를 호출합니다.

![image](https://user-images.githubusercontent.com/40031858/126037870-fc3a0b3d-ff0a-46aa-bd71-0ddee861462d.png)

컴포넌트는 다양한 이유로 업데이트 될 수 있다. 

`첫째, 부모 컴포넌트에서 넘겨주는 prps가 바뀔 때이다.` 컴포넌트에 전달하는 `props` 의 값이 바뀌면 컴포넌트 렌더링이 이루어진다

`둘째, 컴포넌트 자신이 들고 있는 state가 setState를 통해 업데이트 될 때입니다`

 `셋째, 부모 컴포넌트가 리렌더링될 때이다.` 자신에게 할당된 `props` 가 바뀌지 않아도, 또는 자신이 들고 있는 state가 바뀌지 않아도

부모 컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링 된다.

- `getDerivedStateFromProps`: 
이메소드는 마운트 과정에서도 호출되며, 업데이트가 시작하기 전에도 호출된다. props의 변화에 따라 state 값에도변화를 주고 싶을때 사용한다.

- `shouldComponentUpdate`: 

  컴포넌트가 리렌더링을 해야 할지 말아야  할지를 결정하는 메소드이다. 이 메소드에서는 `true` 혹은 `false` 값을 반환해야 하며, `true` 를반환하면

  다음 라이프 사이클 메소드를 계속 실행하고 `false` 를 반환하면 작업을 중지한다. 즉, 컴포넌트가 리렌더링 되지 않는다.

  만약   특정 함수에서 `this.forceUpdate()` 함수를 호출한다면 이 과정은 생략하고 바로 `render` 함수를 호출한다

- `render` : 

  컴포넌트를 리렌더링한다

- `getSnapshotBeforeUpdate`: 

  컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메소드이다

- `componentDidUpdate`:

  컴포넌트의 업데이트 작업이 끝난후 호출하는 메소드이다

### 언마운트

마운트의 반대과정, 즉 컴포넌트를 DOM에서 제거하는 것을 `언마운트` 라고 한다.

![image](https://user-images.githubusercontent.com/40031858/126038091-689f3062-ba73-42c9-bcb3-9fa74b1745cc.png)

- `componentWillUnmount` : 컴포넌트가 웹 브라우저상에서 사라기지 전에 호출하는 메소드이다.

## 라이프사이클 메소드 살펴보기

앞서 소개한 라이프사이클 메소드를 하나씩 자세히 살펴보자

### render() 함수

```javascript
render(){...}
```

이 메소드는 컴포넌트 모양새를 정의한다. 그렇기에 컴포넌트에서 가장 중요한 메소드이며 라이프사이클 메소드중 유일한 `필수 메소드` 이기도 하다.

이 메소드 안에서 `this.props` 와 `this.state` 에 접근할 수 있으며, 리액트 요소를 반환한다. 요소는 `div` 같은 태그가 될 수도 있고, 따로 선언한 컴포넌트가 될 수도있다.

아무것도 보여주고 싶지않다면 `null`  이나 `false` 를 반환한다.

주의해야할 사항은 이메소드 안에서는 이벤트 설정이 아닌곳에서 `setState` 를 사용하면 안되며, 브라우저의 DOM에 접근해서도 안된다. DOM 정보를 가져오거나 `state` 에

변화를 줄 때는 `componentDidMount` 에서 처리해야 한다.

### constructor 메소드

```javascript
constructor(props) {...}
```

이것은 컴포넌트의 생성자 메소드로 컴포넌트를 만들 때 처음으로 실행된다. 이 메소드에서는 초기 `state` 를 정할 수 있다.

### getDerivedStateFromProps 메소드

이것은 리액트 v16.3 이후에 새로 만든 라이프사이클 메소드이다. `props` 로 받아온 값을 `state` 에 동기화시키는 용도로 사용하며, 컴포넌트가 마운트될때와 업데이트될때 호출된다

```react
static getDerivedStateFromProps(nextProps, prevState){
  if(nextProps.value !==prevState.value){ //조건에 따라 특정 값 동기화
    return {value: nextProps.value};
  }
  return null; //state를 변경할 필요가 없다면 null 반환
}
```

### componentDidMount 메소드

```react
componentDidMount(){...}
```

이것은 컴포넌트를 만들고, 첫 렌더링을 다 마찬후 실행한다. 이안에서 다른 자바스크립트 라이브러리 또는 프레임워크의 함수를 호출하거나 이벤트 등록, setTimeout, setInterval,

네트워크 요청 같은 비동기 작업을 처리하면 된다.

### shouldComponentUpdate 메소드

```react
shouldComponentUpdate(nextProps, nextState){...}
```

이것은 `props` 또는 `state` 를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메소드이다. 이 메소드에서는 반드시 `true` 또는 `false` 를 반환해야한다.

컴포넌트를 만들 때 이메소드를 따로 생성하지 않으면 기본적으로 언제나 `true`  를 반환한다. 이 메소드가 `false` 값을 반환한다면 업데이트 과정은 여기서 중지된다.

이 메소드 안에서 현재 `props` 와 `state` 는 `this.props` 와 `this.state` 로 접근하고, 새로 설정될 `props` 또는 `state` 는 `nextProps` 와 `nextState` 로접근할수있다.

프로젝트 성능을 최적화할 때, 상황에 맞는 알고리즘을 작성하여 리렌더링을 방지할 때는 `false` 값을 반환하게 한다. 

### getSnapshotBeforeUpdate 메소드

이것은 리액트 v16.3 이후 만든 메소드이다. 미 메소드는 `render` 에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출된다. 이 메소드에서 반환하는 값은 

`componentDidUpdate` 에서 세번째 파라미터인 `snapshot` 값으로 전달받을 수 있다. 주로 업데이트하기 직전의 값을 참고할 일이 있을때 활용된다 ex)스크롤바 위치 유지

```react
getSnapshotBeforeUpdate(prevProps, prevState){
  if(prevState.array !== this.state.array){
    const {scrollTop, scrollHeight} =this.list
    return {scrollTop, scrollHeight};
  }
}
```

###  componentDidUpdate 메소드

```react
componentDidUpdate(prevProps, prevState, snapshot){...}
```

이것은 리렌더링을 완료한 후 실행된다. 업데이트가 끝난 직후이므로, DOM 관련 처리를 해도 무방하다. 여기서는 `prevProps` 또는 `prevState` 를 사용하여 컴포넌트가 이전에

가렸던 데이터에 접근할 수 있다. 또 `getSnapshotBeforeUpdate` 에서 반환한 값이 있다면 여기서 `snapshot` 값을 전달받을 수 있다.

### componentWillUnmount 메소드

```react
componentWillUnmount(){...}
```

이것은 컴포넌트를 DOM에서 제거할 때 실행한다. `componentDidMount` 에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거작업을 해야한다

### componentDidCatch 메소드

`componentDidCatch` 메소드는 리액트 v16 에서 새롭게 도입되었으며 컴포넌트 렌더링 도중에 에러가 발생했을때 애플리케이션이 먹통이 되지않고 오류 UI를 보여줄 수 있게해준다

사용방법은 다음과 같다

```react
componentDidCatch(error, info){
  this.setState({
    error: true
  });
  console.log({error , info});
}
```

여기서 `error` 파라미터에 어떤 에러가 발생했는지 알려 주며, `info` 파라미터는 어디에 있는 코드에서 오류가 발생했는지에 대한 정보를 준다. 앞의 코드는 그저 `console.log`

만 했지만 나중에 실제로 사용할 때 오류가 발생하면 서버 API를 호출하여 따로 수집할수도있다.

그러나 이메소드를 사용할때는 컴포넌트 자신에게 발생하는 에러를 잡아낼 수 없고 자신의 `this.props.childeren` 으로 전달되는 컴포넌트에서 발생하는 에러만 잡아낼 수 있다.

---



## 라이프사이클 메소드 사용하기

src 디렉토리에 LifeCycleSample.js 라는 컴포넌트를 만들자.

```react
import React, {Component} from 'react';

class LifeCycleSample extends Component{
    state={
        number:0,
        color: null
    }

    myRef=null; //ref를 설정할 부분
    constructor(props){
        super(props);
        console.log('constructor');
    }

    static getDerivedStateFromProps(nextProps, prevState){
        console.log('getDerivedStateFromProps');
        if(nextProps.color !== prevState.color){
            return {color: nextProps.color};
        }
        return null;
    }

    componentDidMount(){
        console.log('componentDidMount');
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log('shouldComponentUpdate', nextProps, nextState);
        //숫자의 마지막 자리가 4면 리렌더링하지 않는다.
        return nextState.number%10 !==4;
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }

    handleClick= ()=>{
        this.setState({
            number: this.state.number+1
        });
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('getSnapshotBeforeUpdate');
        if(prevProps.color!==this.props.color){
            return this.myRef.style.color;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('componentDidUpdate',prevProps,prevState);
        if(snapshot){
            console.log('업데이트되기 직전 색상: ',snapshot);
        }
    }
    render(){
        console.log('render');
        
        const style={
            color: this.props.color
        };

        return (
            <div>
                <h1 style={style} ref={ref=>this.myRef=ref}>
                    {this.state.number}
                </h1>
                <p>color: {this.state.color}</p>
                <button onClick={this.handleClick}>
                    더하기
                </button>
            </div>
        )
    }
}

export default LifeCycleSample;
```

이 컴포넌트는 각 라이프사이클 메소드를 실행할 때마다 콘솔 디버거에 기록하고, 부모 컴포넌트에서 `props` 색상을받아 버튼을 누르면 `state.number` 값을 1씩더한다

`getDerivedStateFromProps` 는 부모에게서 받은 color 값을 `state` 에 동기화하고 있다. 그리고  `getSnapshotBeforeUpdate` 는 DOM에 변화가 일어나기 직전의

색상 속성을 `snapshot` 값으로 반환하여 이것을 `componentDidUpdate` 에서 조회할수 있게 했다.

추가로 `shouldComponentUpdate` 메소드에서 `state.number` 값의 마지막 자리수가 4이면 리렌더링을 취소하도록 설정했다.

```react
import React, {Component} from 'react';
import LifeCycleSample from './LifeCycleSample';

//랜덤 색상을 생성한다.
function getRandomColor() {
  return '#'+Math.floor(Math.random() * 16777215).toString(16);
}


class App extends Component{
  state={
    color: '#000000'
  }

  handleClick= () => {
    this.setState({
      color: getRandomColor()
    });
  }
  render(){
    return  (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <LifeCycleSample color={this.state.color}/>
      </div>
    )
  }
}
export default App;
```

`getRandomColor` 함수는 `state` 의 `color` 값을 랜덤 색상으로 설정한다. 16777215를 hex로 표현하면 ffffff가 되므로 해당코드는 000000부터 ffffff값을 반환한다.

버튼을 렌더링하고 , 누를때마다 `handleClick` 메소드가 호출되게 이벤트를 설정하여 불러온 LifeCycleSample 컴포넌트에 color 값을 props로 설정한다.

```markdown
## React.StrictMode 적용

`React.StrictMode` 가 적용되어 있으면 일부 라이프사이클이 두번 씩 호출된다. 개발환경에서만 두번씩 호출되며 프로덕션 환경에서는 정상적으로 호출되니 안심하자.

만약 이를 제거하고싶다면 index.js를열어서 React.StrictMode를 제거하고 App컴포넌트만 렌더링하면된다.
```

### 에러잡아내기

방금 만든 LifeCycleSample 컴포넌트의 `render` 함수에[서 의도적으로 에러를 한번 발생시켜 보자. `render` 함수에서의 에러는 주로 존재하지 않는 함수를 사용하려고 하거나 존재하지

않는 객체의 값을 조회하려고 할때발생한다 이를 수정해보자

```react
import React, {Component} from 'react';
import LifeCycleSample from './LifeCycleSample';

//랜덤 색상을 생성한다.
function getRandomColor() {
  return '#'+Math.floor(Math.random() * 16777215).toString(16);
}


class App extends Component{
  state={
    color: '#000000'
  }

  handleClick= () => {
    this.setState({
      color: getRandomColor()
    });
  }
  render(){
    return  (
      <div>
        {this.props.missing.value}
        <button onClick={this.handleClick}>랜덤 색상</button>
        <LifeCycleSample color={this.state.color}/>
      </div>
    )
  }
}
export default App;
```

![image](https://user-images.githubusercontent.com/40031858/126039369-5dc8e63b-743f-4baf-8354-7a66f3dec7aa.png)

존재하지 않는 `props` 인 `missing` 객체의 `value` 를 조회해서 렌더링해주려고 하면 당연히 브라우저에는 에러가 발생한다.

지금부터는 에러를 잡아주는 ErrorBoundary라는 컴포넌트를 생성해보자

```react
import React, {Component} from 'react';

class ErrorBoundary extends Component{
    state={
        error:false
    };

    componentDidCatch(error, info){
        this.setState({
            error:true
        });
        console.log({error,info});
    }

    render(){
        if(this.state.error) return <div>에러가 발생했습니다!</div>
        return this.props.children;
    }
}

export default ErrorBoundary;
```



에러가 발생하면 `componentDidCatch` 가 호출되며 이 메소드는 `this.state.error` 값을 `true` 로 업데이트 해준다. 그리고 `render` 함수는 

`this.state.error` 값이 `true` 라면 에러가 발생했음을 알려주는 문구를 보여준다. 이제 App.js를 수정해보자

```react
import React, {Component} from 'react';
import LifeCycleSample from './LifeCycleSample';
import ErrorBoundary from './ErrorBoundary';

//랜덤 색상을 생성한다.
function getRandomColor() {
  return '#'+Math.floor(Math.random() * 16777215).toString(16);
}


class App extends Component{
  state={
    color: '#000000'
  }

  handleClick= () => {
    this.setState({
      color: getRandomColor()
    });
  }
  render(){
    return  (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <ErrorBoundary>
        <LifeCycleSample color={this.state.color}/>
        </ErrorBoundary>
      </div>
    )
  }
}
export default App;
```

## 정리

컴포넌트의 라이프사이클 메소드 흐름을 한눈에 보자

![image](https://user-images.githubusercontent.com/40031858/126039724-b5fc94ca-bf15-4cae-9b79-5089270578b4.png)

라이프사이클 메소드는 컴포넌트 상태에 변화가 있을때마다 실행하는 메소드이다. 이 메소드들은 서드파티 라이브러리를 사용하거나 DOM을 직접 건드려야 하는 상황에서 유용하다

추가로 컴포넌트 업데이트의 성능을 개선할 때는 `shouldComponentUpdate` 가 중요하게 사용된다. 

`shouldComponentUpdate` 를 사용하여 컴포넌트의 업데이트 성능을 개선하는 내용은 추후에 다뤄보자.
