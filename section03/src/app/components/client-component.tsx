'use client';

import { ReactNode } from 'react';

export default function ClientComponent({ children }: { children: ReactNode }) {
  console.log('클라이언트 컴포넌트!');

  // 원래는 클라이언트 컴포넌트에서 서버 컴포넌트를 import 할 수 없지만
  // next에서 자동으로 서버 컴포넌트를 클라이언트 컴포넌트로 바꾼다
  // 꼭 자식으로 둬야 한다면 클라이언트 컴포넌트에서 서버 컴포넌트를 import 하는 대신에
  // children으로 서버 컴포넌트를 넘겨주자
  return <div>{children}</div>;
}
