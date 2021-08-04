# 13장 리액트 라우터로 SPA 개발하기

## SPA란? 

`SPA` 는 Single Page Application(싱글 페이지 애플리케이션) 의 약어이다. 말그대로 한 개의 페이지로 이루어진 애플리케이션이라는 의미이다.

기존에는 사용자가 다른 페이지로 이동할 때마다 새로운 html을 받아 오고, 페이지를 로딩할 때마다 서버에서 리소스를 전달받아 해석한 뒤 화면에 보여주었다.

이렇게 사용자에게 보이는 화면은 서버측에서 준비했고 사전에 html파일을 만들어서 제공하거나, 데이터에 따라 유동적인 html을 생성해주는

템플릿 엔진을 사용하기도 했다. 요즘은 웹에서 제공되는 정보가 매우 많기때문에 새로운 화면을 보여 주어야 할 때마다 서버 측에서 모든 뷰를

준비한다면 성능상의 문제가 발생할 수 있다. 예를들면 트래픽이 너무 많이 나올 수 있고 사용자가 몰려 서버에 높은 부하가 걸릴 수 있다. 

그래서 리액트 같은 라이브러리 혹은 프레임워크를 사용하여 뷰 렌더링을 사용자의 브라우저가 담당하도록 하고, 우선 애플리케이션을 브라우저에

불러와서 실행시킨 후에 사용자와의 인터렉션이 발생하면 필요한 부분만 자바스크립트를 사용하여 업데이트해 준다. 만약 새로운 데이터가 필요

하다면 서버 API를 호출하여 필요한 데이터만 새로 불러와 애플리케이션에서 사용할 수도있다.



`싱글페이지`라고 해서 화면이 한종류일까? 꼭 그렇지만은 않다. 예를 들어 블로그를 개발한다면 홈, 포스트목록, 포스트, 글쓰기 등의 화면이 있다.

`SPA` 의 경우 서버에서 사용자에게 제공하는 페이지는 한 종류이지만, 해당 페이지에서 로딩된 자바스크립트와 현재 사용자 브라우저의 주소 상태에

따라 다양한 화면을 보여 줄 수 있다. 다른 주소에 다른 화면을 보여주는 것을 라우팅이라고한다. 리액트 라이브러리 자체에 이 기능이 내장되어

있지는 않다. 그대신 브라우저의 API를 직접 사용하여 이를 관리하거나, 라이브러리를 사용하여 이 작업을 더욱 쉽게 구현할 수 있다.



리액트 라우팅 라이브러리는 리액트 라우터, 리치 라우터, Next.js 등 여러가지가 있다. 이책에서는 사용빈도가 가장 높은 리액트 라우터를 사용하겠다.

리액트 라우터는 클라이언트 사이드에서 이루어지는 라우팅을 아주 간단하게 구현할 수 있도록 해준다. 더 나아가 나중에 서버사이드 렌더링을 할때도

라우팅을 도와주는 컴포넌트들을 제공해준다

### SPA의 단점

`SPA` 의 단점은 앱의 규모가 커지면 자바스크립트 파일이 너무 커진다는 것이다. 페이지 로딩 시 사용자가 실제로 방문하지 않을 수 도 있는 페이지의

스크립트도 불러오기 때문이다.. 하지만 걱정안해도 되는게 나중에 배울 `코드 스플리팅` 을 사용하면 라우트별로 파일들을 나누어서 트래픽과

로딩속도를 개선할 수 있다. 리액트 라우터처럼 브라우저에서 자바스크립트를 사용하여 라우팅을 관리하는 것은 자바스크립트를 실행하지 않는 일반 크롤러

에서는 페이지의 정보를 제대로 수집해 가지 못한다는 잠재적인 단점이 따른다. 그렇기 때문에 구글, 네이버 같은검색 엔진의 검색결과에 페이지가 잘 

나타나지 않을 수도 있다. 또한, 자바스크립트가 실행될 때까지 페이지가 비어있기 때문에 자바스크립트 파일이 로딩되어 실행되는 짧은 시간동안 흰

페이지가 나타날 수 있다는 단점도 있다. 이러한 문제점들은 다행히 나중에 배우게 될 `서버사이드렌더링` 을 통해 모두 해결할 수 있다.

## 프로젝트 준비

우선 리액트 라우터를 적용해 볼 리액트 프로젝트를 새로 생성하자

```bash
$ yarn create react-app chap13
```

