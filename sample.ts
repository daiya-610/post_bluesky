import AtprotoAPI from "npm:@atproto/api";
import "https://deno.land/std@0.217.0/dotenv/load.ts";

// const idt = Deno.env.get("BLUESKY_IDENTIFIER");
// const pwd = Deno.env.get("BLUESKY_PASSWORD");

const { BskyAgent } = AtprotoAPI;

const agent = new BskyAgent({
  service: "https://bsky.social",
});

Deno.cron("auto post", "*/2 * * * *", async () => {
  //ログイン
  try {
    await agent.login({
      identifier: Deno.env.get("BLUESKY_IDENTIFIER") ?? "",
      password: Deno.env.get("BLUESKY_PASSWORD") ?? "",
    });
  } catch (e) {
    console.log(`ログインエラー: ${e}`);
    Deno.exit(1);
  }

  // 文字列を投稿
  await agent.post({
    text: Math.random().toString(),
    createdAt: new Date().toISOString(),
  });

  console.log("投稿したよ");
});

// const now = new Date().toISOString();

// 時間を投稿
// await agent.post({
//   text: now,
// });

// 投稿を削除
// const res = await agent.getTimeline();
// const deleteTarget = res.data.feed.filter((item) =>
//   item.post.record.text.includes("Hello")
// );
// // console.log(res.data.feed);
// console.log(deleteTarget);

// for (const target of deleteTarget) {
//   await agent.deletePost(target.post.uri);
// }

// 返信の数を返す
// const res = await agent.getTimeline();
// console.log(res.data.feed);
// const result = res.data.feed.filter((item) => {
//   if (!item.post.replyCount) return;
//   return item.post.replyCount >= 1;
// });

// for (const item of result) {
//   console.log(item.post.uri);
// }

// console.log(result);
