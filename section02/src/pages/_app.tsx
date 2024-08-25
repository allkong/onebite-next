import '@/styles/globals.css';
import type { AppProps } from 'next/app';

// 모든 페이지 역할을 하는 컴포넌트의 부모 컴포넌트
// Component: 현재 페이지 역할을 하는 컴포넌트
// pageProps: Component에 전달될 props
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>글로벌 헤더</header>
      <Component {...pageProps} />
    </>
  );
}
