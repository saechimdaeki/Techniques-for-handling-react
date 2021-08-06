# 14장 외부 API를 연동하여 뉴스 뷰어 만들기

## 비동기 작업의 이해

웹 애플리케이션을 만들다 봄녀 처리할 때 시간이 걸리는 작업이 있다. 예를 들어 웹 애플리케이션에서 서버 쪽 데이터가 필요할 때는 Ajax 기법을 사용하여

서버의 API를 호출함으로써 데이터를 수신한다. 이렇게 서버의 API를 사용할 때는 네트워크 송수신 과정에서 시간이 걸리기 때문에 작업이 즉시 처리되는 

것이 아니라 응답을 받을 때까지 기다렸다가 전달받은 응답데이터를 처리한다. 이 과정에서 해당 작업을 비동기적으로 처리하게 된다

만약 작업을 동기적으로 처리한다면 요청이 끝날 때까지 기다리는 동안 중지 상태가 되기 때문에 다른 작업을 할 수 없다. 그리고 요청이 끝나야 비로소

그다음 예정된 작업을 할 수 있다. 하지만 이를 비동기적으로 처리한다면 웹 애플리케이션이 멈추지 않기때문에 동시에 여러가지 요청을 처리할 수 있고

기다리는 과정에서 다른 함수도 호출할 수있다. 이렇게 서버 API를 호출할 때 외에도 작업을 비동기적으로 처리할 때가 있는데, 바로 `setTimeout` 함수를

사용하여 특정 작업을 예약할 때이다. 예를들어 다음 코드는 3초 후에 printMe함수를 호출한다

```react
function printMe(){
  console.log('Hello World!');
}

setTimeout(printMe, 3000);
console.log('대기 중...');
```

자바스크립트에서 비동기 작업을 할 때 가장 흔히 사용하는 방법은 콜백 함수를 사용하는 것이다. 위 코드에서는 printMe가 3초 뒤에 호출되도록 printMe함수 자체를 `setTimeout`

함수의 인자로 전달해 주었는데, 이런 함수를 콜백 함수라고 부른다.

### 콜백함수

이번에는 다른 코드를 확인해보자. 예를들어 파라미터 값이 주어지면 1 초뒤에 10을 더해서 반환하는 함수가 있다고 하자. 그리고 해당 함수가 처리된 직후 어떠한 작업을 하고싶다면

다음과 같이 콜백 함수를 활용해서 작업한다

```react
function increate(number, callback){
  setTimeout(()=>{
    const reuslt=number+ 10;
    if(callback){
      callback(result);
    }
  },1000)
}
increase(0, result =>{
  console.log(result);
});
```

1초에 걸쳐서 10,20,30,40 과 같은 형태로 여러 번순차적으로 처리하고 싶다면 콜백함수를 중첩하여 구현할 수 있다.

```react
function increase(number, callback){
  setTimeout(()=>{
    const result= number+10;
    if(callback){
      callback(result);
    }
  },1000);
}

console.log('작업 시작');
increase(0,result =>{
	console.log(result);
	increate(result, result =>{
    	console.log(result);
    	increase(result, result => {
        console.log(result);
        increase(result, result => {
          console.log(result);
          console.log('작업 완료');
        });
      });
  });
}) ;
```

```markdown
## 실행결과
작업시작
10
20
30
40
작업 완료
```

### Promise

`Promise` 는 콜백 지옥 같은 코드가 형성되지 않게 하는 방안으로 ES6에 도입된 기능이다. 앞에서 본 코드를 `Promise` 를 사용해 구현해보자.

```react
function increase(number){
  const promise = new Promise((resolve, reject) =>{
    //resolve는 성공, reject는 실패
    setTimeout(()=>{
      const result=number+10;
      if(result > 50){
        //50보다 높으면 에러 발생시키기
        const e = new Error('NumbewrTooBig');
        return reject(e);
      }
      resolve(result); //number 값에 +10 후 성공 처리
    },1000);
  });
  return promise;
}

increase(0)
	.then(number = > {
  //Promise에서 resolve된 값은 .then을 통해 받아 올 수 있음
  console.log(number);
	return increase(number);
})
.then(number => {
  //또 .then 으로 처리 가능
  console.log(number);
  return increase(number);
})
.then(number => {
  console.log(number);
  return increase(number);
})
.then(number => {
  console.log(number);
  return increase(number);
})
.then(number => {
  console.log(number);
  return increase(number);
})
.catch(e => {
  //도중에 에러가 발생한다면 .catch를 통해 알 수 있음
  console.log(e);
});
```

