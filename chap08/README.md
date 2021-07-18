# 8장 Hooks

`Hooks` 는 리액트 v16.8에 새로 도입된 기능으로 함수형 컴포넌트에서도 상태관리를 할 수 있는 `useState`, 렌더링 직후 작업을 설정하는 `useEffect` 등의 기능을 제공하여

기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게해준다. 

## useState

`useState` 는 가장 기본적인 `Hook` 이며 함수형 컴포넌트에서도 가변적인 상태를 지닐수 있게 해준다. 만약 함수형 컴포넌트에서 상태를 관리해야 한다면 이 `Hook` 을사용

`useState` 기능을 사용해 숫자 카운터를 구현해보자

 ```react
 import React, {useState} from 'react';
 
 const Counter = ()=>{
     const [value, setValue] =useState(0);
 
     return (
         <div>
             <p>
                 현재 카운터 값은 <b>{value}</b>입니다.
             </p>
             <button onClick={()=> setValue(value+1)}>+1</button>
             <button onClick={()=>setValue(value-1)}>-1</button>
         </div>
     )
 }
 
 export default Counter;
 ```

`useState` 는 코드 상단에서 import 구문을 통해 불러오고, 다음과 같이 사용한다

```javascript
const [value, setValue] = useState(0);
```

`useState` 함수의 파라미터에는 상태의 기본값을 넣어준다. 현재 0을 넣어주었는데, 결국 카운터의 기본값을 0으로 설정하겠다는 의미이다. 이 함수가 호출되면 배열을 반환한다.

그배열의 첫번째 원소는 상태 값, 두번째 원소는 상태를 설정하는 함수다. 이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 

리렌더링 된다. 

### useState를 여러번 사용하기

하나의 `useState` 함수는 하나의 상태값만 관리할 수 있다. 컴포넌트에서 관리해야 할 상태가 여러개라면 `useState` 를 여러번 사용하면된다.

```react
import React, {useState} from 'react';

const Info =() =>{
    const [name, setName]=useState('');
    const [nickname, setNickname] = useState('');

    const onChangeName= e =>{
        setName(e.target.value);
    };

    const onChangeNickname= e=>{
        setNickname(e.target.value);
    };

    return (
        <div>
            <div>
                <input value={name} onChange={onChangeName}/>
                <input value={nickname} onChange={onChangeNickname}/>
            </div>
            <div>
                <div>
                    <b>이름:</b>{name}
                </div>
                <div>
                    <b>닉네임: </b>{nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;

```

이렇게 관리할 상태가 여러개인 경우에도 `useState` 로 편하게 관리할 수 있다.

## useEffect

`useEffect` 는 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 `Hook` 이다. 클래스형 컴포넌트의 `componentDidMount` 와

`componentDidUpdate` 를 합친 형태로 보아도 무방하다 .

```react
import React, {useState, useEffect} from 'react';

const Info =() =>{
    const [name, setName]=useState('');
    const [nickname, setNickname] = useState('');
    useEffect(()=>{
        console.log('렌더링이 완료되었습니다!');
        console.log({
            name,
            nickname
        });
    });

    const onChangeName= e =>{
        setName(e.target.value);
    };

    const onChangeNickname= e=>{
        setNickname(e.target.value);
    };

    return (
        <div>
            <div>
                <input value={name} onChange={onChangeName}/>
                <input value={nickname} onChange={onChangeNickname}/>
            </div>
            <div>
                <div>
                    <b>이름:</b>{name}
                </div>
                <div>
                    <b>닉네임: </b>{nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;

```

### 마운트될 때만 실행하고 싶을 때

`useEffect` 에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트때는 실행하지 않으려면 함수의 두번째 파라미터로 비어있는 배열을 넣어주면된다.

```react
 useEffect(()=>{
        console.log('마운트될 때만 실행된다.');
    },[]);
```

### 특정 값이 업데이트될 때만 실행하고 싶을 때

`useEffect` 를 사용할 때, 특정 값이 변경될때만 호출하고 싶은 경우도 있을것이다. 클래스형 컴포넌트라면 다음과 같이 작성할것이다.

```react
componentDidUpdate(prevProps, prevState){
  if(prevProps.value !== this.prop.value){
    doSomething();
  }
}
```

