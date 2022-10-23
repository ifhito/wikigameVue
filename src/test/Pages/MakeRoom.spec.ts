import { mount, shallowMount } from "@vue/test-utils";
import MakeRoom from "../../components/Pages/MakeRoom.vue";
import {
  describe,
  test,
  expect,
  beforeEach,
  vi,
  isMockFunction,
  afterAll,
  afterEach,
} from "vitest";
import { ref } from "vue";

const routerPushMock = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

describe("MakeRoomのテスト", () => {
  const testRef = ref(false);
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
  test("すでにある部屋に入るボタンを押すと部屋IDを入れるとInput要素が出現する", async () => {
    const wrapper = mount(MakeRoom);
    await wrapper.find('button[id="inTheRoom"]').trigger("click");
    expect(wrapper.vm.roomNameBool).toBe(true);
    expect(wrapper.find('label[for="roomName"]').exists()).toBe(true);
  });
  test("roomIdが入らない状態で送信を押すとroomIdが作成されてページ遷移する", async () => {
    const wrapper = mount(MakeRoom);
    vi.spyOn(global.Math, "random").mockReturnValue(0.1);
    await wrapper.find("#name").setValue("testUser");
    await wrapper.find('button[id="send"]').trigger("click");
    expect(routerPushMock).toBeCalledWith({
      path: "/game",
      query: {
        name: "testUser_36cpj6cpj6d",
        roomName: "36cpj6cpj6d",
      },
    });
  });
  test("roomIdを追加してボタンを押すとそのroomIdでページ遷移する", async () => {
    const wrapper = mount(MakeRoom);
    vi.spyOn(global.Math, "random").mockReturnValue(0.1);
    await wrapper.find('button[id="inTheRoom"]').trigger("click");
    await wrapper.find("#roomName").setValue("36cpj6cpj6e");
    await wrapper.find("#name").setValue("testUser");
    await wrapper.find('button[id="send"]').trigger("click");
    expect(routerPushMock).toBeCalledWith({
      path: "/game",
      query: {
        name: "testUser_36cpj6cpj6d",
        roomName: "36cpj6cpj6e",
      },
    });
  });
});