그리고 해당 디렉토리로 이동하여 리액트 라우터 라이브러리를 설치하자. 리액트 라우터를 설치할 때는 yarn을 사용하여 react-router-dom이라는 

라이브러리를 설치하면 된다

```bash
$ cd chap13
$ yarn add react-router-dom
```

### 프로젝트에 라우터 적용 

프로젝트에 리액트 라우터를 적용할 때는 src/index.js  파일에서 react-router-dom에 내장되어 있는 `BrowserRouter` 라는 컴포넌트를 사용하여 감싸면 된다. 

이 컴포넌트는 웹 애플리케이션에 HTML5의 History API를 사용하여 페이지를 새로고침하지 않고도 주소를 변경하고, 현재 주소에 관련된 정보를 `props` 로 쉽게 조회하거나

사용할 수 있도록 해준다.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();
```

### 페이지 만들기 

이제 라우트로 사용할 페이지 컴포넌트를 만들 차례이다. 사용자가 웹 사이트에 들어왔을 때 맨 처음 보여 줄 Home 컴포넌트와 웹 사이트를 소개하는 About 컴포넌트를 만들어보자

```react
import React from 'react';

const Home = () =>{
    return (
        <div>
            <h1>홈</h1>
            <p>홈, 그 페이지는 가장 먼저 보여지는 페이지.</p>
        </div>
    );
};

export default Home;
```

```react
import React from 'react';

const About= () =>{
    return(
        <div>
            <h1>소개</h1>
            <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다</p>
        </div>
    );
};
export default About;
```

### Route 컴포넌트로 특정 주소에 컴포넌트 연결

`Route` 라는 컴포넌트를 사용하여 사용자의 현재 경로에 따라 다른컴포넌트를 보여주겠다 Route 컴포넌트를 사용하면 어떤 규칙을 가진 경로에 어떤 컴포넌트를 보여줄지 정의할 수

있다. 사용방식은 다음과 같다

<code><Route path="주소규칙" component={보여 줄 컴포넌트 }/></code>

App.js를 열어 Route컴포넌트를 사용해 방금 만든 Home컴포넌트 혹은 About컴포넌트를 보여주도록 설정해보자.

```react
import React from 'react';
import {Route} from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () =>{
  return (
    <div>
      <Route path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </div>
  )
}

export default App;

```

이제 `yarn start` 를 실행해보자 첫화면은 Home컴포넌트가 나타날 것이다.

![image](https://user-images.githubusercontent.com/40031858/128105573-1e0f833f-5c32-48de-93b0-1f59c562e4a9.png)

다음으로 주소창에 localhost:3000/about 경로를 입력하여 들어가보자

![image](https://user-images.githubusercontent.com/40031858/128105622-a309f047-b389-499d-a079-fa0b193900bb.png)

/about 경로로 들어가면 About컴포넌트만 나오기를 기대했지만, 예상과 다르게 두 컴포넌트가 모두 나타난다. /about 경로가 /규칙에도 일치하기 때문에 발생한 현상이다. 

이를 수정하려면 Home을 위한 Route컴포넌트를 사용할때 `exact` 라는 `props` 를 true로 설정하면된다.

```react
import React from 'react';
import {Route} from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () =>{
  return (
    <div>
      <Route path="/" component={Home} exact={true}/>
      <Route path="/about" component={About}/>
    </div>
  )
}

export default App;

```

![image-20210804100800380](/Users/kimjunseong/Library/Application Support/typora-user-images/image-20210804100800380.png)

### Link 컴포넌트를 사용하여 다른 주소로 이동하기

`Link` 컴포넌트는 클릭하면 다른 주소로 이동시켜 주는 컴포넌트이다. 일반 웹 애플리케이션에서는 `a` 태그를 사용하여 페이지를 전환하는데 리액트 라우터를 사용할 때는 이 태그를

직접 사용하면 안된다. 이 태그는 페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 애플리케이션이 들고있던 상태들을 모두 날려버리게 된다. 렌더링된 컴포넌트들도 모두 

사라지고 다시 처음부터 렌더링하게 된다. `Link` 컴포넌트를 사용하여 페이지를 전환하면, 페이지를 새로 불러오지 않고 애플리케이션은 그대로 유지한 상태에서 HTML5 History API

를 사용하여 페이지의 주소만 변경해준다. `Link` 컴포넌트 자체는 `a`  태그로 이루어져 있지만, 페이지 전환을 방지하는 기능이 내장되어 있다. 

`Link` 컴포넌트는 다음과 같이 사용한다 

<code><Link to="주소">내용</Link></code>

이제 App컴포넌트에서 "/", "/about" 경로로 이동하는 `Link` 컴포넌트를 만들어보자.

```react
import React from 'react';
import {Route,Link} from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () =>{
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <hr/>
      <Route path="/" component={Home} exact={true}/>
      <Route path="/about" component={About}/>
    </div>
  )
}

