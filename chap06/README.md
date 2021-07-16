# 6장 컴포넌트 반복



웹 애플리케이션을 만들다 보면 다음과 같이 반복되는 코드를 작성할 때가 있다. InterationSample.js라는 파일을 작성해서 다음 코드를 적어보자.

```react
import React from 'react';

const IterationSample =()=>{
    return (
        <ul>
            <li>눈사람</li>
            <li>얼음</li>
            <li>sns</li>
            <li>바람</li>
        </ul>
    );
};

export default IterationSample;
```

코드에서 다음 형태가 계속 반복되는 것을 볼 수 있다.

<code> <li> ...  </li></code>

지금은 `li` 태그 하나뿐이라 그렇게 문제가 되지는 않을 것 같다. 하지만 코드가 좀더 복잡하다면? 코드양은 더욱 늘어날 것이며 파일용량도 쓸데없이 증가할 것이다.

이는 낭비이다. 또 보여주어야 할 데이터가 유동적이라면 이런 코드로는 절대로 관리하지 못한다. 이제 리액트에서 반복적인 내용을 효율적으로 보여주고 관리하는 방법을 알아보자

## 자바스크립트 배열의 map() 함수

자바스크립트 배열 객체의 내장 함수인 `map` 함수를 사용해 반복되는 컴포넌트를 렌더링 할 수 있다. `map` 함수는 파라미터로 전달된 함수를 사용해 배열 내 각

요소를 원하는 규칙에 따라 변환한 후 그 결과로 새로운 배열을 생성한다

### 문법

<code>arr.map(callback, [thisArg])</code>

이 함수의 파라미터는 다음과 같다

- `callback` : 새로운 배열의 요소를 생성하는 함수로 파라미터는 다음 세가지다.
  - `currentValue` : 현재 처리하고 있는 요소
  - `index`: 현재 처리하고 있는 요소의 index 값
  - `array` : 현재 처리하고 있는 원본 배열
- `thisArg(선택 항목)` : callback 함수 내부에서 사용할 this 레퍼런스

### 예제

`map` 함수를 사용해 배열 [1,2,3,4,5] 의 각 요소를 제곱해서 새로운 배열을 생성해보자

```javascript
var numbers=[1,2,3,4,5];

var processed = number.map(function(num){
  return num*num;
});

console.log(processed);
```

이처럼 `map` 함수는 기존 배열로 새로운 배열을 만드는 역할을 한다. 이 코드를 ES6 문법으로 작성해보자.

```react
const numbers= [1,2,3,4,5];
const result=numbers.map(num=>num*num);
console.log(result);
```

var 키워드 대신 const를 사용했고 function(...){...} 대신 화살표함수를 사용했다.



## 데이터 배열을 컴포넌트 배열로 변환하기

기존에 만들었던 IterationSample 컴포넌트를 다음과 같이 수정해보자

```react
import React from 'react';

const IterationSample =()=>{
    const names=['눈사람','얼음','눈','바람'];
    const nameList= names.map(name => <li>{name}</li>)
    return <ul>{nameList}</ul>
};

export default IterationSample;
```

문자열로 구성된 배열을 선언한다. 그 배열 값을 이용하여 <code><li>...</li></code> JSX 코드로 된 배열을 새로 생성한 후 nameList에 담습니다.

map함수에서 JSX를 작성할 때는 앞서 다룬 예제처럼 DOM 요소를 작성해도 되고 컴포넌트를 사용해도 된다.

하지만 이렇게 실행하면 원하는대로 렌덜링은 되지만 아직 완벽하지 않다. 크롬 개발자 도구의 콘솔을 한번 열어보면 `"key"prop` 이 없다고 경고메시지를 표시한다

## key

리액트에서 `key` 는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용한다. 예를 들어 유동적인 데이터를 다룰 때는 원소를

새로 생성할 수도, 제거할 수도, 수정할 수도있다. `key` 가 없을때는 Virtual DOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 감지한다

하지만 `key` 가 있다면 이 값을 사용하여 어떤 변화가 일어났는지 더욱 빠르게 알아 낼 수 있다.

