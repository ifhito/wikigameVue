import { mount } from "@vue/test-utils";
import Button from "../../components/Atoms/Button.vue";
import { describe, test, expect } from "vitest";
import { ref } from "vue";

describe("ボタンコンポーネントのテスト", () => {
  test("ボタン要素がレンダリングされること", async () => {
    const text = ref("");
    const button = mount(Button, {
      props: {
        buttonType: "button",
        buttonValue: "test",
        onClick: (e: any) => (text.value = "test"),
      },
      slots: {
        default: "ボタン",
      },
    });
    expect(button.html()).toContain("ボタン");
    await button.trigger("click");
    expect(text.value).toBe("test");
  });
});