여러 작업을 연달아 처리한다고 해서 함수를 여러번 감싸는 것이 아니라 `.then` 을 사용하여 그 다음 작업을 설정하기 때문에 콜백 지옥이 형성되지 않습니다

### async/await

`async/await` 는 `Promise` 를 더욱 쉽게 사용할 수 있도록 해주는 ES2017(ES8) 문법이다. 이 문법을 사용하려면 함수의 앞부분에 `async` 키워드를 추가하고, 해당 함수 내부에서

`Promise` 의 앞부분에 `await` 키워드를 사용한다. 이렇게 하면 `Promise` 가 끝날때까지 기다리고, 결과 값을 특정 변수에 담을 수 있다.

```react
function increase(number){
  const promise = new Promise((resolve , reject) => {
    //resolve는 성공, reject는 실패
    setTimeout(() => {
      const result= number + 10;
      if (result > 50){ //50보다 높으면 에러 발생시키기
        const e =new Error('NumberTooBig');
        	return reject(e);
      }
      resolve(result); //number 값에 + 10 후 성공 처리
    },1000)
  });
  return promise;
}

async function runTasks(){
  try{  //try/catch 구문을 사용하여 에러를 처리한다
    let result= await increase(0);
    console.log(result);
    result= await increase(result);
    console.log(result);
    result= await increase(result);
    console.log(result);
    result= await increase(result);
    console.log(result);
    result= await increase(result);
    console.log(result);
    result= await increase(result);
    console.log(result);
  }catch(e){
    console.log(e);
  }
}
```

## axios로 API 호출해서 데이터 받아오기

`axios` 는 현재 가장 많이 사용되고 있는 자바스크립트 HTTP 클라이언트입니다. 이 라이브러리의 특징은 HTTP요청을 `Promise` 기반으로 처리한다는 점이다.

```bash
$ yarn create react-app chap14
$ cd chap14
$ yarn add axios
```

이제 App.js 코드를 다음과 같이 작성해보자

```react
import React, {useState} from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = () =>{
    axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
      setData(response.data);
    });
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && <textarea rows={7} value={JSON.stringify(data,null,2)} readOnly={true}/>}
    </div>
  )
}

export default App;
```

위 코드는 불러오기 버튼을 누르면 https://jsonplaceholder.typicode.com 에서 제공하는 가짜 APi를 호출하고 이에 대한 응답을 컴포넌트 상태에 넣어 보여주는 예제이다.

