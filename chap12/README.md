# 12장 immer를 사용하여 더 쉽게 불변성 유지하기

11장에서는 컴포넌트 업데이트 성능을 어떻게 최적화해야 하는지, 불변성을 유지하면서 상태를 업데이트한느 것이 왜 중요한지 배웠다.

전개 연산자와 배열의 내장 함수를 사용하면 간단하게 배열 혹은 객체를 복사하고 새로운 값을 덮어씌울 수 있다. 하지만 객체의 

구조가 엄청나게 깊어지면 불변성을 유지하면서 이를 업데이트하는 것이 힘들다.

```react
const object = {
  somewhere:{
    deep:{
      inside: 3,
      array:[1,2,3,4]
    },
    bar:2
  },
  foo:1
};

//somewhere.deep.inside 값을 4로 바꾸기
let nextObject ={
  ...object,
  somewhere:{
    ...object.somewhere,
    deep:{
      ...object.somewhere.deep,
      inside:4
    }
  }
};

//somewhere.deep.array에 5 추가하기
let nextObject = {
  ...object,
  somewhere:{
    ...object.somewhere,
    deep:{
      ...object.somewhere.deep,
      array: object.somewhere.deep.array.concat(5)
    }
  }
};
```

값 하나를 업데이트하기 위해 코드를 열 줄 정도 작성해야한다. 이렇게 전개 연산자를 자주 사용한 것은 기존에 가지고 있던 다른 값을 유지하면서 

원하는 값을 새로 지정하기 위해서이다. 간혹 프로젝트에서 이렇게 복잡한 상태를 다룰 때가 있는데 그럴때마다 전개연산자를 여러번 사용하는 것은

번거로운 작업이며 가독성또한 좋지않다. 이러한 상황에 `immer` 라는 라이브러리를 사용하면, 구조가 복잡한 객체도 매우 쉽고 짧은 코드를 사용하여

불변성을 유지하면서 업데이트해 줄 수 있다.

## immer를 설치하고 사용법 알아보기

```bash
$ yarn add immer
```



### immer를 사용하지 않고 불변성  유지

먼저 `immer` 를 사용하지 않고 불변성을 유지하면서 값을 업데이트하는 컴포넌트를 작성해보자 App.js 파일을 다음과 같이 작성하자

```react
import React, {useRef, useCallback, useState} from 'react';

const App= ()=>{
  const nextId=useRef(1);
  const [form, setForm] = useState({name: '', username:''});
  const [data, setData] = useState({
    array:[],
    uselessValue:null
  });

  //input 수정을 위한 함수
  const onChange= useCallback(
    e =>{
      const {name, value} = e.target;
      setForm({
        ...form,
        [name]: [value]
      });
    },
    [form]
  );

  // form 등록을 위한 함수
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const info = {
        id:nextId.current,
        name: form.name,
        username: form.username
      };

      //array에 새 항목 등록
      setData({
        ...data,
        array: data.array.concat(info)
      });

      // form 초기ㅏ화
      setForm({
        name:'',
        username:''
      });
      nextId.current+=1;
    },
    [data, form.name, form.username]
  );

  // 항목을 삭제하는 함수
  const onRemove= useCallback(
    id => {
      setData({
        ...data,
        array:data.array.filter(info => info.id !== id)
      });
    },
    [data]
  );
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={onChange}
            />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
          />
        <button type="submit">등록</button>  
      </form>
      <div>
        <ul>
          {data.array.map(info => (
            <li key={info.id} onClick={()=> onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default App;
```

폼에서 아이디/이름을 입력하면 하단 리스트에 추가되고, 리스트 항목을 클릭하면 삭제되는 간단한 컴포넌트를 만들었다. 이렇게 전개 연산자와 배열내장함수

를 사용하여 불변성을 유지하는것은 어렵지 않지만 상태가 복잡해진다면 귀찮은 작업이 될 수 있다.

### immer 사용법

`immer` 를 사용하면 불변성을 유지하는 작업을 매우 간단하게 처리할 수 있다. 이라이브러리의 사용법은 다음과 같다.

```react
import produce from 'immer';

const nextState= produce(originalState, draft => {
  //바꾸고 싶은 값 바꾸기
  draft.somewhere.deep.inside = 5;
})
```

`produce` 라는 함수는 두가지 파라미터를 받습니다. 첫번째 파라미터는 수정하고 싶은 상태이고, 두번째 파라미터는 상태를 어떻게 업데이트할지

정의하는 함수이다. 두번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면 `produce` 함수가 불변성유지를 대신해 주면서 새로운 상태를

생성해준다. 이 라이브러리의 핵심은 `불변성에 신경 쓰지 않는 것처럼 코드를 작성하되 불변성 관리는 해주는 것` 이다. 

단순히 깊은곳에 위치하는 값을 바꾸는 것 외에 배열을 처리할때도 매우 쉽고 편리하다. 다음 코드는 더 복잡한 데이터를 불변성을 유지하면서 

업데이트하는 예시코드이다.



```react
import produce from 'immer';

const originalState= [
  {
    id:1,
    todo: '전개 연산자와 배열 내장 함수로 불변성 유지하기',
    checked: true,
  }, 
  {
    id:2,
    todo: 'immer로 불변성 유지하기',
    checked: false,
  }
];

const nextState= produce(originalState, draft => {
  //id가 2인 항목의 checked 값을 true로 설정
  const todo= draft.find(t => t.id ===2); //id로 항목 찾기
  todo.checked= true;
  //혹은 draft[1].checked=true;
  
  //배열에 새로운 데이터 추가
  draft.push({
    id:3,
    todo: '일정 관리 앱에 immer 적용허기',
    checked: false,
  });
  
  //id=1인 항목을 제거하기
  draft.splice(draft.findIndex(t => t.id ===1),1);
});

```

