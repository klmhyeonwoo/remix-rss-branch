import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import './index.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
            rel="stylesheet"
            as="style"
            crossOrigin="true"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brunch-rss.blog" />
        <meta property="og:title" content="브런치 RSS" />
        <meta property="og:description" content="브런치의 RSS를 손쉽게 추출해보세요" />
        <meta property="og:site_name" content="브런치 RSS" />
        <meta property="keywords" content="브런치, 브런치 RSS 생성, 브런치 RSS 생성하기, 브런치 RSS 추출, 브런치 RSS 생성, 브런치 RSS"/>
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="icon" type="image/svg+xml" href="//t1.daumcdn.net/brunch/static/icon/favicon/brunchstory/favicon_20230406.ico" />
        <meta name="description" content="브런치의 RSS를 손쉽게 추출해보세요" />
        <title>브런치 RSS</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
