import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Calculator from "../calculator.vue";

test("backspace deletes a char from current", async () => {
  const wrapper = mount(Calculator);
  //Set the value of current to 12
  wrapper.vm.current = "12";
  //execute backspace funciton
  await wrapper.vm.backspace();
  //expect current to be 1
  expect(wrapper.vm.current).toBe("1");
});
