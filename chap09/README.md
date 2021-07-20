# 9장 컴포넌트 스타일링

리액트에서 컴포넌트를 스타일링할때는 다양한 방식을 사용할 수 있다. 여러 방식 중에서 딱히 정해진 방식이란 없다. 

이 장에서 알아볼 스타일링 방식은 다음과 같다.

- `일반 CSS` : 컴포넌트를 스타일링하는 가장 기본적인 방식
- `Saas` : 자주 사용되는 CSS 전처리기 중 하나로 확장된 CSS문법을 사용하여 CSS코드를 더욱 쉽게 작성할수있도록해준다.
- `CSS Module`: 스타일을 작성할때 CSS 클래스가 다른 CSS클래스의 이름과 절대 충돌하지 않도록 파일마다 고유한 이름을 자동으로 생성해주는옵션
- `styled-components`: 스타일을 자바스크립트 파일에 내장시키는 방식으로 스타일을 작성함과 동시에 해당스타일이 적용된 컴포넌트를만들수있게해줌.

## 가장 흔한 방식, 일반 CSS

새로 만든 프로젝트를 보면 src디렉토리에 App.js 파일과 App.css파일이 있다.

```react
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

```

```react
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

```

CSS를 작성할 때 가장 중요한 점은 CSS 클래스를 중복되지 않게 만드는 것이다. CSS클래스가 중복되는 것을 방지하는 여러 가지 방식이 있는데,

그중 하나는 이름을 지을 때 특별한 규칙을 사용하여 짓는 것이고 또다른 하나는 `CSS Selector` 를 활용하는것이다

### 이름 짓는 규칙

프로젝트에 자동 생성된 App.css를 읽어보면 클래스 이름이 컴포넌트 이름-클래스 형태로 지어져있다(예: App-header). 클래스 이름에 컴포넌트 이름을

포함시킴으로써 다른 컴포넌트에서 실수로 중복되는 클래스를 만들어 사용하는 것을 방지할 수 있다. 비슷한 방식으로 `BEM 네이밍`이라는 방식도있다.

`BEM 네이밍` 은 CSS 방법론 중 하나로, 이름을 지을 때 일종의 규칙을 준수하여 해당 클래스가 어디에서 어떤용도로 사용되는지 명확하게 작성하는 방식이다.

예를 들어, .card_title-primary 처럼..

### CSS Selector

`CSS Selector` 를 사용하면 CSS 클래스가 특정 클래스 내부에 있는 경우에만 스타일을 적용할 수 있다. 예를들어 .App안에 들어있는 .logo

에 스타일을 적용하고 싶다면 다음과 같이 작성하면 된다

```css
.App .logo{
  animation:App-logo-spin infinite 20s linear;
  height: 40vmin;
}
```

이러한 방식으로 App.css와 App.js의 CSS 클래스방식을 수정해보자

```css
.App {
  text-align: center;
}

.App .logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
}

.App header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App a{
  color:#61dafb
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

```

```react
import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

class App extends Component{
  render(){
    return (
      <div className="App">
        <header>
          <img src={logo} className="logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noroferrer"
            >
              Learn React
            </a>
        </header>
      </div>
    );
  }
}

export default App;

```

이런식으로 컴포넌트의 최상위 html 요소에는 컴포넌트의 이름으로 클래스 이름을 짓고(.App), 그 내부에서는 소문자를 입력하거나 (.logo), header 같은

태그를 사용하여 클래스 이름이 불필요한 경우에는 아예 생략할 수도 있다.

## Saas 사용하기

`Saas(Syntactically Awesome Style Sheets)` (문법적으로 매우 멋진 스타일시트) 는 CSS전처리기로 복잡한 작업을 쉽게할 수 있도록 해주고,

스타일 코드의 재활용성을 높여 줄 뿐만 아니라 코드의 가독성을 높여서 유지보수를 더욱 쉽게해준다. 

`Saas` 에서는 두 가지 확장자 `.scss` 와 `.sass` 를 지원한다. `.scss` 의 문법과 `.sass` 의 문법은 꽤다르다 다음코드를 확인해보자.

```sass
// .sass
$font-stack: Helvetica, sans-serif
$primary-color: #333

body
	font: 100% $font-stack
	color: $primary-color
```

 ```scss
 // .scss
 $font-stack: Helvetica, sans-serif;
 $primary-color: #333;
 body{
   font: 100% $font-stack;
   color: $primary-color;
 }
 ```

주요 차이점을 살펴보면, `.sass` 확장자는 중괄호와 세미콜론을 사용하지 않는다 반면 `.scss` 확장자는 기존 `CSS` 를 작성하는 방식과 비교해서 

문법이 크게 다르지 않다. 보통 `.scss` 문법이 더 자주 사용되므로 이책에는 `.scss` 확장자를 사용하자.

먼저 새 컴포넌트를 만들어서 `Saas` 를 사용해보자 우선 `node-sass` 라는 라이브러리를 설치해주어야한다. 이 라이브러리는 `Saas` 를 `CSS` 로 변환해준다.