export default App;

```



![image](https://user-images.githubusercontent.com/40031858/128107446-4cd9d668-ad26-457b-999f-0381c672dbe9.png)

## Route 하나에 여러 개의 path 설정하기

Route 하나에 여러개의 path를 지정하는 것은 최신 버전의 리액트 라우터 v5부터 적용된 기능이다. 이전버전에서는 여러 개의 path에 같은 컴포넌트를 보여주고 싶다면 

다음과 같이 해야했다.

```react
import React from 'react';
import {Route} from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = ()=>{
  return (
  	<div>
    	<Route path="/" component={Home} exact={true}/>
      <Route path="/about" component={About}/>
      <Route path="/info" component={About}/>
    </div>
  );
};
export default App;
```

이렇게 Route를 두번 사용하는 대신, path props 를 배열로 설정해주면 여러 경로에서 같은 컴포넌트를 보여줄 수 있다.

```react
import React from 'react';
import {Route} from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () =>{
  return (
    <div>
      <Route path="/" component={Home} exact={true}/>
      <Route path={['/about','/info']} component={About}/>
    </div>
  )
}

export default App;

```

## URL 파라미터와 쿼리

페이지 주소를 정의할 때 가끔은 유동적인 값을 전달해야 할 때도 있다. 이는 파라미터와 쿼리로 나눌 수 있다.

- 파라미터 예시: /profile/velopert
- 쿼리 예시: /about?details=true

유동적인 값을 사용해야 하는 상황에서 파라미터를 써야 할지 쿼리를 써야 할지 정할때 무조건적인 규칙인없다. 다만 일반적으로 파라미터는 특정 아이디 혹은 이름을 사용하여 

조회할 때 사용하고, 쿼리는 우리가 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때 사용한다

### URL 파라미터

Profile 페이지에서 파라미터를 사용해보자. /profile/velopert와 같은 형식으로 뒷부분에 유동적인 username 값을 넣어줄 때 해당 값을 props로 받아와서 조회하는 방법을 알아보자.

Profile이라는 컴포넌트를 다음과 같이 만들어보자.

```react
import React from 'react';

const data={
    saechimdaeki:{
        nmame:'김준성',
        description:'리액트를 배우고싶은 백엔드 개발자'
    },
    gildong:{
        name:'홍길동',
        description:'고전 소설 홍길동전의 주인공'
    }
};

const Profile = ({match}) =>{
    const {username} = match.params;
    const profile= data[username];
    if(!profile){
        return <div>존재하지 않는 사용자입니다</div>
    }
    return (
        <div>
            <h3>
                {username}({profile.name})
            </h3>
            <p>{profile.description}</p>
        </div>
    )
}
export default Profile;
```

URL파라미터를 사용할 때는 라우트로 사용되는 컴포넌트에서 받아오는 match라는 객체안의 params 값을 참조한다. match 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해

보이는지에 대한 정보가 들어있다. 이제 App컴포넌트에서 Profile 컴포넌트를 위한 라우트를 정의해보자. 이번에 사용할 path 규칙에는 /profile/:username 이라고 넣어주면 된다.

이렇게 설정하면 match.params.username 값을 통해 현재 username 값을 조회할 수 있다. 



```react
import React from 'react';
import {Route,Link} from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profile from './Profile';

const App = () =>{
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profile/saechimdaeki">saechimdaeki 프로필</Link>
        </li>
        <li>
          <Link to="/profile/gildong">gildong 프로필</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact={true}/>
      <Route path={['/about','/info']} component={About}/>
      <Route path="/profile/:username" component={Profile}/>
    </div>
  )
}

export default App;

