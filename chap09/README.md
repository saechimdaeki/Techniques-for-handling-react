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

있다면 진행되지 않으니 ,먼저 커밋해 주어야한다. 이제 `yarn eject` 를 수행하자. 수행후에 프로젝트 디렉토리에 config라는 디렉토리가

생성되었을 것이다. 그 디렉토리 안에 webpack.config.js를 열어 "sassRegex" 라는 키워드를 찾아보자. 다음과 같은 코드가 나타날것이다

```javascript
{
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                },
                'sass-loader'
              ),
              sideEffects: true,
            },
```

여기서 use: 에 있는 'sass-loader' 부분을 지우고 , 뒷부분에 concat을 통해 커스터마이징 된 sass-loader 설정을 넣어주자.

```javascript
 {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                }).concat({
                  loader: require.resolve('sass-loader'),
                  options: {
                    sassOptions: {
                      includePaths: [paths.appSrc + '/styles']
                    },
                    sourceMap: isEnvProduction && shouldUseSourceMap,
                  }
                }),
              sideEffects: true,
            },
```

설정 파일을 저장한 후 서버를 껏다가 재시작하자. 이제 utils.scss 파일을 불러올때 현재 수정하고 있는 scss파일 경로가 어디에 위치하더라도 앞부분에 상대

경로를 입력할 필요 없이 styles 디렉토리 기준 절대 경로를 사용하여 불러올 수 있다.

SassComponent.scss 파일에서 import 구문을 다음과 같이 한번 수정해보자. 그리고 똑같이 적용되는지 확인해보자.

이제부터 utils.scss를 사용하는 컴포넌트가 있다면 위 한 줄만 넣어주면 된다.

하지만 새파일을 생성할때마다 utils.scss를 매번 이렇게 포함시키는 것도 귀찮을텐데 이에대한 해결방법도있다.

그럴때는 sass-loader의 data옵션을 설정하면된다. data옵션을 설정하면 `Sass` 파일을 불러올때마다 코드의 맨 윗부분에 특정 코드를

포함시켜준다. webpack.config.js를 열어서 조금전 수정했던 sass-loader의 옵션에 있는 data필드를 다음과 같이 설정해보자

```javascript
{
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                }).concat({
                  loader: require.resolve('sass-loader'),
                  options: {
                    sassOptions: {
                      includePaths: [paths.appSrc + '/styles']
                    },
                    sourceMap: isEnvProduction && shouldUseSourceMap,
                    prependData: `@import 'utils';`
                  }
                }),
              sideEffects: true,
            },
```

이렇게 작성하고 개발서버를 재시작하고 나면 모든 scss 파일에서 utils.scss를 자동으로 불러오므로, Sass에서 맨 윗줄에 있는 import구문을 지워도 동작할것이다.

### node_modules에서 라이브러리 불러오기

`Sass` 의 장점 중 하나는 라이브러리를 쉽게 불러와서 사용할 수 있다는 점이다. yarn을 통해 설치한 라이브러리를 사용하는 가장 기본적인 방법은 무엇일까?

다음과 같이 상대경로를 사용하여 node_modules 까지 들어가서 불러오는 방법이다

```scss
@import '../../../node_modules/library/styles';
```

하지만 이런 구조는 스타일 파일이 깊숙한 디렉터리에 위치할 경우 `../` 을 매우 많이 적어야하니 번거롭다. 이보다 더 쉬운 방법이 있는데

바로 `물결문자(~)` 를 사용하는 방법이다

```scss
@import '~library/styles';
```

물결문자를 사용하면 자동으로 node_modules에서 라이브러리 디렉터리를 탐지하여 스타일을 불러올 수 있다. 

연습삼아 유용한 `Sass` 라이브러리 두가지를 설치하고 사용해보자. 반응형 디자인을 쉽게 만들어주는 include-media 와 매우 편리한

색상 팔레트인 open-color 를 yarn명령어를 사용해 설치하자.

```bash
yarn add open-color include-media
```

그 다음에는 utils.scss파일을 열고 물결표시를 사용하여 라이브러리를 불러오자. 다음 두줄을 코드 상단에 넣어주면 된다

