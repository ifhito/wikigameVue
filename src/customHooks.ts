import { ref, computed, reactive, toRefs, Ref } from "vue";

export const useFixHTML = (jsonBody: Ref<string>) => {
  const aList = ref<string[]>([]);
  const title = ref<string>("");
  // タイトル名を取得する
  const getHeader = (parseBody: Document) => {
    title.value = parseBody?.getElementById("firstHeading")?.textContent || "";
  };

  // references要素を削除する
  const deleteRef = (main: HTMLElement | null) => {
    const refElements = main?.querySelectorAll(".reference, .reflist");
    const refLen = refElements?.length;
    if (refLen === 0 || !refLen) return;
    for (let key in [...Array(refLen).keys()]) {
      refElements[key]?.remove();
    }
  };

  const deleteTable = (main: HTMLElement | null) => {
    const tableElements = main?.querySelectorAll("table *");
    const tableLen = tableElements?.length;
    if (tableLen === 0 || !tableLen) return;
    for (let key in [...Array(tableLen).keys()]) {
      tableElements[key]?.remove();
    }
  };
  const deleteStyle = (main: HTMLElement | null) => {
    const styleElements = main?.querySelectorAll(
      'style *, [data-mw-deduplicate*="TemplateStyles"]'
    );
    const styleLen = styleElements?.length;
    if (styleLen === 0 || !styleLen) return;
    for (let key in [...Array(styleLen).keys()]) {
      styleElements[key]?.remove();
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
    deleteTable(main);
    deleteStyle(main);
    deleteRef(main);
    createAList(main);
    const bodyList = createBodyList(main as HTMLElement, parser);
    return bodyList;
  });

  return { body, title, aList };
};

export const useDecideAction = () => {
  //subscribeの処理
  const subscribeRef = reactive({
    answer: "",
    connectNum: 0,
    submitUser: [],
    connect: false,
  });

  // TODO: startGameだと名前的に微妙な気がする
  // startGameのリアクティブ
  const startGameRef = reactive({
    jsonBody: "",
    nowNumber: 0,
    nowName: "",
    gameStatus: false,
  });
  // diciedWinnerのリアクティブ
  const deciedWinnerRef = reactive({
    winner: "",
    defineWinner: false,
  });

  // エラーのリアクティブ
  const errorRef = reactive({
    errorMessage: "",
    errorStatus: false,
  });

  // htmlが見つからなかった場合のリアクティブ
  const notFoundRef = reactive({
    isNotFound: false,
    notFoundText: "",
  });

  const switchAction = (message: any) => {
    switch (message.action) {
      case "error":
        notFoundRef.isNotFound = false;
        errorRef.errorStatus = true;
        errorRef.errorMessage = message.message;
        break;
      case "subscribed":
        notFoundRef.isNotFound = false;
        subscribeRef.connect = true;
        if (!subscribeRef.answer)
          subscribeRef.answer = message.answerTitle.split(" - ")[0];
        subscribeRef.submitUser = message.nameList;
        subscribeRef.connectNum = message.connectNumber;
        break;
      case "start_game":
      case "send_url":
        notFoundRef.isNotFound = false;
        startGameRef.nowNumber = message.nextNumber;
        startGameRef.nowName = message.nextName;
        startGameRef.jsonBody = message.data;
        startGameRef.gameStatus = true;
        break;
      case "decied_winner":
        notFoundRef.isNotFound = false;
        deciedWinnerRef.winner = message.winner;
        deciedWinnerRef.defineWinner = true;
        break;
      case "not_found":
        notFoundRef.isNotFound = true;
        notFoundRef.notFoundText = message.notFoundText;
      default:
        return;
    }
  };

  return {
    switchAction,
    ...toRefs(subscribeRef),
    ...toRefs(startGameRef),
    ...toRefs(deciedWinnerRef),
    ...toRefs(errorRef),
    ...toRefs(notFoundRef),
  };
};
