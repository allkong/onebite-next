import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next';
import style from './[id].module.css';
import fetchOneBook from '@/lib/fetch-one-book';
import { useRouter } from 'next/router';
import Head from 'next/head';

const mockData = {
  id: 1,
  title: '한 입 크기로 잘라 먹는 리액트',
  subTitle: '자바스크립트 기초부터 애플리케이션 배포까지',
  description:
    '자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.',
  author: '이정환',
  publisher: '프로그래밍인사이트',
  coverImgUrl:
    'https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg',
};

// 동적 경로를 갖는 SSG 페이지
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    // Fallback 옵션 설정 (없는 경로로 요청 시)
    // - false: path에 설정하지 않은 경로는 모두 404 반환
    // - blocking: SSR 방식으로 실시간으로 페이지 생성(사전 렌더링)
    // - true: SSR 방식 + props 데이터가 없는 fallback 상태의 페이지부터 반환
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  // [id].tsx는 무조건 url 파라미터가 하나 있어야만 접근할 수 있는 페이지임
  // 즉 여기서 url 파라미터가 아예 없다는 건 말이 되지 않기 때문에 '!'를 써도 안전함
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  // fallback 상태일 때 로딩 텍스트 띄어주기
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property='og:image' content='/thumbnail.png' />
          <meta property='og:title' content='한입북스' />
          <meta
            property='og:description'
            content='한입 북스에 등록된 도서들을 만나보세요'
          />
        </Head>
        <div>로딩중입니다</div>
      </>
    );
  }
  if (!book) return '문제가 발생했습니다. 다시 시도하세요.';

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:image' content={coverImgUrl} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