```



![image](https://user-images.githubusercontent.com/40031858/128109087-fbfcd11c-9e6d-473d-b610-391f92d3ba02.png)

### URL 쿼리

이번에는 About 페이지에서 쿼리를 받아오자. 쿼리는 location 객체에 들어있는 search 값에서 조회할 수 있다. Location 객체는 라우트로 사용된 컴포넌트에게 props로

전달되며, 웹 애플리케이션의 현재 주소에 대한 정보를 지니고 있다. location의 형태는 다음과 같다.

```json
{
  "pathname":"/about",
  "search":"?detail=true",
  "hash":""
}
```

위 location 객체는 http://localhost:3000/about?detail=true 주소로 들어갔을때의 값이다. 

URL 쿼리를 읽을때는 위 객체가 지닌 값중에서 search 값을 확인해야한다. 이값은 문자열 형태로 되어있다. URL쿼리는 ?detail=true&another=1과 같이 문자열에 여러가지 값을 

설정해 줄 수 있다. Search 값중에서 특정 값을 읽어 오기위해선느 이 문자열을 객체 형태로 변환해주어야한다. 쿼리 문자열을 객체로 변환할 때는 `qs` 라는 라이브러리를 사용한다.

이를 설치해보자

```bash
$ yarn add qs
```

이제 About컴포넌트에서 location.search 값에 있는 detail이 true인지 아닌지에 따라 추가정보를 보여주도록 만들어보자. 

```react
import React from 'react';
import qs from 'qs';

const About = ({location}) =>{
    const query=qs.parse(location.search, {
        ignoreQueryPrefix: true //이 설정을 통해 문자열 맨 앞의 ? 를 생략
    });

    const showDetail=query.detail ==='true'; //쿼리의 파싱 결과 값은 문자열이다.
    return (
        <div>
            <h1>소개</h1>
            <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트다</p>
            {showDetail&& <p>detail 값을 true로 설정하셨군요!</p>}
        </div>
    )
}

export default About;
```

쿼리를 사용할때는 쿼리문자열을 객체로 파싱하는 과정에서 결과 값은 언제나 문자열이라는점에 주의하자. ?value=1 혹은 ?value=true와 같이 숫자나 논리자료형을 사용한다고 해서

해당값이 우리가 원하는 형태로 변환되는 것이 아니라 "1","true" 와 같이 문자열 형태로 받아진다. 

![image](https://user-images.githubusercontent.com/40031858/128109757-4d713873-9f9e-4e8e-8cc7-180ef4446713.png)

## 서브라우트

서브라우트는 라우트 내부에 또 라우트를 정의하는 것을 의미한다. 이작업은 그렇게 복잡하지 않으며 그냥 라우트로 사용되고 있는 컴포넌트의 내부에 Route 컴포넌트를 또사용하면된다

서브라우트를 직접 한번 만들어보자. 기존의 App컴포넌트에서는 두 종류의 프로필 링크를 보여주었는데 이를 잘라내서 프로필 링크를 보여주는 Profiles라는 컴포넌트를 따로 만들고

그 안에서 Profile 컴포넌트를 서브 라우트로 사용하도록 코드를 작성해보자.

```react
import React from 'react';
import {Link , Route} from 'react-router-dom';
import Profile from './Profile';

const Profiles = () =>{
    return (
        <div>
            <h3>사용자 목록:</h3>
            <ul>
                <li>
                    <Link to="/profiles/saechimdaeki">saechimdaeki</Link>
                </li>
                <li>
                    <Link to="/profiles/gildong">gildong</Link>
                </li>
            </ul>

            <Route 
                path="/profiles"
                exact
                render={()=> <div>사용자를 선택해 주세요.</div>}
                />
            <Route path="/profiles/:username" component={Profile}/>    
        </div>
    )
}
export default Profiles;
```

이 코드에서 첫 번째 Route 컴포넌트에는 `component` 대신 `render` 라는 `props` 를 넣어주었다. 컴포넌트 자체를 전달하는 것이 아니라, 보여주고 싶은 JSX를 넣어줄 수 있다.

지금처럼 따로 컴포넌트를 만들기 애매한 상황에 사용해도 되고, 컴포넌트에 `props` 를 별도로 넣어주고 싶을 때도 사용할 수 있다.

JSX에서 `props` 를 설정할 때 값을 생략하면 자동으로 true 로 설정된다. 예를들어 컴포넌트의 첫 번째 Route에서 exact={true} 대신 exact만 적어주었는데 이는 같은의미다.

이제 App.js를 수정해보자.

```react
import React from 'react';
import {Route,Link} from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';