![image](https://user-images.githubusercontent.com/40031858/128346667-0d53b0a7-2490-43a8-bc1d-21002165dbba.png)

onClick 함수에서는 `axios.get` 함수를 사용했다. 이 함수는 파라미터로 전달된 주소에 GET 요청을 해준다. 그리고 이에 대한 결과는 `.then` 을 통해 비동기적으로 확인할 수 있다.

위 코드에 `async` 를 적용하면 어떨까?

```react
import React, {useState} from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try{
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1',
      );
      setData(response.data);
    }catch (e){
      console.log(e);
    }
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && <textarea rows={7} value={JSON.stringify(data,null,2)} readOnly={true}/>}
    </div>
  )
}

export default App;
```

화살표 함수에 `async/await` 를 적용할 때는 `async () => {}` 와 같은 형식으로 적용한다.

## newsAPI

사용할 API주소는 두가지 형태이다

1. 전체 뉴스 불러오기

   GET https://newsapi.org/v2/top-headlines?**country=kr**&apiKey=2928823ef04e401cbb3dffa921ecd355

2. 특정 카테고리 뉴스 불러오기

   GET https://newsapi.org/v2/top-headlines?**country=kr**&**category=business**&apiKey=2928823ef04e401cbb3dffa921ecd355

이제 기존 리액트 프로젝트에서 사용했던 JSONPlaceholder 가짜 API를 전체 뉴스를 불러오는 API로 대체해보자.

```react
import React, {useState} from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try{
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=kr&apiKey=2928823ef04e401cbb3dffa921ecd355'
      );
      setData(response.data);
    }catch (e){
      console.log(e);
    }
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && <textarea rows={7} value={JSON.stringify(data,null,2)} readOnly={true}/>}
    </div>
  )
}

export default App;
```

![image](https://user-images.githubusercontent.com/40031858/128348153-f2169e8f-e9fe-460f-9045-0eec6b3ea9e2.png)

## 뉴스 뷰어 만들기

styled-components 를 사용하여 뉴스 정보를 보여 줄 컴포넌트를 만들어보자. 우선 styled-components를 설치하자

```bash
$ yarn add styled-components
```

그리고 components 디렉토리를 생성후 그안에 NewsItem.js와 NewsList.js 파일을 생성하자. NewsItem은 각 뉴스 정보를 보여주는 컴포넌트이고, NewsList는 API를

요청하고 뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환하여 렌더링해 주는 컴ㅍ포넌트이다

### NewsItem만들기

먼저 위의 첨부 사진을 보면 각 뉴스 데이터가 가지고있는 정보의 형식을 알 수 있다. 그중 다음 필드를 리액트 컴포넌트에 나타내자

- `title` : 제목
- `description` : 내용
- `url` : 링크
- `urlToImage` : 뉴스 이미지

NewsItem 컴포넌트는 article이라는 객체를 `props` 로 통째로 받아와서 사용한다. NewsItem 컴포넌트를 다음과 같이 작성하자

```react
import React from 'react';
import styled from 'styled-components';

const NewsItemBlock = styled.div`
  display: flex;
  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;
    }
  }
  .contents {
    h2 {
      margin: 0;
      a {
        color: black;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  & + & {
    margin-top: 3rem;
  }
`;

const NewsItem = ({article}) => {
    const {title, description, url , urlToImage} = article;
    return (
        <NewsItemBlock>
            {urlToImage && (
                <div className="thumbnail">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <img src={urlToImage} alt="thumbnail" />
                    </a>
                </div>
            )}
            <div className="contents">
                <h2>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </h2>
                <p>{description}</p>
            </div>
        </NewsItemBlock>
    );
};

export default NewsItem;

```



### NewsList 만들기

이번에는 NewsList 컴포넌트를 만들자. 나중에 이 컴포넌트에서 API를 요청하게 될텐데 지금은 아직 데이터를 불러오지 않고 있으니 sampleArticle이라는 객체에

미리 예시 데이터를 넣은후 각 컴포넌트에 전달하여 가짜 내용이 보이게 해보자. 

```react
import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const sampleArticle = {
    title: '제목 ',
    description: '내용',
    url: 'https://google.com',
    urlToImage: 'https://via.placeholder.com/160',
};

const NewsList = () => {
    return (
        <NewsListBlock>
            <NewsItem article={sampleArticle}/>
            <NewsItem article={sampleArticle}/>
            <NewsItem article={sampleArticle}/>
            <NewsItem article={sampleArticle}/>
            <NewsItem article={sampleArticle}/>
            <NewsItem article={sampleArticle}/>
        </NewsListBlock>
    )
}

export default NewsList;
```

그 후에 App컴포넌트를 다음과 같이 작성해보자

```react
import React from 'react';
import NewsList from './components/NewsList';

const App = () => {
  return <NewsList/>;
}

export default App;
```

![image](https://user-images.githubusercontent.com/40031858/128351954-63baa82d-3cf4-4052-832f-584cab4d79dd.png)

## 데이터 연동하기

이제 NewsList 컴포넌트에서 이전에 연습 삼아 사용했던 API를 호출해보자. 컴포넌트가 화면에 보이는 시점에 API를 요청할 것이고 이때 `useEffect` 를 사용해 컴포넌트가 

맨 처음 렌더링되는 시점에 API를 요청하면된다. 여기서 주의할 점은 `useEffect` 에 등록하는 함수에 `async`를 붙이면 안된다는 것이다.

`useEffect` 에서 반환해야 하는 값은 뒷정리 함수이기 때문이다 따라서 `useEffect` 내부에서 `async/await` 를 사용하고 싶다면, 함수 내부에 `async` 키워드가 붙은 또

다른 함수를 만들어서 사용해 주어야한다.

![image](https://user-images.githubusercontent.com/40031858/128354944-eea73390-f2f1-4447-b3ba-588af2bf016c.png)

데이터를 불러와서 뉴스 데이터 배열을 map함수를 사용하여 컴포넌트 배열로 변환할 때 신경써야 할 부분이 있다. map 함수를 사용하기 전 꼭 !articles를 조회하여 해당 값이 현재

null이 아닌지 검사해야한다. 이 작업을 하지 않으면, 아직 데이터가 없을때 null 에는 map함수가 없기때문에 렌더링 과정에서 오류가 발생한다. 그래서 애플리케이션이 제대로 나타나

지 않고 흰 페이지만 보이게된다.

## 카테고리 기능 구현하기

뉴스의 카테고리 선택기능을 구현해보자. 뉴스 카테고리는 총 여섯 개이며, 다음과 같이 영어로 되어있다.

- business(비즈니스) 
- science(과학)
- entertainment(연예)
- sports(스포츠)
- health(건강)
- technology(기술)

### 카테고리 선택 UI만들기

components디렉토리에 Categories.js 컴포넌트 파일을 생성해 다음코드를 작성하자

```react
import React from 'react';
import styled from 'styled-components';

const categories = [
    {
        name: 'all',
        text: '전체보기'
    },
    {
        name: 'business',
        text:'비즈니스'
    },
    {
        name:'entertainment',
        text:'엔터테인먼트'
    },
    {
        name:'health',
        text:'건강'
    },
    {
        name:'science',
        text:'과학'
    },
    {
        name:'sports',
        text:'스포츠'
    },
    {
        name:'technology',
        text:'기술'
    }
];


const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled.div`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;
  &:hover {
    color: #495057;
  }
  &.active {
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }
  & + & {
    margin-left: 1rem;
  }
`;

const Categories = () =>{
    return (
        <CategoriesBlock>
            {categories.map(c => (
                <Category key={c.name} >{c.text}</Category>
            ))}
        </CategoriesBlock>
    );
};

export default Categories;
```

이제 이 컴포넌트를 App에서 NewsList컴포넌트 상단에 렌더링하자.

```
import React from 'react';
import NewsList from './components/NewsList';
import Categories from './components/Categories';

const App = () => {

  return (
  <>
  <Categories/>
  <NewsList/>
  </>
  );
}

export default App;
```

![image](https://user-images.githubusercontent.com/40031858/128434524-d3b73bef-f21b-4ea8-9519-573716077847.png)

이제 App에서 category 상태를 `useState` 로 관리하겠다. 추가로 category 값을 업데이트하는 onSelect라는 함수도 만들겠다. 그러고 나서 category와 

onSelect 함수를 Categories 컴포넌트에게  `props` 로 전달해주자. 

```react
import React, {useState,useCallback} from 'react';
import NewsList from './components/NewsList';
import Categories from './components/Categories';

const App = () => {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback(category => setCategory(category), []);
  return (
  <>
  <Categories category={category} onSelect={onselect}/>
  <NewsList category={category}/>
  </>
  );
}

export default App;
```



다음으로 Categories에서는 `props` 로 전달받은 onSelect를 각 Category 컴포넌트의 onClick으로 설정하고, 현재 선택된 카테고리 값에 따라 다른스타일을 적용해보자.

```react
import React from 'react';
import styled, {css} from 'styled-components';

const categories = [
    {
        name: 'all',
        text: '전체보기'
    },
    {
        name: 'business',
        text:'비즈니스'
    },
    {
        name:'entertainment',
        text:'엔터테인먼트'
    },
    {
        name:'health',
        text:'건강'
    },
    {
        name:'science',
        text:'과학'
    },
    {
        name:'sports',
        text:'스포츠'
    },
    {
        name:'technology',
        text:'기술'
    }
];


const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled.div`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;
  &:hover {
    color: #495057;
  }
  ${props =>
    props.active && css`
        font-weight: 600;
        border-bottom: 2px solid #22b8cf;
        color: #22b8cf; 
        &:hover {
            color: #3bc9db;
        }`
    }
  & + & {
    margin-left: 1rem;
  }
`;

const Categories = ({onSelect, category}) =>{
    return (
        <CategoriesBlock>
            {categories.map(c => (
                <Category 
                    key={c.name}
                    active={category === c.name}
                    onClick={() => onSelect(c.name)}
                >{c.text}
                </Category>
            ))}
        </CategoriesBlock>
    );
};

export default Categories;
```

![image](https://user-images.githubusercontent.com/40031858/128435202-d5a6cc39-5a8b-4dc3-9a7f-af98d94f98d9.png)

이제 다음과 같이 선택된 카테고리가 청록색으로 보인다. 

### API를 호출할 때 카테고리 지정하기

지금은 뉴스 API를 요청할 때 따로 카테고리를 선택하지 않고 뉴스목록을 불러오고 있다. NewsList컴포넌트에서 현재 `props` 로 받아온 category에 따라 카테고리를

지정하여 API를 요청하도록 구현해보자.

```react
import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({category}) => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect (() => {
        // async를 사용한ㄴ 함수 따로 선언
        const fetchData = async () => {
            setLoading(true);
            try{
                const query = category === 'all' ? '' : `&category=${category}`;
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=2928823ef04e401cbb3dffa921ecd355`,
                );
                setArticles(response.data.articles);
            }catch(e){
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    },[category]);

    //대기 중일 때
    if(loading){
        return <NewsListBlock>대기 중...</NewsListBlock>
    }
    // 아직 articles 값이 설정되지 않았을 때
    if(!articles){
        return null;
    }

    // articles 값이 유효할 때
    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article}/>
            ))}
        </NewsListBlock>
    )
}

