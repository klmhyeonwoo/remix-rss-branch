import {ActionFunction, json, LoaderFunction} from "@remix-run/node";
import axios from "axios";
import {
  Form,
  Link,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigation,
  useViewTransitionState
} from "@remix-run/react";
import {css} from "@emotion/react";
import Input from "~/component/Input";
import Button from "~/component/Button";
import {DESIGN_SYSTEM_COLOR} from "~/variables";

interface actionType {
  rssLink: string;
  error: string;
}

export const action: ActionFunction = async ({ request }) => {
  function checkBrunchURL(url) {
    const regex = /^(https:\/\/)?brunch\.co\.kr\/@/;
    return regex.test(url);
  }

  try {
    const formData = await request.formData();
    const username = formData.get('username') as string;
    if (!username.trim()) return json({ error: "브런치 주소 또는 아이디에 빈 값은 넣을 수 없습니다."})

    const { data, status } = checkBrunchURL(username)
        ? await axios.get(`${username}`)
        : await axios.get(`https://brunch.co.kr/@${username}`);
    const regex = /<link\s+rel=["']alternate["']\s+type=["']application\/rss\+xml["']\s+[^>]*href=["']([^"']+)["']/i;
    const match = data.match(regex);
    if (match && match[1]) {
      const rssLink = match[1];
      return json({ rssLink });
    } else {
      return json({ error: "존재하지 않는 브런치 주소입니다." });
    }
  } catch (error) {
    return json({ error: "브런치 주소를 불러오는 도중 에러가 발생했어요" });
  }
}

export default function Index() {
  const fetcher= useFetcher<actionType>();
  const handleCopy = (url) => {
    window.navigator.clipboard.writeText(url).then(() => {
      alert("해당 RSS 주소가 복사가 되었습니다!");
    });
  }

  return (
      <section css={css`
        width: 100dvw;
        height:100dvh;
        display: flex;
        justify-content: center;
        align-items: center;
      `}>
        <div css={css`
          display: flex;
          flex-direction: column;
          width: 35rem;
          padding: 0 1rem;
        `}>
          <div css={css`
            display: flex;
            flex-direction: column;
            row-gap: 1rem;
          `}>
            <div css={css` 
            font-size: 2rem;
            font-weight: 600;
            letter-spacing: -0.03rem;
          `}> 브런치 RSS 생성 </div>
            <span> 쉽고 빠르게 브런치 RSS 추출을 해보세요 </span>
          </div>
          <fetcher.Form method="post" css={css`
            display: flex;
            flex-direction: column;
            row-gap: 1rem;
            margin-top: 3rem;
          `}>
            <Input type={'text'} name={'username'} placeholder={"브런치 주소 또는 브런치 아이디를 입력해주세요"}/>
            <Button type={"submit"}> RSS 추출하기 </Button>
          </fetcher.Form>
          <div css={css`
            min-height: 5rem;
            margin-top: 2rem;
            font-size: 1.2rem;
          `}>
            { fetcher.data?.rssLink ? <div css={css`
              display: flex;
              align-items: center;
            `}>
              <a href={fetcher.data?.rssLink} target="_blank" css={css`
                color: ${DESIGN_SYSTEM_COLOR.grey600};
                transition: 0.4s all;
                
                &:hover {
                  color: ${DESIGN_SYSTEM_COLOR.kreamBlack};
                }
              `}>{fetcher.data?.rssLink}</a>
              <div css={css`
                margin-left: auto;
                color: ${DESIGN_SYSTEM_COLOR.grey400};
                cursor: pointer;
              `}
               onClick={() => handleCopy(fetcher.data?.rssLink)}
              > 복사하기 </div>
            </div> : '' }
            <div css={css`
              color: ${DESIGN_SYSTEM_COLOR.grey500};
            `}> { fetcher.data?.error }</div>
          </div>
        </div>
      </section>
  )
}