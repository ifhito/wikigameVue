import { mount, shallowMount } from "@vue/test-utils";
import SentenceBody from "../../components/Organisms/SentenceBody.vue";
import { describe, test, expect, beforeEach } from "vitest";
import { ref } from "vue";

describe("withinputのテスト", () => {
  const testRef = ref("");
  const wrapper = mount(SentenceBody, {
    props: {
      body: [
        "testがこれです",
        "、それでテストになりそうなことが喜びと悲しみなんですよ.",
        "とはなんなのだろうか?",
      ],
      myName: "testUser",
      nowName: "testUser",
      aList: ["test", "yuuuutest"],
      delA: ["編集", "英語版", ""],
      onClickSendText: (event) =>
        (testRef.value = event.target.getAttribute("value")),
    },
  });
  test("表示されたコンテンツが予測した結果になっている", async () => {
    console.log(wrapper.html());
    expect(wrapper.html()).contain("<span>testがこれです</span>");
    expect(wrapper.html()).contain(
      "<span>、それでテストになりそうなことが喜びと悲しみなんですよ.</span>"
    );
    expect(wrapper.html()).contain("<span>とはなんなのだろうか?</span>");
    expect(wrapper.findAll("button").at(0)?.text()).toEqual("test");
    expect(wrapper.findAll("button").at(1)?.text()).toEqual("yuuuutest");
    await wrapper.findAll("button").at(0)?.trigger("click");
    expect(testRef.value).toBe("test");
    await wrapper.findAll("button").at(1)?.trigger("click");
    expect(testRef.value).toBe("yuuuutest");
  });
});