export default NewsList;
```

현재 category 값이 무엇인지에 따라 요청할 주소가 동적으로 바뀌고 있다. category 값이 all이면 query값을 공백으로 설정하고 all이 아니면 `&category=카테고리` 형태의 문자열을

만들도록 했고 이 query를 요청할때 주소에 포함시켜 주었다.

추가로 category값이 바뀔때 마다 뉴스를 새로 불러와야 하기 때문에 `useEffect` 의 의존배열(두번째 파라미터로 설정하는 배열)에 category를 넣어주어야 한다

만약 이 컴포넌트를 클래스형 컴포넌트로 만들게 된다면 `componentDidMount` 와 `componentDidUpdate` 에서 요청을 시작하도록 설정해 주어야 한다. 

함수형 컴포넌트라면 이렇게 `useEffect` 한번으로 컴포넌트가 맨 처음 렌더링 될 때 , 그리고  category값이 바뀔때 요청하도록 설정해 줄 수 있다.

![image](https://user-images.githubusercontent.com/40031858/128436173-f6303d7d-732f-4594-a06a-d04541d81b2a.png)

## 리액트 라우터 적용하기

이제 리액트 라우터를 적용해보자 기존에는 카테고리 값을 `useState` 로 관리했는데 이번에는 리액트 라우터로  URL 파라미터를 사용해 관리해보겠다.

### 리액트 라우터의 설치 및 적용

```bash
$ yarn add react-router-dom
```

그리고 index.js 에서 리액트 라우터를 적용하자

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

```

