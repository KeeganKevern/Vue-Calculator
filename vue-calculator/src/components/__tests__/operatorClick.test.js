import { test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import calculator from "../calculator.vue";

const operatorProperties = [
  {
    symbol: "+",
    label: "plus",
  },
  {
    symbol: "-",
    label: "minus",
  },
  {
    symbol: "*",
    label: "multiply",
  },
  {
    symbol: "/",
    label: "divide",
  },
];

test("all operators function when clicked", async () => {
  const wrapper = mount(calculator);

  // Mock the classList
  const mockClassList = {
    contains: vi.fn().mockReturnValue(true), // Mock `contains` to return `true`
    add: vi.fn(), // Mock `add` method
  };

  // Mock `document.getElementById` to return an object with the mocked `classList`
  vi.spyOn(document, "getElementById").mockReturnValue({
    classList: mockClassList,
  });

  for (const operator of operatorProperties) {
    const operatorButton = wrapper.find(
      `button[aria-label = "${operator.label}"]`
    );

    //Give a value to "Current" Prop
    wrapper.vm.current = 10;

    //Click operator button
    await operatorButton.trigger("click");

    //Expect operator to be -> symbol
    expect(wrapper.vm.operator).toBe(operator.symbol);
    //Expect previous value to become current value
    expect(wrapper.vm.previous).toBe(10);

    //Expect current value to become ""
    expect(wrapper.vm.current).toBe("");

    //Expect Element to be blue
    const element = document.getElementById(wrapper.vm.operator);
    expect(element.classList.contains("!bg-blue-400")).toBe(true);

    //Reset the value of operator to test the next operator
    wrapper.vm.operator = "";
  }
});