```scss
@import '~include-media/dist/include-media';
@import '~open-color/open-color';
```

`Sass` 라이브러리를 불러올 때는 node_modules 내부 라이브러리 경로 안에 들어있는 scss 파일을 불러와야 한다. 

이제 불러온 include-media 와 open-color 를 SassComponent.scss에서 사용해보자. 

```scss
.SassComponent {
    display: flex;
    @include media('<768px'){
        background: $oc-gray-9;
    }
  (...)
}
```

---



## CSS Module

`CSS Module` 은 CSS를 불러와서 사용할 때 클래스 이름을 고유한 값, 즉 `[파일이름]_[클래스이름]_해시값` 형태로 자동으로 만들어서 컴포넌트 스타일

클래스 이름이 중첩되는 현상을 방지해 주는 기술입니다. `CSS Module` 을 사용하기 위해 구버전(v1) 의 create-react-app 에서는 웹팩에서

Css-loader 설정을 별도로 해주어야 했지만 v2 이상부터는 따로 설정할 필요 없이 `.module.css` 확장자로 파일을 저장하기만 하면

`CSS Module` 이 적용된다.   CSSModule.module.css 파일을 다음과 같이 한번 작성해보자

```css
/* 자동으로 고유해질 것이므로 흔히 사용되는 단어를 클래스 이름으로 마음대로 사용 가능*/

.wrapper{
    background: black;
    padding: 1rem;
    color: white;
    font-size: 2rem;
}

/* 글로벌 CSS를 작성하고 싶다면*/
:global .something{
    font-weight: 800;
    color: aqua;
}
```

`CSS Module` 을 사용하면 클래스 이름을 지을 때 그 고유성에 대해 고민하지 않아도 된다. 흔히 사용하는 단어로 이름을 짓는다고 해도 전혀 문제가

되지 않는다. 해당 클래스는 방금 만든 스타일을 직접 불러온 컴포넌트 내부에서만 작동하기 때문이다. 만약 특정 클래스가 웹페이지에서 전역적으로 

사용되는 경우라면 `:global` 을 앞에 입력하여 글로벌 CSS임을 명시해줄 수 있다.

이제 위의 CSS Module 을사용하는 리액트 컴포넌트를 작성하자

```react
import React from 'react';
import styles from './CssModule.module.css';

const CSSModule=()=>{
    return (
        <div className={styles.wrapper}>
            안녕하세요, 저는 <span className="something">CSS Module!</span>
        </div>
    )
}

export default CSSModule;
```

CSS Module 이 적용된 스타일 파일을 불러오면 객체를 하나 전달받게 되는데 CSS Module 에서 사용한 클래스 이름과 해당 이름을 고유화한 값이

`키-값` 형태로 들어있다. 예를들어 위 코드에서 `console.log(styles)` 를 한다면 다음과 같은 결과가 나타난다

```json
{wrapper: "CSSModule_wrapper_1SbdQ"}
```

지정한 클래스 이름 앞뒤로 파일이름과 해시값이 붙었다. 이 고유한 클래스 이름을 사용하려면 클래스를 적용하고 싶은 JSX 엘리먼트에 

`className={styles.[클래스 이름]}` 형태로 전달해 줌녀 된다. `:global` 을 사용하여 전역적으로 선언한 클래스의 경우 평상시 해왔던 것처럼

그냥 문자열로 넣어주면 된다.

CSS Module을 사용한 클래스 이름을 두 개 이상 적용할 때는 다음과 같이 코드를 작성하면 된다.

```css
/* 자동으로 고유해질 것이므로 흔히 사용되는 단어를 클래스 이름으로 마음대로 사용 가능*/

.wrapper{
    background: black;
    padding: 1rem;
    color: white;
    font-size: 2rem;
}
.inverted{
    color: black;
    background: white;
    border: 1px solid black;
}

/* 글로벌 CSS를 작성하고 싶다면*/
:global .something{
    font-weight: 800;
    color: aqua;
}
```

