import { mount } from "@vue/test-utils";
import App from "../App.vue";
import { describe, expect, it, test } from "vitest";

describe("スタート画面のテスト", () => {
  test("", () => {});
});

describe("実際のゲーム画面のテスト", () => {});

describe("エラー画面のテスト");

describe("websocketのonmessageのテスト", () => {
  test("action: errorが送られてきたとき", () => {});
  test("action: subscribedが送られてきたとき", () => {});
  test("action: start_gameが送られてきたとき", () => {});
  test("action: send_urlが送られてきたとき", () => {});
  test("action: decied_winnerが送られてきたとき", () => {});
});
