import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // On-Demand ISR
    // 요청을 받을 때마다 페이지를 다시 생성하는 ISR
    await res.revalidate('/');
    return res.json({ revalidate: true });
  } catch (err) {
    res.status(500).send('Revalidation Failed');
  }
}
