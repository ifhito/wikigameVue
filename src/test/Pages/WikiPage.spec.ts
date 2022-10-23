import { mount, shallowMount } from "@vue/test-utils";
import App from "../../App.vue";
import { WebSocket } from "mock-socket";
import {
  describe,
  expect,
  it,
  test,
  isMockFunction,
  vi,
  afterEach,
  afterAll,
} from "vitest";
// TODO: 下に入れられるようにしたい
const useDecideActionMock = vi.fn();
const useFixHTMLMock = vi.fn(() => fixHTMLReturnValue);
import WikiPage from "../../components/Pages/WikiPage.vue";
import ErrorTemplate from "../../components/Templates/ErrorTemplate.vue";
import ConnectTemplate from "../../components/Templates/ConnectTemplate.vue";
import BeforeStartTemplate from "../../components/Templates/BeforeStartTemplate.vue";
import MainGameTemplate from "../../components/Templates/MainGameTemplate.vue";
import DefineWinnerTemplate from "../../components/Templates/DefineWinnerTemplate.vue";
const decideActionReturnValue = {
  switchAction: () => {},
  answer: "testAnswer",
  connectNum: 1,
  submitUser: ["testUser", "testUser2"],
  connect: false,
  jsonBody: "test",
  nowNumber: 2,
  nowName: "testUser2",
  gameStatus: false,
  winner: "",
  defineWinner: false,
  errorMessage: "error",
  errorStatus: false,
};
const fixHTMLReturnValue = {
  body: ["test", "test"],
  title: "test",
  aList: ["testa", "testa"],
};

vi.mock("../../customHooks", () => ({
  useDecideAction: useDecideActionMock,
  useFixHTML: useFixHTMLMock,
}));
vi.mock("vue-router", () => ({
  useRoute: vi.fn(() => ({
    query: { roomName: "36cpj6cpj6d", name: "testUser" },
  })),
}));
global.WebSocket = WebSocket;

describe("WikiPageのテスト", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
  test("errorStatusがtrueになっているときはエラー画面が表示される", async () => {
    useDecideActionMock.mockReturnValue({
      ...decideActionReturnValue,
      errorStatus: true,
    });
    const wrapper = shallowMount(WikiPage);
    await expect(wrapper.findComponent(ErrorTemplate).exists()).toBe(true);
  });
  test("connectがfalseのときは通信中画面が表示される", async () => {
    useDecideActionMock.mockReturnValue({
      ...decideActionReturnValue,
      connect: false,
    });
    const wrapper = shallowMount(WikiPage);
    await expect(wrapper.findComponent(ConnectTemplate).exists()).toBe(true);
  });
  test("gameStatusがfalseのときゲームスタート前画面が表示される", async () => {
    useDecideActionMock.mockReturnValue({
      ...decideActionReturnValue,
      connect: true,
      gameStatus: false,
    });
    const wrapper = shallowMount(WikiPage);
    await expect(wrapper.findComponent(BeforeStartTemplate).exists()).toBe(
      true
    );
  });
  test("defineWinnerがfalseでgameStatusがtrueの場合、ゲーム中画面になる", async () => {
    useDecideActionMock.mockReturnValue({
      ...decideActionReturnValue,
      connect: true,
      gameStatus: true,
      defineWinner: false,
    });
    const wrapper = shallowMount(WikiPage);
    await expect(wrapper.findComponent(MainGameTemplate).exists()).toBe(true);
  });
  test("勝者が決定した後は勝者画面が表示される", async () => {
    useDecideActionMock.mockReturnValue({
      ...decideActionReturnValue,
      connect: true,
      gameStatus: true,
      defineWinner: true,
    });
    const wrapper = shallowMount(WikiPage);
    await expect(wrapper.findComponent(DefineWinnerTemplate).exists()).toBe(
      true
    );
  });
});
