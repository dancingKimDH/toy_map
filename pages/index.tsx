import Layout from "@/component/Layout";
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Layout>
      <div>Map Index Page</div>
      <ul>
        <li><Link href="/stores">맛집 목록</Link></li>
        <li><Link href="/stores/new">맛집 생성</Link></li>
        <li><Link href="/stores/1">맛집 상세 페이지</Link></li>
        <li><Link href="/stores/1/edit">맛집 수정</Link></li>
        <li><Link href="/users/login">로그인</Link></li>
        <li><Link href="/users/mypage">마이페이지</Link></li>
        <li><Link href="/users/likes">찜한 맛집</Link></li>
      </ul>
      </Layout>
    </>
  );
}
