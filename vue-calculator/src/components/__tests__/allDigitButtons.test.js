import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Calculator from "../calculator.vue";

test("clear resets current, previous, operator, previousOperator, and endOfCalculation", async () => {
  const wrapper = mount(Calculator);

  // Set values to the props
  wrapper.vm.current = "1";
  wrapper.vm.previous = "2";
  wrapper.vm.operator = "+";
  wrapper.vm.previousOperator = "*";
  wrapper.vm.endOfCalculation = "Y";

  // Execute the clear method
  await wrapper.vm.clear();

  // Expect all properties to be reset
  expect(wrapper.vm.current).toBe("");
  expect(wrapper.vm.previous).toBe("");
  expect(wrapper.vm.operator).toBe("");
  expect(wrapper.vm.previousOperator).toBe("");
  expect(wrapper.vm.endOfCalculation).toBe("");
});