### key 설정

`key` 값을 설정할 때는 `map` 함수의 인자로 전달되는 함수 내부에서 컴포넌트 `props` 를 설정하듯이 설정하면 된다. `key` 값은 언제나 유일해야한다.

따라서 데이터가 가진 고윳값을 `key` 값으로 설정해야한다. 예를들어 다음과 같이 게시판의 게시물을 렌더링 한다면 게시물 번호를 `key` 값으로 설정해야한다

```javascript
const articleList = articles.map(article => (
		<Article 
  		title={article.title}
      writer={article.writer}
			key={article.id}
    />          
))
```

하지만 앞서 만들었던 예제 컴포넌트에는 이런 고유번호가 없다. 이때는 `map` 함수에 전달되는 콜백 함수의 인수인 `index` 를 사용하면 된다

```react
import React from 'react';

const IterationSample =()=>{
    const names=['눈사람','얼음','눈','바람'];
    const nameList=names.map((name,index) => <li key={index}>{name}</li>)
    return <ul>{nameList}</ul>
};

export default IterationSample;
```

이렇게하면 개발자 도구에서 더이상 경고 메시지를 표시하지 않는다. 고유한 값이 없을 때만 `index` 값을 `key` 로 사용해야한다. 

`index` 를 `key` 로 사용하면 배열이 변경될 때 효율적으로 리렌더링하지 못한다.

## 응용

지금까지 배운 개념을 응용하여 고정된 배열을 렌더링 하는 것이 아닌, 동적인 배열을 렌더링 하는 것을 구현해 보자. 그리고 `index` 값을 `key` 로

사용하면 리렌더링이 비효율적이라고 배웠는데, 이러한 상황에 어떻게 고윳값을 만들 수 있는지 알아보자.

### 초기 상태 설정하기

IterationSample 컴포넌트에서 `useState` 를 사용하여 상태를 설정하겠다. 세가지 상태를 사용할 텐데 하나는 데이터 배열이고 다른하나는 텍스트를

입력할 수 있는 `input` 의  상태이다.  마지막 하나는 데이터 배열에서 새로운 항목을 추가할 때 사용할 고유 `id` 를 위한 상태이다.

배열을 설정할 때 , 조금전에는 단순히 문자열로 이루어진 배열을 만들었지만, 이번에는 객체 형태로 이루어진 배열을 만들자. 해당객체에는 문자열과 고유 `id` 값이 있다.

```react
import React, {useState} from 'react';

const IterationSample =()=>{
    const [names, setNames]= useState([
        {id:1,text:'눈사람'},
        {id:2 ,text:'얼음'},
        {id:3,text:'눈'},
        {id:4, text:'바람'}
    ]);
    const [inputtext, setInputText] = useState('');
    const [nextid,setNextId] = useState(5);

    const namesList=names.map(name => <li key={name.id}>{name.text}</li>)
    return <ul>{namesList}</ul>
};

export default IterationSample;
```

이제 새로운 이름을 등록할 수 있는 기능을 구현해보자. 우선 ul태그의 상단에 input과 button을 렌더링하고 input의 상태를 관리해보자

```react
import React, {useState} from 'react';

const IterationSample =()=>{
    const [names, setNames]= useState([
        {id:1,text:'눈사람'},
        {id:2 ,text:'얼음'},
        {id:3,text:'눈'},
        {id:4, text:'바람'}
    ]);
    const [inputText, setInputText] = useState('');
    const [nextid,setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id
    
    const onChange = e=>setInputText(e.target.value);
    const onClick= () => {
        const nextNames=names.concat({
            id:nextid,
            text:inputText
        });
        setNextId(nextid+1); // nextId 값에 1을 더해준다
        setNames(nextNames); //names 값을 업데이트한다
        setInputText(''); //inputText를 비운다
    };

    const namesList=names.map(name => <li key={name.id}>{name.text}</li>)
    return (
        <>
            <input value={inputText} onChange={onChange}/>
            <button onClick={onClick}>추가</button>
            <ul>{namesList}</ul>
        </>
    )
};

export default IterationSample;
```