```react
import React from 'react';
import styles from './CssModule.module.css';

const CSSModule=()=>{
    return (
        <div className={'${styles.wrapper} ${styles.inverted}'}>
            안녕하세요, 저는 <span className="something">CSS Module!</span>
        </div>
    )
}

export default CSSModule;
```

이 코드에서는 ES6 문법 템플릿 리터럴을 사용하여 문자열을 합해주었다. 이 문법을 사용하면 문자열 안에 자바스크립트 레퍼런스를 쉽게넣어줄수있다.

```javascript
const name='리액트';
// const message= '제 이름은 ' + name + '입니다'
const message= '제 이름은 ${name}입니다';
```

여기서 사용되는  `  문자열은  백틱이라고 불린다. CSS Module 클래스를 여러개 사용할때 템플릿 리터럴 문법을 사용하고 싶지 않다면 다음과 같이

작성할 수 도있다. 

```javascript
className={[styles.wrapper , styles.inverted].join(' ')}
```

### classnames

`classnames` 는 CSS 클래스를 조건부로 설정할 때 매우 유용한 라이브러리이다. 또한 CSS Module을 사용할때 이라이브러리를 사용하면 여러

클래스를 적용할때 매우 편리하다 일단 이를 설치해보자

```bash
$ yarn add classnames
```

classnames의 기본 사용법을 훑어보자.

```react
import classNames from 'classnames';

classNames('one', 'two'); // = 'one two'
classNames('one', {two:true}); // = 'one two'
classNames('one', {two:false}); // = 'one'
classNames('one', ['two','three']); // = 'one two three'

const myClass='hello';
classNames('one', myClass, {myCondition: true}); // = 'one hello myCondition'
```

이런식으로 여러가지 종류의 파라미터를 조합해 CSS 클래스를 설정할 수 있기 때문에 컴포넌트에서 조건부로 클래스를 설정할때 매우 편리하다

예를들어 `props` 값에 따라 다른 스타일을 주기 쉬워진다.

```react
const MyComponent = ({highlighted, theme}) => (
	<div className={classNames('MyComponent', {highlighted}, theme)}>
  	Hello
  </div>
);
```

이렇게 할 경우, 위 엘리먼트의 클래스에 highlighted 값이 true 이면 highlighted 클래스가 적용되고 false이면 적용되지 않는다. 추가로 theme으로

전달받는 문자열은 내용 그대로 클래스에 적용된다. 이런 라이브러리의 도움을 받지않는다면 다음과 같은 형식으로 처리해야 할 것이다

```react
const MyComponent = ({highlighted , theme}) => (
	<div className={`MyComponent ${theme} ${highlighted ? 'highlighted' : ''}`}>
		Hello
	</div>
);
```

이를 보면 알 듯 classnames를 쓰는 것이 가독성이 훨씬 높다.

덧붙여 CSS Module과 함께 사용하면 CSS Module 사용이 훨씬 쉬워진다. classnames에 내장되어 있는 `bind` 함수를 사용하면 클래스를 넣어

줄 때마다 `styles.[클래스 이름]` 형태를 사용할 필요가 없다. 사전에 미리 styles에서 받아온 후 사용하게끔 설정해 두고 `cx('클래스이름1','클래스이름2')` 

형태로 사용할 수 있다. 다음의 코드는 지금 만들었던 CSSModule 컴포넌트에 classnames의 `bind` 함수를 적용한 예이다.

```react
import React from 'react';
import classNames from 'classnames/bind';
import styles from './CSSModule.module.css';

const cx=classNames.bind(styles); //미리 styles에서 클래스를 받아 오도록 설정하고

const CSSModule = () => {
  return (
  	<div className={cx('wrapper', 'inverted')}>
    	안녕하세요, 저는 <span className="something">CSS Module!</span>
    </div>
  );
};

export default CSSModule;
```

CSS Module을 사용할 때 클래스를 여러 개 설정하거나, 또는 조건부로 클래스를 설정할때 classnames의 bind를 쓰면 이처럼 편리하게 작성할수있다.

### Sass와 함께 사용하기

Saas를 사용할 때도 파일 이름 뒤에 `.module.scss` 확장자를 사용해 주면 `CSS Module` 로 사용할 수 있다.

CSSModule.module.css 파일의 이름을 CSSModule.module.scss로 한번 변경해보자

```scss
/* 자동으로 고유해질 것이므로 흔히 사용되는 단어를 클래스 이름으로 마음대로 사용 가능*/

