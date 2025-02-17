import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import calculator from "../calculator.vue";

test("all operators function when clicked", async () => {
  const wrapper = mount(calculator);

  //Grab Plus button
  const plusButton = wrapper.find(`button[aria-label = plus`);

  //Give a value to "Current" Prop
  wrapper.vm.current = "10";

  //Click plus button
  await plusButton.trigger("click");

  //Expect operator to be +
  expect(wrapper.vm.operator).toBe("+");

  //Expect previous value to become current value
  expect(wrapper.vm.previous).toBe(10);

  //Expect current value to become ""
  expect(wrapper.vm.current).toBe("");

  //Expect Element to be blue
  const element = document.getElementById(wrapper.vm.operator);

  expect(element.classList.contains("!bg-blue-400")).toBe(true);
});
