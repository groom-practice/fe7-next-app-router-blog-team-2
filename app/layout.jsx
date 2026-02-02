import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <header className="border-b p-4">
          <nav className="flex gap-4">
            <Link href="/">홈</Link>
            <Link href="/write">글 작성</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