### App 컴포넌트에 immer wjrdydgkrl

방금 만든 App컴포넌트에 `immer` 를 적용하여 더 깔끔한 코드로 상태를 업데이트해보자.

```react
import React, {useRef, useCallback, useState} from 'react';
import produce from 'immer';

const App= ()=>{
  const nextId=useRef(1);
  const [form, setForm] = useState({name: '', username:''});
  const [data, setData] = useState({
    array:[],
    uselessValue:null
  });

  //input 수정을 위한 함수
  const onChange= useCallback(
    e =>{
      const {name, value} = e.target;
      setForm(
        produce(form, draft =>{
          draft[name]= value;
        })
      );
    },
    [form]
  );

  // form 등록을 위한 함수
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const info = {
        id:nextId.current,
        name: form.name,
        username: form.username
      };

      //array에 새 항목 등록
      setData(
       produce(data, draft => {
         draft.array.push(info);
       }) 
      );

      // form 초기ㅏ화
      setForm({
        name:'',
        username:''
      });
      nextId.current+=1;
    },
    [data, form.name, form.username]
  );

  // 항목을 삭제하는 함수
  const onRemove= useCallback(
    id => {
      setData(
        produce(data, draft =>{
          draft.array.splice(draft.array.findIndex(info => info.id === id),1);
        })
      );
    },
    [data]
  );
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={onChange}
            />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
          />
        <button type="submit">등록</button>  
      </form>
      <div>
        <ul>
          {data.array.map(info => (
            <li key={info.id} onClick={()=> onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default App;
```

`immer` 를 사용하여 컴포넌트 상태를 작성할 때는 객체안에 있는 값을 직접 수정하거나, 배열에 직접적인 변화를 일으키는 push, splice 등의

함수를 사용해도 무방하다. 그렇기 때문에 불변성 유지에 익숙하지 않아도 자바스크립트에 익숙하다면 컴포넌트 상태에 원하는 변화를 쉽게 반영시킬 수 있다.

`immer` 를 사용한다고 해서 무조건 코드가 간결해지지 않는다. onRemove의 경우에는 배열 내장함수 `filter` 를 사용하는 것이 코드가 더 깔끔하므로

굳이 `immer` 를 적용할 필요가없다. `immer` 는 불변성을 유지하는 코드가 복잡할 때만 사용해도 충분하다.

### useState의 함수형 업데이트와 immer 함께 쓰기

11장에서 `useState` 의 함수형 업데이트에 대해 알아보았다.

```react
const [number, setNumber] = useState(0);
//prevNumbers 는 현재 number 값을 가리킵니다.
const onIncrease = useCallback (
	()=>setNumber(prevNumber => prevNumber+1),
  [],
);
```

`immer` 에서 제공하는 produce 함수를 호출할 때, 첫번째 파라미터가 함수형태라면 업데이트 함수를 반환한다

```react
const update = produce(draft => {
  draft.value=2;
});

const originalState = {
  value:1,
  foo: 'bar',
};

const nextState = update(originalState);
console.log(nextState) // {value: 2, foo: 'bar'}
```

이러한 `immer` 속성과 `useState` 의 함수형 업데이트를 함께 활용하면 코드를 더욱 깔끔하게 만들 수 있다. App.js를 다음과 같이 수정해보자

```react
import React, {useRef, useCallback, useState} from 'react';
import produce from 'immer';

const App= ()=>{
  const nextId=useRef(1);
  const [form, setForm] = useState({name: '', username:''});
  const [data, setData] = useState({
    array:[],
    uselessValue:null
  });

  //input 수정을 위한 함수
  const onChange= useCallback(
    e =>{
      const {name, value} = e.target;
      setForm(
        produce(draft =>{
          draft[name]= value;
        })
      );
    },
    [form]
  );

  // form 등록을 위한 함수
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const info = {
        id:nextId.current,
        name: form.name,
        username: form.username
      };

      //array에 새 항목 등록
      setData(
       produce(draft => {
         draft.array.push(info);
       }) 
      );

      // form 초기ㅏ화
      setForm({
        name:'',
        username:''
      });
      nextId.current+=1;
    },
    [data, form.name, form.username]
  );

  // 항목을 삭제하는 함수
  const onRemove= useCallback(
    id => {
      setData(
        produce(draft =>{
          draft.array.splice(draft.array.findIndex(info => info.id === id),1);
        })
      );
    },
    [data]
  );
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={onChange}
            />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
          />
        <button type="submit">등록</button>  
      </form>
      <div>
        <ul>
          {data.array.map(info => (
            <li key={info.id} onClick={()=> onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default App;
```



# 정리

`immer` 에 대해 알아보았다. 이 라이브러리는 컴포넌트의 상태 업데이트가 조금 까다로울 때 사용하면 매우 좋다. 추후 상태 관리 라이브러리인 리덕스를

배워서 사용할 때도 `immer` 를 쓰면 코드를 매우 쉽게 작성할 수 있다. 이러한 라이브러리는 편의를 위한것이므로 꼭 필요하지는 않지만 사용한다면

생산성을 크게 높일 수 있다.