이코드는 `props` 안에 들어있는 `value` 값이 바뀔때만 특정 작업을 수행한다. 이러한 작업을 `useEffect` 에서 해야한다면 어떻게할까

바로 `useEffect` 의 두번째 파라미터로 전달되는 배열안에 검사하고 싶은 값을 넣어주면 된다.

```react
useEffect(()=>{
        console.log(name);
    },[name]);
```

배열 안에는 `useState` 를 통해 관리하고 있는 상태를 넣어주어도 되고, `props` 로 전달받은 값을 넣어주어도 된다.

### 뒷정리하기

`useEffect` 는 기본적으로 렌더링되고 난 직후마다 실행되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라진다. 컴포넌트가 언마운트되기 전이나 업데이트되기

직전에 어떠한 작업을 수행하고 싶다면 `useEffect` 에서 `뒷정리(cleanup)` 함수를 반환해주어야한다.

```react
useEffect(()=>{
        console.log('effect');
        console.log(name);
        return ()=>{
            console.log('cleanup');
            console.log(name);
        };
    }, [name]);
```

이제 App컴포넌트에서 Info 컴포넌트의 가시성을 바꿀수 있게 해보자.

```react
import React,{useState} from 'react';
import Info from './Info'

const App = ()=>{
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button
      onClick={()=>{
        setVisible(!visible);
      }}>
        {visible ? '숨기기' : '보이기'}
      </button>
      <hr />
      {visible && <Info/>}
    </div>
  )
}

export default App;
```

컴포넌트가 나타날 때 콘솔에 `effect` 가 나타나고, 사라질때 `cleanup` 이 나타난다. 

렌더링될 때마다 뒷정리 함수가 계속 나타나는 것을 확인할 수 있다. 그리고 뒷정리 함수가 호출될 때는 업데이트되기 직전의 값을 보여준다. 

오직 언마운트될 때만 뒷정리 함수를 호출하고 싶다면  `useEffect` 함수의 두번째 파라미터에 비어있는 배열을 넣으면 된다.

```react
useEffect(()=>{
  console.log('effect');
  return ()=>{
    console.log('unmount');
  };
},[]);
```

## useReducer

`useReducer` 는 `useState` 보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른값으로 업데이트 해주고 싶을때 사용하는 `Hook` 이다. `리듀서(reducer)` 라는 개념은

추후에 리덕스를 배울때 자세히 알아보자. 

 `리듀서` 는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 `액션(action)` 값을 전달받아 새로운 상태를 반환하는 함수다. `리듀서` 함수에서 새로운 상태를 만들 때는

반드시 불변성을 지켜주어야 한다.

```javascript
function reducer(state, action){
  return { ... }; //불변성을 지키면서 업데이트한 새로운 상태를 반환한다.
}
```

액션 값은 주로 다음과 같은 형태로 이루어져 있다.

``` javascript
{
  type:'INCREMENT',
    //다른값이 필요하다면 추가로 들어감
}
```

후에 다룰 리덕스에서 사용하는 액션객체에는 어떤 액션인지 알려주는 `type` 필드가 꼭 있어야 하지만, `useReducer` 에서 사용하는 액션 객체는 반드시 `type` 을 지니고 있을

필요가 없다. 심지어 객체가 아니라 문자열이나 숫자여도 상관없다

### 카운터구현하기

`useReducer` 를 사용해 기존 Counter 컴포넌트를 다시 구현해보자.

```react
import React, {useReducer} from 'react';

function reducer(state,action){
    //action.type에따라 다른 작업 수행
    switch(action.type){
        case 'INCREMENT':
            return {value:state.value+1};
        case 'DECREMENT':
            return {value: state.value -1};
        default:
            //아무것도 해당되지 않을 때 기존 상태 반환
            return state;
    }
}


const Counter = ()=>{
    const [value, dispatch] = useReducer(reducer,{value:0});

    return (
        <div>
            <p>
                현재 카운터 값은 <b>{state.value}</b>입니다.
            </p>
            <button onClick={()=> dispatch({type: 'INCREMENT'})}>+1</button>
            <button onClick={()=>dispatch({type: 'DECREMENT'})}>-1</button>
        </div>
    )
}

export default Counter;
```

