import { mount } from "@vue/test-utils";
import Input from "../../components/Atoms/Input.vue";
import { describe, test, expect, beforeEach } from "vitest";
import { ref } from "vue";

describe("inputコンポーネントのテスト", () => {
  test("inputに入力すると文字が入力される", async () => {
    const vModelTest = ref("");
    const wrapper = mount(Input, {
      props: {
        inputId: "test",
        vModel: vModelTest,
        type: "text",
      },
    });

    await wrapper.find("#test").setValue("test");
    expect(wrapper.vm.vModel).toBe("test");
  });
});
