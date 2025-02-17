import { test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import calculator from "../calculator.vue";

// // Equals Function
// // Test: When the equals button is clicked, it performs the correct operation using the previous and current values.
// // Reason: Verify that the equals() method computes the correct result for each operator (+, -, *, /), including rounding to two decimal places and handling division by zero.

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