`useReducer` 의 첫 번째 파라미터에는 리듀서 함수를 넣고, 두 번째 파라미터에는 해당 리듀서의 기본값을 넣어준다. 이 `Hook` 을 사용하면 `state` 값과 `dispatch` 함수를 받아온다.

여기서 `state` 는 현재 가리키고 있는 상태이고, `dispatch` 는 액션을 발생시키는 함수이다. `dispatch(action)` 과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어주면

리듀서 함수가 호출되는 구조이다. `useReducer` 를 사용했을 때의 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼수 있다는 것이다.

### 인풋 상태 관리하기

이번에는 `useReducer` 를 사용하여 Info 컴포넌트에서 인풋 상태를 관리해보자. 기존에는 인풋이 여러개여서 `useState` 를 여러번 사용했었는데 `useReducer` 를 사용하면 기존에

클래스형컴포넌트에서 input태그에 name 값을 할당하고 `e.target.name` 을 참조하여 `setState` 를 해준 것과 유사한 방식으로 작업을 처리할 수 있다. 

Info컴포넌트를 다음과 같이 수정해보자

```react
import React, {useReducer} from 'react';

function reducer(state,action){
    return{
        ...state,
        [action.name]: action.value
    };
}


const Info =() =>{
    const [state, dispatch] = useReducer(reducer, {
        name:'',
        nickname:''
    });
    const {name, nickname} = state;
    
    const onChange= e =>{
        dispatch(e.target);
    };

    return (
        <div>
            <div>
                <input name="name" value={name} onChange={onChange}/>
                <input name="nickname" value={nickname} onChange={onchange}/>
            </div>
            <div>
                <div>
                    <b>이름:</b>{name}
                </div>
                <div>
                    <b>닉네임: </b>{nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;

```

`useReducer` 에서의 액션은 그 어떤 값도 사용가능하다. 그래서 이번에는 이벤트 객체가 지니고 있는 `e.target` 값 자체를 액션 값으로 사용했다. 이런식으로 인풋을 관리하면

이무리 인풋의 개수가 많아져도 코드를 짧고 깔끔하게 유지할 수 있다.

## useMemo

`useMemo` 를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있다. 먼저 리스트에 숫자를 추가하면 추가된 숫자들의 평균을 보여주는 함수형컴포넌트를만들자.

```react
import React, {useState} from 'react';

const getAverage = numbers =>{
    console.log('평균값 계산 중..');
    if(numbers.length ===0) return 0;
    const sum=numbers.reduce((a,b)=>a+b);
    return sum/numbers.length;
}

const Average = ()=>{
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');

    const onChange= e=>{
        setNumber(e.target.value);
    };

    const onInsert = e=>{
        const nextList=list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    };

    return (
        <div>
            <input value={number} onChange={onChange}/>
            <button onClick={onInsert} >등록</button>
            <ul>
                {list.map((value,index)=>(
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값:</b>{getAverage(list)}
            </div>
        </div>
    )
}

export default Average;
```

그런데 숫자를 등록할 때 뿐만 아니라 인풋 내용이 수정될때도 `getAverage` 함수가 호출되는 것을 확인할 수 있다. 인풋 내용이 바뀔때는 평균값을 다시 계산할 필요가 없는데,

이렇게 렌더링할때마다 계산하는 것은 낭비임이 분명하다. `useMemo` `Hook` 을 사용하면 이러한 작업을 최적화 할 수 있다. 렌더링하는 과정에서 특정값이 바뀌었을때만

연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시사용하는 방식이다. 이제 코드를 수정해보자

```react
import React, {useState,useMemo} from 'react';

const getAverage = numbers =>{
    console.log('평균값 계산 중..');
    if(numbers.length ===0) return 0;
    const sum=numbers.reduce((a,b)=>a+b);
    return sum/numbers.length;
}

const Average = ()=>{
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');

    const onChange= e=>{
        setNumber(e.target.value);
    };

    const onInsert = e=>{
        const nextList=list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    };
const avg=useMemo(()=>getAverage(list),[list]);
    return (
        <div>
            <input value={number} onChange={onChange}/>
            <button onClick={onInsert} >등록</button>
            <ul>
                {list.map((value,index)=>(
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값:</b>{avg}
            </div>
        </div>
    )
}

export default Average;
```

이제 list 배열의 내용이 바뀔 때만 getAverage 함수가 호출된다.

## useCallback

