import { useRouter } from 'next/router';
import { ReactNode, useState, useEffect } from 'react';
import style from './searchable-layout.module.css';

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const q = router.query.q as string;

  // 서치바에 검색어 유지
  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onKeyDown={handleSearchEnter}
          onChange={handleSearchChange}
          placeholder='검색어를 입력하세요 ...'
        />
        <button onClick={handleSearchSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
