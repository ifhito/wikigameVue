import { beforeEach, describe, expect, it, test } from "vitest";
import { useFixHTML, useDecideAction } from "../customHooks";
import { nextTick, ref } from "vue";

describe("test of useFixHTML", () => {
  test("HTMLを入力したときに、body, title, aListが正しく取得できること", () => {
    const HTMLBody = ref(
      '<!DOCTYPE html><html lang="ja"><head>  <meta charset="UTF-8" />  <link rel="icon" href="/favicon.ico" />  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  <title>WikiGame</title></head><body>  <h1 id="firstHeading">test</h1><div id="mw-content-text">testがこれです<a href="https://xxxxxxxhogehoge.cotest">test</a>、それでテストになりそうなことが喜びと悲しみなんですよ.<a href="https://teste.ssss">yuuuutest</a>とはなんなのだろうか?<div class="reference">Reference</div></div></body></html>'
    );
    const { body, title, aList } = useFixHTML(HTMLBody);
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
  const {
    answer,
    connectNum,
    submitUser,
    connect,
    switchAction,
    errorMessage,
    errorStatus,
    winner,
    defineWinner,
    jsonBody,
    nowNumber,
    nowName,
    gameStatus,
    isNotFound,
    notFoundText,
  } = useDecideAction();
  test("errorのアクションが来た際に、errorStatusがtrueになり、errorMessageにエラーメッセージが入る", () => {
    const message = {
      action: "error",
      message: "errorです",
    };
    switchAction(message);
    expect(errorStatus.value).toBe(true);
    expect(errorMessage.value).toBe("errorです");
  });
  test("subscribedのアクションが来た際に、subscribeRefのオブジェクトの値が渡され、変数に入ること", () => {
    const message = {
      action: "subscribed",
      answerTitle: "テスト - Wikipedia",
      nameList: ["test"],
      connectNumber: 0,
    };
    switchAction(message);
    expect(answer.value).toBe("テスト");
    expect(submitUser.value).toEqual(["test"]);
    expect(connectNum.value).toBe(0);
    expect(isNotFound.value).toBe(false);
  });
  test("start_gameのアクションが来た際に、startGameRef変数に値が入ること", () => {
    const message = {
      action: "start_game",
      nextNumber: 1,
      nextName: "testUser",
      data: '<!DOCTYPE html><html lang="ja"><head>  <meta charset="UTF-8" />  <link rel="icon" href="/favicon.ico" />  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  <title>WikiGame</title></head><body>  <h1 id="firstHeading">test</h1><div id="mw-content-text">testがこれです<a href="https://xxxxxxxhogehoge.cotest">test</a>、それでテストになりそうなことが喜びと悲しみなんですよ.<a href="https://teste.ssss">yuuuutest</a>とはなんなのだろうか?<div class="reference">Reference</div></div></body></html>',
    };
    switchAction(message);
    expect(nowNumber.value).toBe(1);
    expect(nowName.value).toBe("testUser");
    expect(jsonBody.value).toBe(
      '<!DOCTYPE html><html lang="ja"><head>  <meta charset="UTF-8" />  <link rel="icon" href="/favicon.ico" />  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  <title>WikiGame</title></head><body>  <h1 id="firstHeading">test</h1><div id="mw-content-text">testがこれです<a href="https://xxxxxxxhogehoge.cotest">test</a>、それでテストになりそうなことが喜びと悲しみなんですよ.<a href="https://teste.ssss">yuuuutest</a>とはなんなのだろうか?<div class="reference">Reference</div></div></body></html>'
    );
    expect(gameStatus.value).toBe(true);
    expect(isNotFound.value).toBe(false);
  });
  test("send_urlのアクションが来た際に、startGameRef変数に値が入ること", () => {
    const message = {
      action: "send_url",
      nextNumber: 1,
      nextName: "testUser",
      data: '<!DOCTYPE html><html lang="ja"><head>  <meta charset="UTF-8" />  <link rel="icon" href="/favicon.ico" />  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  <title>WikiGame</title></head><body>  <h1 id="firstHeading">test</h1><div id="mw-content-text">testがこれです<a href="https://xxxxxxxhogehoge.cotest">test</a>、それでテストになりそうなことが喜びと悲しみなんですよ.<a href="https://teste.ssss">yuuuutest</a>とはなんなのだろうか?<div class="reference">Reference</div></div></body></html>',
    };
    switchAction(message);
    expect(nowNumber.value).toBe(1);
    expect(nowName.value).toBe("testUser");
    expect(jsonBody.value).toBe(
      '<!DOCTYPE html><html lang="ja"><head>  <meta charset="UTF-8" />  <link rel="icon" href="/favicon.ico" />  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  <title>WikiGame</title></head><body>  <h1 id="firstHeading">test</h1><div id="mw-content-text">testがこれです<a href="https://xxxxxxxhogehoge.cotest">test</a>、それでテストになりそうなことが喜びと悲しみなんですよ.<a href="https://teste.ssss">yuuuutest</a>とはなんなのだろうか?<div class="reference">Reference</div></div></body></html>'
    );
    expect(gameStatus.value).toBe(true);
    expect(isNotFound.value).toBe(false);
  });
  test("decied_winnerのアクションが来た際に、deciedWinnerRefに値が入ること", () => {
    const message = {
      action: "decied_winner",
      winner: "testUser",
    };
    switchAction(message);
    expect(winner.value).toBe("testUser");
    expect(defineWinner.value).toBe(true);
    expect(isNotFound.value).toBe(false);
  });

  test("notFoundのアクションが来たときに、notFoundRefに値が入ること", () => {
    const message = {
      action: "not_found",
      notFoundText: "test",
    };
    switchAction(message);
    expect(isNotFound.value).toBe(true);
    expect(notFoundText.value).toBe("test");
  });
});
