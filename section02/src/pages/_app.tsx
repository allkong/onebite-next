import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';

// 모든 페이지 역할을 하는 컴포넌트의 부모 컴포넌트
// Component: 현재 페이지 역할을 하는 컴포넌트
// pageProps: Component에 전달될 props
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/test');
  };

  return (
    <>
      <header>
        <Link href='/'>index</Link>
        &nbsp;
        <Link href='/search'>search</Link>
        &nbsp;
        <Link href='/book/1'>book/1</Link>
        <div>
          <button onClick={handleButtonClick}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
