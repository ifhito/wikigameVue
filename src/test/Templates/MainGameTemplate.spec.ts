import { mount, shallowMount } from "@vue/test-utils";
import MainGameTemplate from "../../components/Templates/MainGameTemplate.vue";
import { describe, test, expect, beforeEach } from "vitest";
import { ref } from "vue";

describe("MainGameTemplateのテスト", () => {
  const testRef = ref(false);
  const wrapper = shallowMount(MainGameTemplate, {
    props: {
      title: "testContent",
      body: ["生きている", "なぜなんだ"],
      myName: "testUser",
      nowName: "testUser",
      aList: ["友人", "革命"],
      delA: ["編集", "英語版", ""],
      onClickSendText: (e: any) => {
        testRef.value = true;
      },
      answer: "testContents",
      submitUser: ["testUser1", "testUser2"],
    },
  });
  test("titleが正しく表示されること", async () => {
    expect(wrapper.html()).contain("<h1>testContent</h1>");
  });
  test("isNotFoundがtrueの時に文章が表示されること", async () => {
    await wrapper.setProps({ isNotFound: true, notFoundText: "test" });
    expect(wrapper.find('div[id="notFound"]').text()).toBe(
      "testはwikipediaのページとして存在しません"
    );
  });
});
