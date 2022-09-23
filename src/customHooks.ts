import { ref, computed } from "vue";

export const useFixHTML = (jsonBody) => {
  const aList = ref<string[]>([]);
  const title = ref<string | null | undefined>("");
  // タイトル名を取得する
  const getHeader = (parseBody: Document) => {
    title.value = parseBody?.getElementById("firstHeading")?.textContent;
    // console.log(title.value, answer.value, title.value === answer.value)
  };

  // references要素を削除する
  const deleteRef = (main: HTMLElement | null) => {
    const refElement = main?.querySelectorAll(".references");
    // console.log(refElement)
    const refLen = refElement?.length;
    if (refLen === 0 || !refLen) return;
    for (let key in [...Array(refLen).keys()]) {
      refElement[key]?.remove();
    }
  };

  // リンクのリストを作る(ボタンに変更する必要があるため)
  const createAList = (main: HTMLElement | null) => {
    const linkList = main?.querySelectorAll("a");
    linkList?.forEach((link) => {
      aList.value.push(link.textContent as string);
    });
  };
  // 表示するためのHTMLのリスト要素を見る
  const createBodyList = (main: HTMLElement, parser: DOMParser) => {
    const BodyList = main.innerHTML.split(/<a(?: .+?)?>.*?<\/a>/g);
    const newBodyList = BodyList.map((b) => {
      const dom = parser.parseFromString(b, "text/html");
      return dom.documentElement.textContent;
    });
    return newBodyList;
  };
  // websocketからメッセージが来て変更があった場合にbodyを書き換える
  const body = computed(() => {
    aList.value = [];
    title.value = "";
    const parser = new DOMParser();
    const parseBody = parser.parseFromString(jsonBody.value, "text/html");
    const main = parseBody?.getElementById("mw-content-text");
    getHeader(parseBody);
    deleteRef(main);
    createAList(main);
    const bodyList = createBodyList(main as HTMLElement, parser);
    return bodyList;
  });

  return { body, title, aList };
};
