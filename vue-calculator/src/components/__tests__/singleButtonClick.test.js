import { test, expect } from "vitest";

import { mount } from "@vue/test-utils";

import Calculator from "../calculator.vue";

test("update current value to 1 when 1 button is clicked", async () => {
  const wrapper = mount(Calculator);

  //find the button
  const button = wrapper.find('button[aria-label = "1"]');

  //simulate click event
  await button.trigger("click");

  expect(wrapper.vm.current).toBe("1");
});