const App = () =>{
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
          <li>
            <Link to="/profiles">프로필</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact={true}/>
      <Route path={['/about','/info']} component={About}/>
      <Route path="/profiles" component={Profiles}/>
    </div>
  )
}

export default App;
```

![image](https://user-images.githubusercontent.com/40031858/128110737-bd756ec1-a62d-4c0d-8850-4cf44ca04996.png)

## 리액트 라우터 부가 기능

### history

`history` 객체는 라우트로 사용된 컴포넌트에 match,location과 함께 전달되는 props 중 하나로, 이 객체를 통해 컴포넌트 내에 구현하는 메소드에서 라우터 API를 호출할 수 있습니다.

예를들어, 특정 버튼을 눌렀을때 뒤로 가거나, 로그인 후 화면을 전환하거나, 다른 페이지로 이탈하는 것을 방지해야할때 `history` 를 활용한다. 이 객체를 사용하는 예제페이지를 작성해보자.

```react
import React, {Component, component} from 'react';

class HistorySample extends Component{
    //뒤로 가기
    handleGoBack= () => {
        this.props.history.goBack();
    };

    //홈으로 이동
    handleGoHome= () =>{
        this.props.history.push('/');
    };

    componentDidMount(){
        //이것을 설정하고 나면 페이지에 변화가 생기려고 할 때마다 정말 나갈것인지를 질문함
        this.unblock=this.props.history.block('정말 떠나실 건가요?');
    }

    componentWillUnmount(){
        //컴포넌트가 언마운트되면 질문을 멈춤
        if(this.unblock){
            this.unblock();
        }
    }

    render(){
        return(
            <div>
                <button onClick={this.handleGoBack}>뒤로</button>
                <button onClick={this.handleGoHome}>홈으로</button>
            </div>
        );
    }
}

export default HistorySample;
```

```react
import React from 'react';
import {Route,Link} from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';
import HistorySample from './HistorySample';

const App = () =>{
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
          <li>
            <Link to="/profiles">프로필</Link>
        </li>
        <li>
          <Link to="/history">History 예제</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact={true}/>
      <Route path={['/about','/info']} component={About}/>
      <Route path="/profiles" component={Profiles}/>
      <Route path="/history" component={HistorySample}/>
    </div>
  )
}

export default App;

```

![image](https://user-images.githubusercontent.com/40031858/128111235-040f219e-9e2d-4d3e-b8f9-8b4dd92023c0.png)



### withRouter

`withRouter` 함수는 `HoC(Higher-order Component)` 이다. 라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 접근할 수 있게해준다.

WithRouterSample이라는 컴포넌트를 만들어서 `withRouter` 함수를 사용해보자.

```react
import React from 'react';
import {withRouter} from 'react-router-dom';

const WithRouterSample = ({location, match, history}) =>{
    return (
        <div>
            <h4>location</h4>
            <textarea
                value={JSON.stringify(location,null,2)}
                rows={7}
                readOnly={true}
                />
            <h4>match</h4>
            <textarea
                value={JSON.stringify(match,null,2)}
                rows={7}
                readOnly={true}
                />
            <button onClick={()=>history.push('/')}>홈으로</button>        
        </div>
    );
};

export default withRouter(WithRouterSample);
```

이 코드처럼 `withRouter` 를 사용할 때는 컴포넌트를 내보내 줄 때 함수로 감싸준다. JSON.stringify 의 두번째 파라미터와 세번째 파라미터를 위와 같이 null, 2 로 설정해주면

JSON에 들여쓰기가 적용된 상태로 문자열이 만들어진다. 이제 이를 Profiles 컴포넌트에 렌더링하자.

```react
import React from 'react';
import {Link , Route} from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';

const Profiles = () =>{
    return (
        <div>
           (...)  
            <WithRouterSample/> 
        </div>
    )
}
export default Profiles;
```

![image](https://user-images.githubusercontent.com/40031858/128112092-f2468f3a-7a27-413a-a0b3-04240d66d01c.png)

그런데 여기서 match 객체를 보면 params가 비어있다. `withRouter`  를 사용하면 현재 자신을 보여주고 있는 라우트 컴포넌트(현재 Profiles) 를 기준으로 match가 전달된다.

Profiles를 위한 라우트를 설정할 때는 path="/profiles" 라고만 입력했으므로 username 파라미터를 읽어 오지 못하는 상태이다. 

WithRouterSample 컴포넌트를 Profiles에서 지우고 Profile 컴포넌트에 넣으면 match쪽에 URL파라미터가 제대로 보일것이다.

```react
import React from 'react';
import {withRouter} from 'react-router-dom';
import WithRouterSample from './WithRouterSample';