`useCallback` 은 `useMemo` 와 상당히 비슷한 함수다. 주로 렌더링 성능을 최적화해야하는 상황에서 사용한다. 이 `Hook` 을 사용하면 만들어 놨던 함수를 재사용할수있다.

방금 구현한 `Average ` 컴포넌트를 보자 `onChange` 와 `onInsert`라는 함수를  선언했었다. 이렇게 선언하면 컴포넌트가 리렌더링 될 때마다 새로 만들어진 함수를 사용하게된다.

대부분의 경우 이런방식은 문제 없지만 컴포넌트의 렌더링이 자주 발생하거나 렌더링해야 할 컴포넌트의 개수가 많아지면 이부분을 최적화해주는 것이 좋다.

그럼 `useCallback` 을 이용해 최적화를해보자

```react
import React, {useState,useMemo,useCallback} from 'react';

const getAverage = numbers =>{
    console.log('평균값 계산 중..');
    if(numbers.length ===0) return 0;
    const sum=numbers.reduce((a,b)=>a+b);
    return sum/numbers.length;
}

const Average = ()=>{
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');

    const onChange=useCallback(e =>{
        setNumber(e.target.value);
    }, []); //컴포넌트가 처음 렌더링될 때만 함수 생성

    const onInsert=useCallback(()=>{
      const nextList=list.concat(parseInt(number));
      setList(nextList);
      setNumber('');  
    },[number, list]); //number 혹은 list가 바뀌었을때만 함수 생성
    

const avg=useMemo(()=>getAverage(list),[list]);
    return (
        <div>
            <input value={number} onChange={onChange}/>
            <button onClick={onInsert} >등록</button>
            <ul>
                {list.map((value,index)=>(
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값:</b>{avg}
            </div>
        </div>
    )
}

export default Average;
```

`useCallback` 의 첫번째 파라미터에는 생성하고 싶은 함수를 넣고, 두번째 파라미터에는 배열을 넣으면 된다. 이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시

해야 한다. `onChange` 처럼 비어있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 만들었던 함수를 계속해서 재사용하게 되며 `onInsert` 처럼 배열안에 `number` 와 `list` 를 넣게되면

인풋 내용이 바뀌거나 새로운 항목이 추가될 때 새로만들어진 함수를 사용하게 된다. 

함수내부에서 상태 값에 의존해야 할 때는 그값을 반드시 두번째 파라미터 안에 포함시켜 주어야한다. 예를들어 `onChange` 의 경우 기존의 값을 조회하지 않고 바로 설정만 하기 때문에 

배열이 비어있어도 상관없지만, `onInsert` 는 기존의 `number` 와 `list` 를 조회해서 `nextList` 를 생성하기 때문에 배열안에 `number` 와 `list` 를 꼭 넣어주어야한다.

## useRef

`useRef` `Hook` 은 함수형 컴포넌트에서 `ref` 를 쉽게 사용할 수 있도록 해준다 . Average컴포넌트에서 등록버튼을 눌렀을때 포커스가 인풋쪽으로 넘어가게 해보자.

```react
import React, {useState,useMemo,useCallback,useRef} from 'react';

const getAverage = numbers =>{
    console.log('평균값 계산 중..');
    if(numbers.length ===0) return 0;
    const sum=numbers.reduce((a,b)=>a+b);
    return sum/numbers.length;
}

const Average = ()=>{
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');
    const inputEl=useRef(null);

    const onChange=useCallback(e =>{
        setNumber(e.target.value);
    }, []); //컴포넌트가 처음 렌더링될 때만 함수 생성

    const onInsert=useCallback(()=>{
      const nextList=list.concat(parseInt(number));
      setList(nextList);
      setNumber('');  
      inputEl.current.focus()
    },[number, list]); //number 혹은 list가 바뀌었을때만 함수 생성
    

const avg=useMemo(()=>getAverage(list),[list]);
    return (
        <div>
            <input value={number} onChange={onChange} ref={inputEl}/>
            <button onClick={onInsert} >등록</button>
            <ul>
                {list.map((value,index)=>(
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값:</b>{avg}
            </div>
        </div>
    )
}

export default Average;
```

`useRef` 를 사용하여 `ref` 를 설정하면 `useRef` 를 통해 만든 객체안의 current 값이 실제 엘리먼트를 가리킨다.

