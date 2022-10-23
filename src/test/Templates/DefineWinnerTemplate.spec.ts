import { mount, shallowMount } from "@vue/test-utils";
import DefineWinnerTemplate from "../../components/Templates/DefineWinnerTemplate.vue";
import { describe, test, expect, beforeEach } from "vitest";
import { ref } from "vue";

describe("DefineWinnerTemplateのテスト", () => {
  const testRef = ref(false);
  const wrapper = shallowMount(DefineWinnerTemplate, {
    props: {
      winner: "testUser",
    },
  });
  test("表示されたコンテンツが予測した結果になっている", async () => {
    expect(wrapper.html()).contain("<div>testUserが勝者です</div>");
  });
});
