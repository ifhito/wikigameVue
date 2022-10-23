import { mount, shallowMount } from "@vue/test-utils";
import ErrorTemplate from "../../components/Templates/ErrorTemplate.vue";
import { describe, test, expect, beforeEach } from "vitest";
import { ref } from "vue";

describe("ErrorTemplateのテスト", () => {
  const wrapper = shallowMount(ErrorTemplate, {
    props: {
      errorMessage: "エラーです",
    },
  });
  test("エラーメッセージが表示される", async () => {
    expect(wrapper.html()).contain("<div>エラーです</div>");
  });
});