### 로컬 변수 사용하기

추가로 컴포넌트 로컬 변수를 사용해야 할 때도 `useRef` 를 활요할 수 있다. 여기서 로컬변수란 렌더링과 상관없이 바뀔 수 있는 값을 의미한다. 클래스 형태로 작성된 컴포넌트의

경우에는 로컬변수를 사용해야 할 때 다음과 같이 작성할 수 있다.

```react
import React, {Component} from 'react';

class MyComponent extends Component{
  id=1
	setId=(n)=>{
  	this.id=n;
	}
  printId= () =>{
    console.log(this.id);
  }
  render(){
    return(
    <div>
        MyComponent
    </div>
    );
  }
}
export default MyComponent;
```

이제 이러한 코드를 함수형 컴포넌트로 작성한다면 다음과 같이 작성할 수 있다.

```react
import React, {useRef} from 'react';

const RefSample =() =>{
  const id=useRef(1);
  const setId= (n) =>{
    id.current=n;
  }
  const printId= ()=>{
    console.log(id.current);
  }
  return (
  <div>
  	refsample  
  </div>
  )
}
export default RefSample;
```

이렇게 `ref` 안의 값이 바뀌어도 컴포넌트가 렌더링되지 않는다는 점에는 주의해야한다. 렌더링과 관련되지 않은 값을 관리할때만 이러한방식으로 코드를 작성하자

## 커스텀 Hooks 만들기

여러 컴포넌트에서 비슷한 기능을 공유할 경우, 자신만의 `Hook` 으로 작성하여 로직을 재사용할 수 있다. 

기존의 Info 컴포넌트에서 여러개의 인풋을 관리하기 위해 `useReducer` 로 작성했던 로직을 `useInputs` 라는 `Hook` 으로 따로 분리해보자.

useInput.js파일을 만들고 다음코드를 작성하자

```react
import {useReducer} from 'react';

function reducer(state, action){
    return{
        ...state,
        [action.name]: action.value
    };
}

export default function useInputs(initialForm){
    const [state, dispatch] = useReducer(reducer, initialForm);
    const onChange = e=>{
        dispatch(e.target);
    };

    return [state, onchange];
}


```

이 `Hook` 을 Info 컴포넌트에서 사용해보자

```react
import React, {useReducer} from 'react';
import useInputs from './useInputs';


const Info =() =>{
    const [state, onChange] = useInputs({
        name:'',
        nickname:''
    })
    const {name, nickname} = state;
    return (
        <div>
            <div>
                <input name="name" value={name} onChange={onChange}/>
                <input name="nickname" value={nickname} onChange={onchange}/>
            </div>
            <div>
                <div>
                    <b>이름:</b>{name}
                </div>
                <div>
                    <b>닉네임: </b>{nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;

```

이전보다 훨씬 깔끔해졌다.

## 다른 Hooks

커스텀 `Hooks`를 만들어서 사용했던 것처럼 다른 개발자가 만든 `Hooks`도 라이브러리로 설치하여 사용할 수 있다.

다른 개발자가 만든 다양한 `Hooks` 리스트는 다음링크에서 확인할 수 있다.

- https://nikgraf.github.io/react-hooks/
- https://github.com/rehooks/awsome-react-hooks

## 정리

리액트에서 `Hooks` 패턴을 사용하면 클래스형 컴포넌트를 작성하지 않고도 대부분의 기능을 구현할 수 있다. 이러한 기능이 리액트에 릴리즈되었다고 해서 기존의

`setState` 를 사용하는 방식이 잘못된것은 아니다. 물론 `useState` 혹은 `useReducer` 를 통해 구현할 수 있다해도 말이다.

리액트 메뉴얼에 뜨라면 기존의 클래스형 컴포넌트는 앞으로도 계속해서 지원될 예정이다. 그렇기 때문에 유지보수하고 있는 프로젝트에서 클래스형 컴포넌트를 사용하고있다면

이를 굳이 함수형컴포넌트와 `Hooks` 를 사용하는 형태로 전환할 필요는 없다. 

앞으로 프로젝트를 개발할 때는 함수형 컴포넌트의 사용을 첫번째 옵션으로 두고, 꼭 필요한 상황에서만 클래스형 컴포넌트를 구현하자.