### NewsPage 생성

이제 src 디렉토리에 pages라는 디렉토리를 생성후 그안에  NewsPage.js파일을 다음과 같이 만들자

```react
import React from 'react';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';

const NewsPage = ({match}) => {
    //카테고리가 선택되지 않았으면 기본값 all로 사용
    const category = match.params.category || 'all';

    return (
        <>
            <Categories/>
            <NewsList category={category}/>
        </>
    )
}

export default NewsPage;
```



현재 선택된 category 값을 URL 파라미터를 통해 사용할 것이므로 Categories 컴포넌트에서 현재 선택된 카테고리 값을 알려 줄 필요도 없고, onSelect 함수를 따로 전달해 줄 

필요도 없다. App.js의 내용을 다음과 같이 변경하자

```react
import React from 'react';
import {Route} from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
  
  return <Route path="/:category?" component={NewsPage}/>
  
}

export default App;
```

위 코드에 사용된 path에 /:category? 와 같은 형태로 맨 뒤에 물음표 문자가 들어가 있는데 이는 category 값이 선택적(optional) 이라는 의미이다. 즉 , 있을 수 도 있고 

없을 수 도 있다는 뜻이다.  category URL 파라미터가 없다면 전체 카테고리를 선택한 것으로 간주한다.



### Categories 에서  NavLink 사용하기

이제 Categories에서 기존의 onSelect 함수를 호출해 카테고리를 선택하고, 선택된 카테고리에 다른 스타일을 주는 기능을 NavLink로 대체해 보겠다. 

