import { mount, shallowMount } from "@vue/test-utils";
import BeforeStartTemplate from "../../components/Templates/BeforeStartTemplate.vue";
import { describe, test, expect, beforeEach } from "vitest";
import { ref } from "vue";

describe("BeforeStartTemplateのテスト", () => {
  const testRef = ref(false);
  const wrapper = shallowMount(BeforeStartTemplate, {
    props: {
      connectNum: 1,
      roomName: "testRoom",
      onClickStartGame: (e: any) => (testRef.value = true),
    },
  });
  test("表示されたコンテンツが予測した結果になっている", async () => {
    expect(wrapper.html()).contain("<div>1</div>");
    expect(wrapper.html()).contain("<div>ルームID: testRoom</div>");
  });
});
