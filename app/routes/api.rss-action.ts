import {ActionFunction, json} from "@remix-run/node";
import axios from "axios";

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