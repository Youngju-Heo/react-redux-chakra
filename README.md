# react-redux-typescript-eslint-webpack with chakra-ui

Webpack template for a React app with TypeScript and ESLint

## 주요패키지
<hr />

* react
    * 17.0.2 최신버전 적용
* react-redux
    * redux 유틸리티
* react-icon
    * 각종 오픈소스 SVG 아이콘 사용가능
* chakra-ui
    * css 등의 스타일을 최소화 하는 테마 적용된 UI
* eslint
    * typescript/react 에 맞춘 설정(prettier 함께 사용)
* webpack
    * react-script 를 사용하지 않고 직접적용

## WebStorm 또는 IntelliJ 사용시 에러 처리

* Self closing tag 의 공백 처리 문제로 prettier 와 intelli J 계열의 포매터가 서로 경쟁하여 에러가 발생하는 문제가 있는데, 이를 해결 하기위해서 다음 설정을 해 주시길 바랍니다.
    * IntelliJ 설정에서 `Editor > Code Style > HTML` 값의 Other 섹션에서 `In empty tag`를 체크합니다.

      ![IntelliJ 설정 수정 위치](docs/intelli-html-in-empty-tag.png)
