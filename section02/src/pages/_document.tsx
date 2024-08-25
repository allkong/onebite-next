import { Html, Head, Main, NextScript } from 'next/document';

// 모든 페이지에 적용되는 html
export default function Document() {
  return (
    <Html lang='kr'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
