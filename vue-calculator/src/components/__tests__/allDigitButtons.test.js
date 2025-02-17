import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import calculator from "../calculator.vue";

test("all digits update value", async () => {
  const wrapper = mount(calculator);

  // Grab all Digit buttons
  for (let i = 9; i >= 0; i--) {
    const button = wrapper.find(`button[aria-label = "${i}"]`);

    //Click all Digit buttons in reverse in order to incude 0
    await button.trigger("click");
  }

  //prove it works
  expect(wrapper.vm.current).toBe("9876543210");
});