```react
import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const categories = [
    {
        name: 'all',
        text: '전체보기'
    },
    {
        name: 'business',
        text:'비즈니스'
    },
    {
        name:'entertainment',
        text:'엔터테인먼트'
    },
    {
        name:'health',
        text:'건강'
    },
    {
        name:'science',
        text:'과학'
    },
    {
        name:'sports',
        text:'스포츠'
    },
    {
        name:'technology',
        text:'기술'
    }
];


const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled(NavLink)`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;
  &:hover {
    color: #495057;
  }
  &.active {
      font-weight: 600;
      border-bottom: 2px solid #22b8cf;
      color: #22b8cf;
      &:hover {
          color: #3bc9db;
      }
  }

  & + & {
    margin-left: 1rem;
  }
`;

const Categories = ({onSelect, category}) =>{
    return (
        <CategoriesBlock>
            {categories.map(c => (
                <Category 
                    key={c.name}
                    activeClassName="active"
                    exact={c.name === 'all'}
                    to={c.name === 'all' ? '/' : `/${c.name}`}
                >{c.text}
                </Category>
            ))}
        </CategoriesBlock>
    );
};

export default Categories;
```

NavLink 로 만들어진  Category 컴포넌트에 to 값은 "/카테고리이름" 으로 설정해 주었다. 그리고 카테고리 중에서 전체보기의 경우는 예외적으로 "/all" 대신 "/"로 설정.

to 값이 "/" 를 가리키고 있을때는 exact 값을  true로 해주어야 한다. 이 값을 설정하지 않으면 다른 카테고리가 선택되었을 때도 전체보기 링크에  active 스타일이 적용되는 오류가 발생한다.

## usePromise 커스텀 Hook 만들기 

이번에는 컴포넌트에서  API 호출처럼  `Promise` 를 사용해야 하는 경우 더욱 간결하게 코드를 작성할 수 있도록 해주는 커스텀  Hook을 만들어서 적용해보자.

src디렉토리에 lib 디렉토리를 만들고 그안에  usePromise.js를 작성하자

```react
import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
  // 로딩중 / 완료 / 실패에 대한 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, error];
}
```

방금 만든 usePromise Hook은 Promise의 대기 중, 완료 결과, 실패 결과에 대한 상태를 관리하며, usePromise의 의존배열 deps를 파라미터로 받아온다. 파라미터로 받아 온

deps 배열은 usePromise내부에서 사용한 useEffect의 의존배열로 설정된다. 이제 NewsList 컴포넌트에 usePromise를 사용해보자

```react
import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({category}) => {
    const [loading, response, error] = usePromise(() => {
        const query= category === 'all' ? '' : `&category=${category}`;
        return axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=2928823ef04e401cbb3dffa921ecd355`,
        );  
    },[category]);

    //대기 중일 때
    if(loading){
        return <NewsListBlock>대기 중...</NewsListBlock>
    }
    
    // 아직 response 값이 설정되지 않았을때
    if(!response){
        return null;
    }

    //에러가 발생했을때
    if(error){
        return <NewsListBlock>에러 발생!</NewsListBlock>
    }

    // response 값이 유효할때
    const {articles} = response.data;
    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article}/>
            ))}
        </NewsListBlock>
    )
}

export default NewsList;
```

usePromise를 사용하면 NewsList에서 대기 중 상태 관리와 useEffect 설정을 직접 하지 않아도 되므로 코드가 훨씬 간결해진다. 요청 상태를 관리할 때 무조건 커스텀Hook을

만들어서 사용해야 하는 것은 아니지만, 상황에 따라 적절히 사용하면 좋은 코드를 만들어 갈 수 있다.

## 정리

이 장에서는 외부  API를 연동하여 사용하는 방법을 알아보고 실제 프로젝트를 개발해 보았다. 리액트 컴포넌트에 API를 연동하여 갭라할 때 절대 잊지 말아야 할 유의 사항은

`useEffect` 에 등록하는 함수는 `async` 로 작성하면 안된다는 점이다. 그 대신 함수 내부에 `async` 함수를 따로 만들어 주어야 한다.

지금은 usePromise 라는 커스텀 Hook을 만들어 사용함으로써 코드가 간결해지긴 했지만 나중에 API의 종류가 많아지면 요청을 위한 상태관리를 하는 것이 번거로워 질 수 

있다. 뒤에 나올 리덕스와 리덕스 미들웨어를 배우면 좀 더 쉽게 요청에 대한 상태를 관리할 수 있다.

