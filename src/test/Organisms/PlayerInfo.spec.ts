import { mount, shallowMount } from "@vue/test-utils";
import PlayerInfo from "../../components/Organisms/PlayerInfo.vue";
import { describe, test, expect, beforeEach } from "vitest";
import { ref } from "vue";

describe("PlayerInfoのテスト", () => {
  const wrapper = shallowMount(PlayerInfo, {
    props: {
      answer: "test",
      nowName: "testUser",
      submitUser: ["testUser", "testUser2", "testUser3"],
      myName: "testUser2",
    },
  });
  test("表示されたコンテンツが予測した結果になっている", async () => {
    console.log(wrapper.html());
    expect(wrapper.html()).toContain("<div>あなたの答え: test</div>");
    expect(wrapper.html()).toContain("<div>現在のターン: testUser</div>");
  });
});