.wrapper{
    background: black;
    padding: 1rem;
    color: white;
    font-size: 2rem;

&.inverted{
    // inverted가 .wrapper와 함께 사용되었을 때만 적용
    color: black;
    background: white;
    border: 1px solid black;
    }
}
/* 글로벌 CSS를 작성하고 싶다면*/
:global {
    // :global {}로 감싸기
    .something{
    font-weight: 800;
    color: aqua;
    }
    // 여기에 다른 클래스도 만들 수 있다.
}
```

그리고나서 CSSModule.js 상단에서도 .css파일 대신 .scss 파일을 불러오자

```javascript
import styles from './CSSModule.module.scss';
```



### CSS Module이 아닌 파일에서 CSS Module 사용하기

`CSS Module` 에서 글로벌 클래스를 정의할 때 `:global` 을 사용했던 것처럼 `CSS Module` 이 아닌 일반  .css/.scss 파일에서도 

`:local` 을 사용하여 `CSS Module` 을 사용할 수 있다.

```scss
:local .wrapper{
  /* 스타일 */
}

:local{
  .wrapper{
      /* 스타일 */
  }
}
```



---

## styled-components

컴포넌트 스타일링의 또 다른 패러다임은 자바스크립트 파일 안에 스타일을 선언하는 방식이다. 이 방식을 `CSS-in-JS` 라고 부르는데 이와 관련된 

라이브러리는 정말많다. 여기서는 `CSS-in-JS` 라이브러리중 개발자들이 가장 선호하는 `styled-components` 를 알아보자.

```bash
$ yarn add styled-components
```

이 라이브러리를 통해 예제 컴포넌트를 한번 만들어보자 `styled-components` 를 사용하면 자바스크립트 파일 하나에 스타일까지 작성할 수 있기때문에

.css 또는 .scss 확장자를 가진 스타일 파일을 따로 만들지 않아도 된다는 큰 이점이 있다. 

src 디렉토리에 StyledComponents.js 파일을 생성한뒤 다음 코드를 작성해보자.

```react
import React from 'react';
import styled, { css } from 'styled-components';


const Box = styled.div`
  /* props 로 넣어준 값을 직접 전달해줄 수 있습니다. */
  background: ${props => props.color || 'blue'};
  padding: 1rem;
  display: flex;
`;

