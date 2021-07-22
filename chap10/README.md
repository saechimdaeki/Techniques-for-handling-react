# 10장 일정 관리 웹 애플리케이션 만들기

## 프로젝트 준비

```bash
$ yarn create react-app chapter10
$ cd chapter10
$ yarn add node-sass@4.14.1 classnames react-icons
```

### Prettier 설정

Presstier를 설정하여 코드를 작성할때 코드 스타일을 깔끔하게 정리하자. 프로젝트 최상위 디렉토리에 .prettierrc 파일을 다음과같이 생성

```json
{
    "singleQuote": true,
    "semi" : true,
    "useTabs" : false,
    "tabWidth": 2,
    "trailngComma": "all",
    "printWidth": 80
}
```

### index.css 수정

프로젝트의 글로벌 스타일 파일이 들어 있는 index.css를 수정하자. 기존에 있던 폰트 설정을 지우고 background속성을 설정.

```css
body{
  margin: 0;
  padding: 0;
  background: #e9ecef;
}
```

### App컴포넌트 초기화

기존에 있던 App 컴포넌트의 내용을 모두삭제한다.

```react
import React from 'react';

const App = () =>{
  return <div>Todo App을 만들자!</div>
};

export default App;

```

---



## UI구성하기

앞으로 만들 컴포넌트를 하나하나 용도별로 미리 보자.

- `TodoTemplate`:

  화면을 가운데에 정렬시켜주며, 앱 타이틀(일정 관리)을 보여 줍니다. children으로 내부 JSX를 `props`로 받아 와서 렌더링해 줍니다

- `TodoInsert` : 

  새로운 항목을 입력하고 추가할 수 있는 컴포넌트이다. `state` 를 통해 인풋의 상태를 관리한다

- `TodoListItem` : 

  각 할 일 항목에 대한 정보를 보여주는 컴포넌트이다. todo객체를 `props` 로 받아와서 상태에 따라 다른 스타일의 UI를보여준다

- `TodoList` : 

  todos 배열을 `props` 로 받아 온 후, 이를 배열 내장 함수 `map` 을 사용해서 여러 개의 TodoListItem 컴포넌트로 변환하여 보여준다.



### TodoTemplate 만들기

src디렉토리에 components 디렉토리를 생성한 뒤 그안에 TodoTemplate.js와 TodoTemplate.scss파일을 생성하자

```react
import React from 'react';
import './TodoTemplate.scss';

const TodoTemplate = ({children}) => {
    return (
        <div className="TodoTemplate">
            <div className="app-title">일정 관리</div>
            <div className="content">{children}</div>
        </div>
    );
};

export default TodoTemplate;
```

다음으로 이 컴포넌트를 App.js에서 불러와 렌더링하자

```react
import React from 'react';
import TodoTemplate from './components/TodoTemplate';

const App = () =>{
  return <TodoTemplate>Todo App을 만들자!</TodoTemplate>
};

export default App;
```

```scss
.TodoTemplate {
    width: 512px;
    // width가 주어진 상태에서 좌우 중앙 정렬
    margin-left: auto;
    margin-right: auto;
    margin-top: 6rem;
    border-radius: 4px;
    overflow: hidden;
  
    .app-title {
      background: #22b8cf;
      color: white;
      height: 4rem;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .content {
      background: white;
    }
  }
```



### TodoInsert 만들기

이번에는 TodoInsert를 만들자. Components 디렉토리에 TodoInsert.js파일과 TodoInsert.scss파일을 생성하자

```react
import React from 'react';
import {MdAdd} from 'react-icons/md';
import './TodoInsert.scss';


const TodoInsert = () =>{
    return (
        <form className="TodoInsert">
            <input placeholder="할 일을 입력하세요"/>
            <button type="submit">
                <MdAdd/>
            </button>
        </form>
    );
};

export default TodoInsert;
```

여기서 처음으로 `react-icons` 의 아이콘을 사용했다. https://react-icons.netlify.com/#/icons/md 페이지에 들어가면 수많은 아이콘과

일므아 나타나는데 여기서 사용하고 싶은 아이콘을 고른다음 , import 구문을 사용하여 컴포넌트처럼 사용하면 된다.

```react
import {아이콘 이름} from 'react-icons/md';
```

