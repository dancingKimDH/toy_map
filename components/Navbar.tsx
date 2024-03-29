import { useState } from "react";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const { data, status } = useSession();

    return (
        <>

            <div className="navbar">
                <div className="navbar__logo">
                    <Link href="/"> nextmap </Link></div>
                <div className="navbar__list">
                    <Link className="navbar__list-item" href="/stores" onClick={() => setIsOpen(false)}>맛집 목록</Link>
                    <Link className="navbar__list-item" href="/stores/new" onClick={() => setIsOpen(false)}>맛집 등록</Link>
                    <Link className="navbar__list-item" href="/users/mypage" onClick={() => setIsOpen(false)}>마이페이지</Link>
                    <Link className="navbar__list-item" href="/users/likes" onClick={() => setIsOpen(false)}>찜한 가게</Link>

                    {status === "authenticated" ? <button onClick={() => signOut()}>로그아웃</button> : <Link className="navbar__list-item" href="/api/auth/signin">로그인</Link>}

                </div>

                {/* 모바일 버튼 */}
                <div role="presentation" className="navbar__button" onClick={() => setIsOpen((val) => !val)}>
                    {isOpen ? <AiOutlineClose /> : <BiMenu />}
                </div>
            </div>

            {/* 모바일 navbar */}

            {isOpen && (
                <div className="navbar-mobile">
                    <div className="navbar__list-mobile">
                        <Link className="navbar__list-item-mobile" href="/stores" onClick={() => setIsOpen(false)}>맛집 목록</Link>
                        <Link className="navbar__list-item-mobile" href="/stores/new" onClick={() => setIsOpen(false)}>맛집 등록</Link>
                        <Link className="navbar__list-item" href="/users/mypage" onClick={() => setIsOpen(false)}>마이페이지</Link>
                        <Link className="navbar__list-item-mobile" href="/users/likes" onClick={() => setIsOpen(false)}>찜한 가게</Link>
                        {status === "authenticated" ? <div className="navbar__list-item" onClick={() => setIsOpen(false)}><button onClick={() => signOut()}>로그아웃</button></div> : <Link className="navbar__list-item" href="/api/auth/signin">로그인</Link>}
                    </div>
                </div>
            )}


        </>
    )
}