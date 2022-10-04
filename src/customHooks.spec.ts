import { describe, expect, it, test } from "vitest";
import { useFixHTML } from "./customHooks";
import { nextTick, ref } from "vue";

describe("test of useFixHTML", () => {
  test("HTMLを入力したときに、body, title, aListが正しく取得できること", async () => {
    const HTMLBody = ref(
      '<!DOCTYPE html><html lang="ja"><head>  <meta charset="UTF-8" />  <link rel="icon" href="/favicon.ico" />  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  <title>WikiGame</title></head><body>  <h1 id="firstHeading">test</h1><div id="mw-content-text">testがこれです<a href="https://xxxxxxxhogehoge.cotest">test</a>、それでテストになりそうなことが喜びと悲しみなんですよ.<a href="https://teste.ssss">yuuuutest</a>とはなんなのだろうか?<div class="reference">Reference</div></div></body></html>'
    );
    const { body, title, aList } = await useFixHTML(HTMLBody);
    expect(body.value).toEqual([
      "testがこれです",
      "、それでテストになりそうなことが喜びと悲しみなんですよ.",
      "とはなんなのだろうか?",
    ]);
    expect(title.value).toBe("test");
    expect(aList.value).toEqual(["test", "yuuuutest"]);
  });
});

describe("test of useDecideAction", () => {
  test("");
});
