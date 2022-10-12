import { mount, shallowMount } from "@vue/test-utils";
import WithInput from "../../components/Moleculs/WithInput.vue";
import { describe, test, expect, beforeEach } from "vitest";
import { ref } from "vue";

describe("withinputのテスト", () => {
  const wrapper = mount(WithInput, {
    props: {
      labelFor: "test",
    },
    slots: {
      label: "テストInput",
      formContents: '<input id="test"/>',
    },
  });
  test("表示されたulコンテンツが予測した結果になっている", async () => {
    expect(wrapper.find('[for="test"]')).toBeTruthy();
    expect(wrapper.find('input[id="test"]')).toBeTruthy();
  });
});