``` bash
$ yarn add node-sass@4.14.1
```

설치가 완료되면 다음과 같이 SassComponent.css 파일을 작성하자

```scss
//변수 사용하기
$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;

//믹스인 만들기 (재사용되는 스타일 블록을 함수처럼 사용할 수 있음)
@mixin square($size) {
    $calculated: 32px *$size;
    width: $calculated;
    height: $calculated;
}

.SassComponent {
    display: flex;
    .box{ // 일반 CSS에서는 .SassComponent .box와 마찬가지
        background: red; 
        cursor: pointer;
        transition: all 0.3s ease-in;
        &.red{
            // .red 클래스가 .box와 함께 사용되었을 때
            background: $red;
            @include square(1);
        }
        &.orange {
            background: $orange;
            @include square(2);
        }
        &.yellow{
            background: $yellow;
            @include square(3);
        }
        &.green{
            background: $green;
            @include square(4);
        }
        &.blue {
            background: $blue;
            @include square(5);
        }
        &.indigo{
            background: $indigo;
            @include square(6);
        }
        &.violet{
            background: $violet;
            @include square(7);
        }
        &:hover{
            // .box에 마우스를 올렸을 때
            background: black;
        }
    }
}
```

그리고 이 `Sass` 스타일시트를 사용하는 SassComponent.js 컴포넌트 파일도 만들자

```react
import React from 'react';
import './SassComponent.scss';

const SassComponent = () =>{
    return (
        <div className="SassComponent">
            <div className="box red" />
            <div className="box orange" />
            <div className="box yellow" />
            <div className="box green" />
            <div className="box blue" />
            <div className="box indigo" />
            <div className="box violet" />
        </div>
    );
};
export default SassComponent;
```

작업한뒤에는 개발 서버를 재시작시켜야 `Sass` 가 성공적으로 적용된다. 

### utils 함수 분리하기

여러 파일에서 사용될 수 있는 `Sass` 변수 및 믹스인은 다른파일로 따로 분리하여작성한뒤 필요한 곳에서 쉽게 불러와 사용할 수 있다.

src 디렉토리에 styles 라는 디렉토리를 생성하고 그안에 utils.scss 파일을 만들자. 그다음에는 기존 SassComponent.scss 에 작성했던

변수와 믹스인을 잘라내서 이동시켜보자.

```scss
// utils.scss

//변수 사용하기
$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;

//믹스인 만들기 (재사용되는 스타일 블록을 함수처럼 사용할 수 있음)
@mixin square($size) {
    $calculated: 32px *$size;
    width: $calculated;
    height: $calculated;
}
```

이제 utils.scss 파일에서 선언한 변수와 믹스인을 SassComponent.scss에서 사용해보자. 다른 scss파일을 불러올 때는 `@import` 구문을 사용한다.

```scss
//SassComponent.scss
@import './styles/utils.scss';
.SassComponent {
    display: flex;
    .box{ // 일반 CSS에서는 .SassComponent .box와 마찬가지
        background: red; 
        cursor: pointer;
        transition: all 0.3s ease-in;
        &.red{
            // .red 클래스가 .box와 함께 사용되었을 때
            background: $red;
            @include square(1);
        }
        &.orange {
            background: $orange;
            @include square(2);
        }
        &.yellow{
            background: $yellow;
            @include square(3);
        }
        &.green{
            background: $green;
            @include square(4);
        }
        &.blue {
            background: $blue;
            @include square(5);
        }
        &.indigo{
            background: $indigo;
            @include square(6);
        }
        &.violet{
            background: $violet;
            @include square(7);
        }
        &:hover{
            // .box에 마우스를 올렸을 때
            background: black;
        }
    }
}
```

### sass-loader 설정 커스터마이징하기

이 작업은 `Sass` 를 사용할 때 반드시 해야하는 것은 아니지만, 해 두면 유용하다. 예를 들어 방금 SassComponent에서 utils를 불러올때 

`@import './styles/utils';` 형태로 불러왔는데 만약 프로젝트에 디렉토리를 만들어서 구조가 깊어졌다면 해당 파일에서는 다음과 같이 

상위 폴더로 한참 거슬러 올라가야 한다는 단점이 있다. 

```scss
@import '../../../styles/utils';
```

이 문제점은 웹팩에서 `Sass` 를 처리하는 sass-loader의 설정을 커스터마이징하여 해결할 수 있다.  `create-react-app` 으로만든 프로젝트는

프로젝트 구조의 복잡도를 낮추기 위해 세부 설정이 모두 숨겨져있다. 이를 커스터마이징 하려면 프로젝트 디렉토리에서 `yarn eject` 명령어를 통해

세부 설정을 밖으로 꺼내주어야 한다. `create-react-app`  에서는 기본적으로 `Git` 설정이 되어있는데 `yarn eject` 는 아직 Git에 커밋되지 않은 변화가 

있다면 진행되지 않으니 ,먼저 커밋해 주어야한다.