(...)

const Profile = ({match}) =>{
   (...)
            <WithRouterSample/>
        </div>
    )
}
export default withRouter(Profile);
```

![image](https://user-images.githubusercontent.com/40031858/128112410-b485f8a9-c689-4936-bcf8-b138d76a1e07.png)

### Switch

`Switch` 컴포넌트는 여러  Route를 감싸서 그중 일치하는 단 하나의 라우트 만을 렌더링 시켜준다. `Switch` 를 사용하면 모든 규칙과 일치하지 않을때 보여줄 Not Found페이지

도 구현할 수 있다.

```react
import React from 'react';
import {Route,Link,Switch} from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';
import HistorySample from './HistorySample';

const App = () =>{
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
          <li>
            <Link to="/profiles">프로필</Link>
        </li>
        <li>
          <Link to="/history">History 예제</Link>
        </li>
      </ul>
      <hr />
      <Switch>
      <Route path="/" component={Home} exact={true}/>
      <Route path={['/about','/info']} component={About}/>
      <Route path="/profiles" component={Profiles}/>
      <Route path="/history" component={HistorySample}/>
      <Route
      //path를 따로 정의하지 않으면 모든 상황에 렌더링됨
      render={ ({location}) =>(
        <div>
          <h2>이 페이지는 존재하지 않습니다:</h2>
          <p>{location.pathname}</p>
        </div>
      )}
      />
      </Switch>
    </div>
  )
}

export default App;

```

이제 존재하지 않는 페이지인 http://localhost:3000/computerjunseong 에 들어가보자

![image](https://user-images.githubusercontent.com/40031858/128112706-d42b1b25-b479-4f15-b79f-1f19255f0857.png)

### NavLink

`NavLink` 는 `Link` 와 비슷하다. 현재 경로에  `Link` 에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 CSS클래스를 적용할 수 있는 컴포넌트이다. 

`NavLink` 에서 링크가 활성화되었을 때의 스타일을 적용할때는 `activeStyle` 값을,  CSS 클래스를 적용할 때는 `activeClassName` 값을 props로 넣어주면 된다.

이제  NavLink를 사용하게 하고 현재 선택되어 있는 경우 검정색 배경에 흰색 글씨로 스타일을 보여 주게끔 코드를 수정해보자.

```react
import React from 'react';
import {NavLink , Route} from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';


const Profiles = () =>{
    const activeStyle = {
        background: 'black',
        color:'white'
    };

    return (
        <div>
            <h3>사용자 목록:</h3>
            <ul>
                <li>
                    <NavLink activeStyle={activeStyle} to="/profiles/saechimdaeki">saechimdaeki</NavLink>
                </li>
                <li>
                    <NavLink activeStyle={activeStyle} to="/profiles/gildong">gildong</NavLink>
                </li>
            </ul>

            <Route 
                path="/profiles"
                exact
                render={()=> <div>사용자를 선택해 주세요.</div>}
                />
            <Route path="/profiles/:username" component={Profile}/>   
            <WithRouterSample/> 
        </div>
    )
}
export default Profiles;
```

![image](https://user-images.githubusercontent.com/40031858/128113060-820672f4-7be9-4a13-b269-b8a9e803d845.png)

## 정리

이 장에서는 리액트 라우터를 사용하여 주소 경로에 따라 다양한 페이지를 보여주는 방법을 알아보았다. 큰 규모의 프로젝트를 진행하다 보면 한가지 문제가 발생한다. 바로 웹브라우저에서

사용할 컴포넌트, 상태관리를 하는 로직, 그외 여러 기능을 구현하는 함수들이 점점쌓이면서 최종 결과물인 자바스크립트 파일의 크기가 매우 커진다는 점이다.

예를 들어 방금 만든 프로젝트는 사용자가 /about 페이지에 들어왔을 때 지금 당장 필요하지 않은 Profile 컴포넌트까지 불러온다. 라우트에 따라 필요한 컴포넌틈나 불러오고,

다른 컴포넌트는 다른 페이지를 방문하는 등의 필요한 시점에 불러오면 더효율적이지 않을까?? 이를 해결해주는 기술이 바로 코드스플리팅이다. 이에관해는 19장에서 알아보자.
