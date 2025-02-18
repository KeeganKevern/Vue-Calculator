import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import calculator from "../calculator.vue";

test("single decimal is handled correctly", () => {
  const wrapper = mount(calculator);

  //Set Current value
  wrapper.vm.current = "1";

  //call the numberInput Method, by passing decimal
  wrapper.vm.numberInput(".");

  expect(wrapper.vm.current).toBe("1.");

  console.log("Single Decimal has passed");
});

test("second decimal is handled correctly", () => {
  const wrapper = mount(calculator);

  //Set Current value
  wrapper.vm.current = "1.2";

  //call the numberInput Method, by passing decimal
  wrapper.vm.numberInput(".");

  expect(wrapper.vm.current).toBe("1.2");

  console.log("Second Decimal has passed");
});