const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  /* & 문자를 사용하여 Sass 처럼 자기 자신 선택 가능 */
  
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
  /* 다음 코드는 inverted 값이 true 일 때 특정 스타일을 부여해줍니다. */
  ${props =>
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `};
  & + button {
    margin-left: 1rem;
  }
`;

const StyledComponent = () => (
  <Box color="black">
    <Button>안녕하세요</Button>
    <Button inverted={true}>테두리만</Button>
  </Box>
);

export default StyledComponent;
```

이처럼 `styled-components` 와 일반  `classNames` 를 사용하는 CSS/Sass를 비교했을 때, 가장 큰 장점은 `props` 값으로 전달해주는

값을 쉽게 스타일에 적용할 수 있다는 것이다.



### Tagged 템플릿 리터럴

앞에서 작성한 코드를 확인해보면, 스타일을 작성할 때 `을 사용하여 만든 문자열에 스타일 정보를 넣어주었다. 

여기서 사용한 문법을 `Tagged 템플릿 리터럴` 이라고 부른다. `CSS Module` 을 배울 때 나온 일반 템플릿 리터럴과 다른 점은 템플릿 안에 자바스크립트

객체나 함수를 전달할 때 온전히 추출할 수 있다는 것이다. 예를들어 다음 코드와 실행 결과를 확인해보자

```javascript
`hello ${{foo: 'bar'}} ${() => 'world'}!`

// 결과: "hello [object Object] () => 'world'!"
```



템플릿에 객체럴 늫거나 함수를 넣으면 형태를 잃어버리게 된다. 객체는 "[object Object]" 로 변환되고, 함수는 함수내용이 그대로 문자열화되어 나타난다

만약 다음과 같은 함술르 작성하고 나서 해당 함수뒤에 템플릿 리터럴을 넣어준다면, 템플릿 안에 넣은 값을 온전히 추출할 수 있다.

```react
function tagged(...args){
  console.log(args);
}

tagged`hello ${{foo: 'bar'}} ${()=> 'world'}!`
```

이렇게 `Tagged 템플릿 리터럴` 을 사용하면 템플릿 사이사이에 들어가는 자바스크립트 객체나 함수의 원본 값을 그대로 추출할 수 있다.

`styled-components` 는 이러한 속성을 사용하여 `styled-components` 로 만든 컴포넌트의 `props` 를 스타일 쪽에서 쉽게 조회할수있도록 해준다.

### 스타일링된 엘리먼트 만들기 

`styled-components` 를 사용하여 스타일링된 엘리먼트를 만들 때는 컴포넌트 파일의 상단에서 styled를 불러오고 `styled.태그명` 을 사용하여 구현한다

```react
import styled from 'styled-components';
const MyComponent= styled.div`
	font-size: 2rem;
`;
```



이렇게 `styled.div` 뒤에  `Tagged 템플릿 리터럴 문법` 을 통해 스타일을 넣어주면 해당 스타일이 적용된 `div` 로 이루어진 리액트 컴포넌트가 생성된다.

그래서 나중에 `<MyComponent> Hello </MyComponent>` 와 같은 형태로 사용할 수 있다.

`div` 가 아닌 button 이나 input 에 스타일링을 하고 싶다면 styled.button 혹은 styled.input 같은 형태로 뒤에 태그명을 넣어주면 된다.

하지만 사용해야 할 태그명이 유동적이거나 특정 컴포넌트 자체에 스타일링해 주고 싶다면 다음과 같은 형태로 구현할 수 있다.

```react
//태그의 타입을 styled 함수의 인자로 전달

const Myinput= styled('input')`
	background: gray;
`

//아예 컴포넌트 형식의 값을 넣어 줌
const StyledLink = styled(Link)`
	color: blue;
`
```



```markdown
### 참고
여기서 사용된 Link 컴포넌트는 나중에 리액트 라우터를 배울 때 사용할 컴포넌트이다. 이런식으로 컴포넌트를 styled의 파라미터에 넣는 경우에는

해당 컴포넌트에 className props 를 최상위 DOM의 className 값으로 설정하는 작업이 내부적으로 되어있어야한다.

​```react
const Sample =({className}) => {
return <div className={className}>Sample</div>
};

const StyledSample = styled(Sample)`
	font-size: 2rem;
`;
​```
```

### 스타일에서 props 조회하기

`styled-components` 를 사용하면 스타일 쪽에서 컴포넌트에게 전달된 `props` 값을 참조할 수 있다. 이전에 작성했던 Box컴포넌트를 보자.

```react
const Box = styled.div`
	/* props로 넣어 준 값을 직접 전달해 줄 수 있다 */
	background: ${props => props.color || 'blue'};
	padding: 1rem;
	display: flex;
`;
```

이 코드를 보면 `background` 값에 `props` 를 조회해서 `props.color` 의 값을 사용하게 했다. 그리고 `color` 값이 주어지지 않았을때는 

blue를 기본색상으로 설정했다. 이렇게 만들어진 코드는 JSX에서 사용될 때 다음과 같이 color값을 `props` 로 넣어줄 수 있다.

```javascript
<Box color="black">(...)</Box>
```



### props에 따른 조건부 스타일링

일반 CSS 클래스를 사용하여 조건부 스타일링을 해야할 때는 `className` 을 사용하여 조건부 스타일링을 해왔는데, `styled-components`  에서는

조건부 스타일링을 간단하게 `props` 로도 처리할 수 있다. 앞서 작성한 Button 컴포넌트를 다시 한번 확인해보자.

```react
import styled, {css} from 'styled-components';
/* 단순 변수와 형태가 아니라 여러 줄의 스타일 구문을 조건부로 설정해야 하는 경우에는 css를 불러와야 한다*/

const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  /* & 문자를 사용하여 Sass 처럼 자기 자신 선택 가능 */
  
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
  /* 다음 코드는 inverted 값이 true 일 때 특정 스타일을 부여해줍니다. */
  ${props =>
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `};
  & + button {
    margin-left: 1rem;
  }
