// CSS Module
import SearchableLayout from '@/components/searchable-layout';
import style from './index.module.css';
import { ReactNode, useEffect } from 'react';
import books from '@/mock/book.json';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';

// SSR 방식: getServerSideProps
// SSG 방식: getStaticProps
export const getStaticProps = async () => {
  console.log('인덱스 페이지');
  // 컴포넌트보다 먼저 실행되어서 컴포넌트에 필요한 데이터를 불러오는 함수
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

// SSR 방식: InferGetServerSidePropsType<typeof getServerSideProps>
// SSG 방식: InferGetStaticPropsType<typeof getStaticProps>
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