배열에 새 항목을 추가할때 배열의 `push` 함수를 사용하지 않고 `concat` 을 사용했는데 `push` 함수는 기존 배열 자체를 변경해 주는 반면, `concat` 은 

새로운 배열을 만들어 준다는 차이점이 있다. 리액트에서 상태를 업데이트할 때는 기존 상태를 그대로 두면서 새로운 값을 상태로 설정해야한다. 

이를 `불변성 유지`라고 하는데 불변성 유지를 해주어야 나중에 리액트 컴포넌트의 성능을 최적화할 수 있다. 

### 데이터 제거 기능 구현하기

이번에는 각 항목을 더블클릭했을 때 해당 항목이 화면에서 사라지는 기능을 구현해보자. 이번에도 마찬가지로 불변성을 유지하면서 업데이트해야한다.

불변성을 유지하면서 배열의 특정 항목을 지울 때는 배열의 내장 함수 `filter` 를 사용한다.

`filter` 를 사용하면 배열에서 특정 조건을 만족하는 원소들만 쉽게 분류할 수 있다. 사용예시를 한번 보자

```javascript
const numbers=[1,2,3,4,5,6];
const biggerThanThree = numbers.filter(number => number> 3);
//결과 : [4, 5, 6]
```

`filter` 함수의 인자에 분류하고 싶은 조건을 반환하는 함수를 넣어주면 쉽게 분류할 수 있다. 이 `filter` 함수를 응용하여 특정 배열에서 특정원소만

제외시킬 수 있다. 예를들어 위 코드에서 본 numbers 배열에서 3만 없애고 싶다면 다음과 같이 하면 된다

```react
const numbers = [1, 2, 3, 4, 5, 6];
const withoutThree = numbers.filter(number => number !==3);
//결과 [1,2,4,5,6]
```

이제 `filter` 함수를 사용해 IterationSample 컴포넌트의 항목 제거 기능을 구현해보자 `HTML` 요소를 더블 클릭했을때 사용하는 이벤트 이름은

`onDoubleClick` 이다. `onRemove` 라는 함수를 만들어 각 `li` 요소에 이벤트를 등록하자

```react
import React, {useState} from 'react';

const IterationSample =()=>{
    const [names, setNames]= useState([
        {id:1,text:'눈사람'},
        {id:2 ,text:'얼음'},
        {id:3,text:'눈'},
        {id:4, text:'바람'}
    ]);
    const [inputText, setInputText] = useState('');
    const [nextid,setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id
    
    const onChange = e=>setInputText(e.target.value);
    const onClick= () => {
        const nextNames=names.concat({
            id:nextid,
            text:inputText
        });
        setNextId(nextid+1); // nextId 값에 1을 더해준다
        setNames(nextNames); //names 값을 업데이트한다
        setInputText(''); //inputText를 비운다
    };

    const onRemove = id=>{
        const nextNames=names.filter(name => name.id !== id);
        setNames(nextNames);
    }


    const namesList=names.map(name => (
        <li key={name.id} onDoubleClick={()=>onRemove(name.id)}>
            {name.text}
        </li>
    ));
    
    return (
        <>
            <input value={inputText} onChange={onChange}/>
            <button onClick={onClick}>추가</button>
            <ul>{namesList}</ul>
        </>
    )
};

export default IterationSample;
```

## 정리

이번 챕터에서는 반복되는 데이털르 렌더링하는 방법을 배우고, 이를 응용하여 유동적인 배열을 다루어 보았다. 컴포넌트 배열을 렌더링할때는 `key` 값설정

에 항상 주의해야 한다. 또 `key` 값은 언제나 유일해야한다. `key` 값이 중복된다면 렌더링 과정에서 오류가 발생한다.

상태 안에서 배열을 변형할 때는 배열에 직접 접근하여 숮어하는 것이 아니라 `concat` , `filter` 등의 배열 내장함수를 사용하여 새로운 배열을 만든후 이를

새로운 상태로 설정해 주어야 한다는것을 명심하자.
