import { mount, shallowMount } from "@vue/test-utils";
import ConnectTemplate from "../../components/Templates/ConnectTemplate.vue";
import { describe, test, expect, beforeEach } from "vitest";
import { ref } from "vue";

describe("ConnectTemplateのテスト", () => {
  const wrapper = shallowMount(ConnectTemplate);
  test("通信中という文字が表示される", async () => {
    expect(wrapper.html()).toContain("<div>通信中</div>");
  });
});
