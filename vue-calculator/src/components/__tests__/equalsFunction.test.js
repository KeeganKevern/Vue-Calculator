import { test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import calculator from "../calculator.vue";

//Result = 10 [symbol] 3 (2dp)
const operatorProperties = [
  {
    symbol: "+",
    label: "plus",
    result: 13,
  },
  {
    symbol: "-",
    label: "minus",
    result: 7,
  },

  {
    symbol: "*",
    label: "multiply",
    result: 30,
  },
  {
    symbol: "/",
    label: "divide",
    result: "3.33", //Decimals return as a string, this result would be 3.33r if not truncated.
  },
];

test("Equals function calculates appropriately", async () => {
  for (const object of operatorProperties) {
    //Mounting the calculator inside of the loop resets the component state before each operator/test is run
    const wrapper = mount(calculator);

    wrapper.vm.current = 3;
    wrapper.vm.previous = 10;

    //Mock Class List for "clear()" part of equals()
    const mockClassList = {
      add: vi.fn(),
      remove: vi.fn(),
      contains: vi.fn().mockReturnValue(true), // Mock `contains` to return `true`
    };

    // Mock document.getElementById to return the mock classList
    vi.spyOn(document, "getElementById").mockImplementation((id) => {
      return {
        classList: mockClassList,
      };
    });

    await wrapper.vm.equals(object.symbol);

    expect(wrapper.vm.current).toBe(object.result);

    //This displayes that each operator has been tested.
    console.log(object.label + " pass");
  }
});

test("Divide by zero gives error", async () => {
  const wrapper = mount(calculator);

  wrapper.vm.current = 0;
  wrapper.vm.previous = 1;
  wrapper.vm.operator = "/";

  await wrapper.vm.equals("/");

  expect(wrapper.vm.current).toBe("DIV/0 Error");
});
