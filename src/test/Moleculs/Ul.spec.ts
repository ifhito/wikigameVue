import { mount } from "@vue/test-utils";
import Ul from "../../components/Moleculs/Ul.vue";
import { describe, test, expect, beforeEach } from "vitest";
import { ref } from "vue";

describe("ulのテスト", () => {
  const wrapper = mount(Ul, {
    props: {
      submitUser: ["test", "test1", "test2", "test3"],
      myName: "test1",
    },
  });
  test("表示されたulコンテンツが予測した結果になっている", async () => {
    expect(wrapper.findAll("li")[0].text()).toBe("test");
    expect(wrapper.findAll("li")[1].html()).toBe(
      "<li>test1<span>あなた</span></li>"
    );
    expect(wrapper.findAll("li")[2].text()).toBe("test2");
    expect(wrapper.findAll("li")[3].text()).toBe("test3");
  });
});
