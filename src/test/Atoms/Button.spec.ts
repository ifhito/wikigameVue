import { mount } from "@vue/test-utils";
import Button from "../../components/Atoms/Button.vue";
import { describe, test, expect, beforeEach } from "vitest";
import { ref } from "vue";

describe("ボタンコンポーネントのテスト", () => {
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
  test("ボタン要素がレンダリングされること", () => {
    expect(button.html()).toContain("ボタン");
  });
  test("ボタンをクリックすると値が変更されること", async () => {
    await button.trigger("click");
    expect(text.value).toBe("test");
  });
});