이제 이 컴포넌트를 App에서 불러와 렌더링해보자.

```react
import React from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';

const App = () =>{
  return (
  <TodoTemplate>
    <TodoInsert/>
  </TodoTemplate>
  );
};

export default App;
```



![image](https://user-images.githubusercontent.com/40031858/126596641-bbe60453-2fb8-4ca0-a4b2-491e666be26f.png)



이제 이컴포넌트를 스타일링해보자

```scss
.TodoInsert {
  display: flex;
  background: #495057;
  input {
    // 기본 스타일 초기화
    background: none;
    outline: none;
    border: none;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: white;
    &::placeholder {
      color: #dee2e6;
    }
    // 버튼을 제외한 영역을 모두 차지하기
    flex: 1;
  }
  button {
    // 기본 스타일 초기화
    background: none;
    outline: none;
    border: none;
    background: #868e96;
    color: white;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.1s background ease-in;
    &:hover {
      background: #adb5bd;
    }
  }
}
```

![image](https://user-images.githubusercontent.com/40031858/126596775-02aa32b4-fe60-478a-9a19-64923b4f4015.png)



### TodoListItem과 TodoList 만들기

이제 일정 관리 항목이 보일 TodoListItem과 TodoList를 만들차례다. 먼저 TodoListItem 컴포넌트부터 만들자. 

components 디렉토리에 TodoListItem.js와 TodoListItem.scss를 생성하고 다음과 같이 작성하자.

```react
import React from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline
} from 'react-icons/md';

import './TodoListItem.scss'

const TodoListItem = () =>{
    return (
        <div className="TOdoListItem">
            <div className="checkbox">
                <MdCheckBoxOutlineBlank/>
                <div className="text">할 일</div>
            </div>
            <div className="remove">
                <MdRemoveCircleOutline/>
            </div>
        </div>
    );
};

export default TodoListItem;
```

여기서는 다양한 아이콘을 불러서 사용했다. 아직 MdCheckBox아이콘 컴포넌트는 사용하지 않은 상태인데 이 아이콘은 나중에 할 일이 완료 되었을때

체크된 상태를 보여주기 위해 사용할 아이콘이다. 이 컴포넌트를 다 작성했으면 TodoList.js파일과 TodoList.scss 파일을 생성하고, TodoList.js

컴포넌트를 다음괴 같이 작성해보자.

```react
import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ()=>{
    return(
        <div className="TodoList">
            <TodoListItem/>
            <TodoListItem/>
            <TodoListItem/>
        </div>
    );
};

export default TodoList;
```

지금은 이 컴포넌트에 TodoListItem을 불러와서 별도의 `props` 전달 없이 그대로 여러 번 보여주고 있다. 나중에는 여기에 기능을 추가하고

다양한 데이터를 전달하자. 이제 이를 App에서 렌더링하자.

```react
import React from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () =>{
  return (
  <TodoTemplate>
    <TodoInsert/>
    <TodoList/>
  </TodoTemplate>
  );
};

export default App;
```

```scss
// TodoList.scss
.TodoList{
    min-height: 320px;
    max-height: 513px;
    overflow-y: auto;
}
```

```scss
//TodoListItem.scss
.TodoListItem {
  padding: 1rem;
  display: flex;
  align-items: center; // 세로 중앙 정렬
  &:nth-child(even) {
    background: #f8f9fa;
  }
  .checkbox {
    cursor: pointer;
    flex: 1; // 차지할 수 있는 영역 모두 차지
    display: flex;
    align-items: center; // 세로 중앙 정렬
    svg {
      // 아이콘
      font-size: 1.5rem;
    }
    .text {
      margin-left: 0.5rem;
      flex: 1; // 차지할 수 있는 영역 모두 차지
    }
    // 체크되었을 때 보여줄 스타일
    &.checked {
      svg {
        color: #22b8cf;
      }
      .text {
        color: #adb5bd;
        text-decoration: line-through;
      }
    }
  }
  .remove {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: #ff6b6b;
    cursor: pointer;
    &:hover {
      color: #ff8787;
    }
  }

  // 엘리먼트 사이사이에 테두리를 넣어줌
  & + & {
    border-top: 1px solid #dee2e6;
  }
}
```

![image](https://user-images.githubusercontent.com/40031858/126600089-2763347a-bae6-4453-a2d1-9ab539df9ddd.png)



## 기능 구현하기

이제 일정 관리 애플리케이션이 실제로 동작할 수 있도록 기능을 구현해 보자

### App에서 todos 상태 사용하기

나중에 추가할 일정 항목에 대한 상태들은 모두 App 컴포넌트에서 관리한다. App에서 `useState` 를 사용하여 todos라는 상태를 정의하고, todos를

TodoList의 `props` 로 전달해보자.

```react
import React, {useState} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () =>{
  const [todos, setTodos] = useState([
    {
      id:1,
      text:'리액트의 기초 알아보기',
      checked: true,
    },
    {
      id:2,
      text:'컴포넌트 스타일링 해보기',
      checked: true,
    },
    {
      id:3,
      text: '일정 관리 앱 만들어보기',
      checked:false,
    },
  ]);

  return (
  <TodoTemplate>
    <TodoInsert/>
    <TodoList todos={todos}/>
  </TodoTemplate>
  );
};

export default App;
```

todos 배열 안에 들어있는 객체에는 각 항목의 고유 id, 내용, 완료 여부를 알려주는 값이 포함되어있다. 이 배열은 TodoList에 `props` 로 전달된다.

TodoList에서 이 값을 받아 온 후 TodoItem으로 변환하여 렌더링하도록 설정해야 한다.

```react
import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({todos})=>{
    return(
        <div className="TodoList">
            {
                todos.map(todo =>(
                    <TodoListItem todo={todo} key={todo.id}/>
                ))    
            }
        </div>
    );
};

export default TodoList;
```

`props` 로 받아 온 todos배열을 배열 내장 함수 map을 통해 TodoListItem으로 이루어진 배열로 변환하여 렌더링해주었다.

`map` 을 사용하여 컴포넌트로 변환할 때는 `key props` 를 전달해 주어야한다고 배웠는데 여기서 사용되는 `key` 값은 각 항목마다 가지고 있는 고윳

값인 id를 넣어주자. 그리고 todo 데이터는 통째로 `props` 로 전달해주자. 여러 종류의 값을 전달해야하는 경우 객체로 통째로 전달하는 편이

나중에 성능최적화를 할 때 편리하다. 

이제  TodoListItem 컴포넌트에서 받아온 todo 값에 따라 제대로된 UI를 보여줄수있도록 컴포넌트를 수정해보자.

```react
import React from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss'

const TodoListItem = ({todo}) =>{
    const {text, checked} = todo;
    return (
        <div className="TodoListItem">
            <div className={cn('checkbox',{checked})}>
                {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
                <div className="text">{text}</div>
            </div>
            <div className="remove">
                <MdRemoveCircleOutline/>
            </div>
        </div>
    );
};

export default TodoListItem;
```

이제 TodoList 컴포넌트는 App에서 전달해 준 todos 값에 따라 다른 내용을 제대로 보여준다.

![image](https://user-images.githubusercontent.com/40031858/126602052-bf0485f1-df36-4805-97de-31711bf89d52.png)

### 항목 추가 기능 구현하기

이번에는 일정항목을 추가하는 기능을 구현해보자. 이 기능을 구현하려면 TodoInsert컴포넌트에서 인풋 상태를 관리하고 App컴포넌트에는 todos 배열에

새로운 객체를 추가하는 함수를 만들어 주어야 한다.

### TodoInsert value 상태 관리하기

TodoInsert 컴포넌트에서 인풋에 입력하는 값을 관리할수 있도록 `useState` 를 사용하여 `value` 라는 상태를 정의하자.

추가로 인풋에 넣어 줄 onChange 함수도 작성해 주어야 한다. 이 과정에서 컴포넌트가 리렌더링될 때마다 함수를 새로 만드는 것이 아닌, 한번 함수를 

만들고 재사용할 수 있도록 `useCallback Hook` 을 사용하겠다.

```react
import React, { useCallback, useState } from 'react';
import {MdAdd} from 'react-icons/md';
import './TodoInsert.scss';


const TodoInsert = () =>{
    const [value, setValue] = useState('');
    
    const onChange = useCallback(e => {
        setValue(e.target.value);
    },[]);

    return (
        <form className="TodoInsert">
            <input placeholder="할 일을 입력하세요"
                value={value}
                onChange={onChange}
            />
            <button type="submit">
                <MdAdd/>
            </button>
        </form>
    );
};

export default TodoInsert;
```

이제 인풋에 텍스트를 입력해보자. 사실 인풋은 value값과 onChange 를 설정하지 않더라도 입력할 수 있다. 그저 리액트 컴포넌트 쪽에서 해당 인풋에

무엇이 입력되어 있는지 추적하지 않을뿐이다. 



### todos 배열에 새 객체 추가하기

이번에는 App컴포넌트에서 todos 배열에 새 객체를 추가하는 onInsert 함수를 만들어 보자. 이 함수에서는 새로운 객체를 만들 때마다 id값에 1씩 

더해주어야 한다. id값은 `useRef` 를 사용하여 관리하자. 여기서 `useState` 가 아닌 `useRef` 를 사용하여 컴포넌트에서 사용할 변수를 만드는

이유는 무엇일까 id값은 렌더링되는 정보가 아니기 때문이다. 예를들어 이 값은 화면에 보이지 않고 이값이 바뀐다고 컴포넌트가 리렌더링 될

필요도 없다. 단순히 새로운 항목을 만들때 참조되는 값일 뿐이다.

또한 onInsert 함수는 컴포넌트의 성능을 아낄 수 있도록 `useCallback` 으로 감싸주겠다. `props` 로 전달해야 할 함수를 만들때는

`useCallback` 을 사용하여 함수를 감싸는 것을 습관화하자. 

```react
import React, {useState, useRef, useCallback} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () =>{
  const [todos, setTodos] = useState([
    {
      id:1,
      text:'리액트의 기초 알아보기',
      checked: true,
    },
    {
      id:2,
      text:'컴포넌트 스타일링 해보기',
      checked: true,
    },
    {
      id:3,
      text: '일정 관리 앱 만들어보기',
      checked:false,
    },
  ]);

  //고윳값으로 사용될 id
  //ref를 사용하여 변수 담기
  const nextId= useRef(4);
  const onInsert= useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked:false,
      };
      setTodos(todos.concat(todo));
      nextId.current +=1; //nextId 1씩 더하기
    },
    [todos],
  );

  return (
  <TodoTemplate>
    <TodoInsert onInsert={onInsert}/>
    <TodoList todos={todos}/>
  </TodoTemplate>
  );
};

export default App;
```

### TodoInsert에서 onSubmit이벤트 설정하기

지금부터 버튼을 클릭하면 발생할 이벤트를 설정해보자. 바로 위 App에서 TodoInsert에 넣어준 onInsert 함수에 현재  `useState` 를 통해 관리하고

있는 value 값을 파라미터로 넣어서 호출하자.

```react
import React, { useCallback, useState } from 'react';
import {MdAdd} from 'react-icons/md';
import './TodoInsert.scss';


const TodoInsert = ({onInsert}) =>{
    const [value, setValue] = useState('');
    
    const onChange = useCallback(e => {
        setValue(e.target.value);
    },[]);
    const onSubmit = useCallback(
        e =>{
            onInsert(value);
            setValue(''); //value 값 초기화

            //submit 이벤트는 브라우저에서 새로고침을 발생시킨다.
            // 이를 방지하기 위해 이함수를 호출한다
            e.preventDefault();
        },
        [onInsert, value],
    );
    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input placeholder="할 일을 입력하세요"
                value={value}
                onChange={onChange}
            />
            <button type="submit">
                <MdAdd/>
            </button>
        </form>
    );
};

export default TodoInsert;
```

onSubmit이라는 함수를 만들고, 이를 form의 onSubmit으로 설정했다. 이 함수가 호출되면 `props` 로 받아 온 onInsert 함수에 현재 value 값을

파라미터로 넣어서 호출하고, 현재 value값을 초기화한다.

추가로 onSubmit 이벤트는 브라우저를 새로고침시킨다. 이때 `e.preventDefault()` 함수를 호출하면 새로고침을 방지할 수 있다.

물론 다음과 같이 onSubmit 대신에 버튼의 onClick이벤트로도 충분히 처리할 수 있다.

```react
const onClick= useCallback(
() => {
  onInsert(value);
  setValue(''); //value값 초기화
},
[onInsert,value],
);

return (
	<form className="TodoInsert">
  	<input
      placeholer="할 일을 입력하세요"
      value={value}
      onChange={onChange}
      />
    <button onClick={onClick}>
    	<MdAdd/>
    </button>
  </form>
);
```

이렇게 클릭 이벤트만으로도 할 수 있는데 굳이 form과 onSubmit 이벤트를 사용한 이유는 무엇일까

onSubmit이벤트의 경우 인풋에서 'Enter' 를 눌렀을때도 발생하기 때문이다 



### 지우기 기능 구현하기

이번에는 지우기 기능을 구현해보자. 리액트 컴포넌트에서 배열의 불변성을 지키면서 배열 원소를 제거해야 할 경우, 배열 내장 함수인 `filter` 를

사용하면 매우 간편하다

### 배열 내장 함수 filter

`filter` 함수는 기존의 배열은 그대로 둔 상태에서 특정 조건을 만족하는 원소들만 따로 추출하여 새로운 배열을 만들어준다.

```javascript
const array=[1,2,3,4,5,6,7,8,9,10];
const biggerThanFive = array.filter(number => number> 5);
// 결과 [6,7,8,9,10]
```

`filter` 함수에는 조건을 확인해주는 함수를 파라미터로 넣어주어야 한다. 파라미터로 넣는 함수는 true혹은 false값을 반환해야 하며, 

여기서  true를 반환하는 경우만 새로운 배열에 포함된다

### todos 배열에서 id로 항목 지우기

`filter` 함수를 사용해  `onRemove` 함수를 작성해보자. App컴포넌트에  id를 파라미터로 받아와서 같은 id를 가진 항목을  todos 배열에서 지우는

함수다. 이함수를 만들고  TodoList의 props로 설정하자

```react
import React, {useState, useRef, useCallback} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () =>{
  const [todos, setTodos] = useState([
    {
      id:1,
      text:'리액트의 기초 알아보기',
      checked: true,
    },
    {
      id:2,
      text:'컴포넌트 스타일링 해보기',
      checked: true,
    },
    {
      id:3,
      text: '일정 관리 앱 만들어보기',
      checked:false,
    },
  ]);

  //고윳값으로 사용될 id
  //ref를 사용하여 변수 담기
  const nextId= useRef(4);
  const onInsert= useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked:false,
      };
      setTodos(todos.concat(todo));
      nextId.current +=1; //nextId 1씩 더하기
    },
    [todos],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    }, [todos],
  );

  return (
  <TodoTemplate>
    <TodoInsert onInsert={onInsert}/>
    <TodoList todos={todos} onRemove={onRemove}/>
  </TodoTemplate>
  );
};

export default App;
```

### TodoListItem에서 삭제함수 호출하기

TodoListItem에서 방금 만든 onRemove 함수를 사용하려면 우선 TodoList 컴포넌트를 거쳐야한다. 다음과 같이 `props` 로 받아온

onRemove 함수를  TodoListItem에 그대로 전달하자

```react
import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({todos,onRemove})=>{
    return(
        <div className="TodoList">
            {
                todos.map(todo =>(
                    <TodoListItem todo={todo} key={todo.id} onRemove={onRemove}/>
                ))    
            }
        </div>
    );
};

export default TodoList;
```

이제 삭제 부턴을 누르면 TodoListItem에서 onRemove 함수에 현재 자신이 가진 id를 넣어서 삭제함수를 호출하도록 설정해보자

```react
import React from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss'

const TodoListItem = ({todo,onRemove}) =>{
    const {id,text, checked} = todo;
    return (
        <div className="TodoListItem">
            <div className={cn('checkbox',{checked})}>
                {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
                <div className="text">{text}</div>
            </div>
            <div className="remove" onClick={()=> onRemove(id)}>
                <MdRemoveCircleOutline/>
            </div>
        </div>
    );
};

export default TodoListItem;
```

이제 브라우저를 열어 일정 항목의 우측에 나타나는 빨간색 아이콘버튼을 누르자. 제대로 삭제될 것이다.



### 수정 기능

수정기능도 방금 만든 삭제 기능과 꽤 비슷하다. `onToggle` 이라는 함수를  App에 만들고 해당 함수를  TodoList 컴포넌트에게  `props` 로 넣어주자.

```react
import React, {useState, useRef, useCallback} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () =>{
  const [todos, setTodos] = useState([
    {
      id:1,
      text:'리액트의 기초 알아보기',
      checked: true,
    },
    {
      id:2,
      text:'컴포넌트 스타일링 해보기',
      checked: true,
    },
    {
      id:3,
      text: '일정 관리 앱 만들어보기',
      checked:false,
    },
  ]);

  //고윳값으로 사용될 id
  //ref를 사용하여 변수 담기
  const nextId= useRef(4);
  const onInsert= useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked:false,
      };
      setTodos(todos.concat(todo));
      nextId.current +=1; //nextId 1씩 더하기
    },
    [todos],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    }, [todos],
  );

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          todo.id ===id ? {...todo, checked: !todo.checked} : todo,),
      );
    },
    [todos],
  );

  return (
  <TodoTemplate>
    <TodoInsert onInsert={onInsert}/>
    <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
  </TodoTemplate>
  );
};

export default App;
```

위 코드에서는 배열 내장 함수 `map` 을 사용하여 특정 id를 가지고 있는 객체의 의  checked 값을 반환시켜 주었다. 불변성을 유지하면서 특정 배열 원소

를 업데이트해야 할 때 이렇게 `map` 을 사용하면 짧은 코드로 쉽게 작성할 수 있다.

그런데 여기서 왜 `map` 이 사용된 것인지 이해하기 힘들수도 있다. `map` 함수는 배열을 전체적으로 새로운 형태로 변환하여 새로운 배열을 생성해야 할 때

사용하는데 지금은 원소 하나만 수정하는데 왜 `map` 을 사용하는것일까?

`onToggle` 함수를 보면 todo.id===id? ... : ...  이라는 삼항연산자가 사용되었다. 여기서 사용한 코드를 좀더 자세히보면 todo.id와 현재 파라미터로 

사용된 id값이 같을때는 우리가 정해 준 규칙대로 새로운 객체를 생성하지만 id값이 다를때는 변화를 주지않고 처음받아 왔던 상태 그대로 반환한다.

그렇기 때문에 `map` 을 사용하여 만든 배열에서 변화가 필요한 원소만 업데이트되고 나머지는 그대로 남아있게된다.

### TodoListItem에서 토글 함수 호출하기

이제 App에서 만든 `onToggle` 함수를 TodoListItem 에서도 호출할 수 있도록  TodoList를 거쳐 TodoListItem에게 전달하자

```react
// TodoList.js

import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({todos,onRemove,onToggle})=>{
    return(
        <div className="TodoList">
            {
                todos.map(todo =>(
                    <TodoListItem todo={todo} 
                    key={todo.id} 
                    onRemove={onRemove}
                    onToggle={onToggle}
                    />
                ))    
            }
        </div>
    );
};

export default TodoList;
```

```react
//TodoListItem.js
import React from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss'

const TodoListItem = ({todo,onRemove,onToggle}) =>{
    const {id,text, checked} = todo;
    return (
        <div className="TodoListItem">
            <div className={cn('checkbox',{checked})} onClick= {()=> onToggle(id)}> 
                {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
                <div className="text">{text}</div>
            </div>
            <div className="remove" onClick={()=> onRemove(id)}>
                <MdRemoveCircleOutline/>
            </div>
        </div>
    );
};

export default TodoListItem;
```

이제 마지막 기능까지 모두 구현되었고 체크박스를 눌러보자 상태가 잘 업데이트 될 것이다.

![image](https://user-images.githubusercontent.com/40031858/126608423-d334a4bc-575d-41d8-b3c5-bd398f461c0b.png)



## 정리

이번에 만든 프로젝트는 소규모이기 때문에 따로 컴포넌트 리렌더링 최적화 작업을 하지않아도 정상적으로 작동한다. 하지만 일정 항목이 몇 만개 씩

생긴다면 새로운 항목을 추가하거나 기존 항목을 삭제 및 토글할 때 지연이 발생할 수 있다. 클라이언트 자원을 더 효율적으로 사용하려면 불필요한

리렌더링을 방지해야하는데 이에 관한 내용은 다음장에서 살펴보자.