`;
```

이렇게 만든 컴포넌트는 다음과 같이 `props` 를 사용하여 서로 다른 스타일을 적용할 수 있다.

```javascript
<Button>안녕하세요 </Button>
<Button inverted={true}> 테두리만 </Button>
```

스타일 코드 여러 줄을 `props` 에 따라 넣어주어야 할 때는 CSS를 `styled-components` 에서 불러와야한다. CSS를 사용하지 않고

다음과 같이 바로 문자열을 넣어도 작동하기는 한다.

```javascript
${props =>
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `};
```

이렇게 했을 때는 해당 내용이 그저 문자열로만 취급되기 때문에 VS Code 확장프로그램에서 하이라이팅이 제대로 이루어지지 않는다. 그리고

더욱 치명적인 단점은 `Tagged 템플릿 리터럴` 이 아니기 때문에 함수를 받아 사용하지 못해 해당 부분에서는 `props` 값을 사용하지 못한다는 것이다.

만약 조건부 스타일링을 할 때 넣는 여러줄의 코드에서 `props` 를 참조하지 않는다면 굳이 CSS를 불러와서 사용하지 않아도 상관없다. 

하지만 `props` 를 참조한다면, 반드시 CSS로 감싸주어서 `Tagged 템플릿 리터럴` 을 사용해 주어야한다.

### 반응형 디자인

이번에는 `styled-components` 를 사용할 때 반응형 디자인을 어떻게 하는지 보자. 브라우저의 가로 크기에 따라 다른스타일을 적용하기 위해서는

일반 CSS를 사용할 때와 똑같이 `media 쿼리` 를 사용하면 된다. 조금전 작성한 BOX컴포넌트를 다음과 같이 수정하자

```react
const Box = styled.div`
  /* props 로 넣어준 값을 직접 전달해줄 수 있습니다. */
  background: ${props => props.color || 'blue'};
  padding: 1rem;
  display: flex;
   /* 
    기본적으로 가로크기 1024px에 가운데 정렬을 하고 가르크기가 작아짐에 따라 크기를 줄이고 
    768px 미만이 되면 꽉 채운다
   */
   width: 1024px;
   margin: 0 auto;
   @media (max-width: 1024px){
       width: 768px;
   }
   @media (max-width: 768px){
       width:100px;
   }
`;
```

일반 CSS에서 할때랑 큰 차이가 없다. 그런데 이러한 작업을 여러 컴포넌트에서 반복해야 한다면 조금 귀찮을 수 있다. 그럴때는 이 작업을 함수화하여

간편하게 사용할 수 있다.  `styled-components ` 메뉴얼에서 제공하는 유틸함수를 따라 사용해보자.

```react
import React from 'react';
import styled, { css } from 'styled-components';

const sizes = {
  desktop: 1024,
  tablet: 768
};

// 위에있는 size 객체에 따라 자동으로 media 쿼리 함수를 만들어줍니다.
// 참고: https://www.styled-components.com/docs/advanced#media-templates
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

const Box = styled.div`
  /* props 로 넣어준 값을 직접 전달해줄 수 있습니다. */
  background: ${props => props.color || 'blue'};
  padding: 1rem;
  display: flex;
  width: 1024px;
  margin: 0 auto;
  ${media.desktop`width: 768px;`}
  ${media.tablet`width: 100%;`};
`;
```

이렇게 `media` 를 한번 선언하고 나니까 이를 사용할때 스타일 쪽의 코드가 훨씬 간단해졌다. 

지금은 `media` 를 `StyledComponent.js` 에서 만들어 주었지만, 실제로 사용한다면 아예 다른파일로 모듈화 한 뒤 여기저기서

불러와 사용하는 방식이 편할것이다.
