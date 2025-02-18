import { test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import calculator from "../calculator.vue";

const numberKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operatorKeys = ["+", "-", "*", "/"];
const calculateKeys = ["=", "Enter"];

test("numerical keyboard inputs are managed appropriately", () => {
  const wrapper = mount(calculator);

  for (const number of numberKeys) {
    //Spy on the method expecting to be called
    const numericalSpy = vi.spyOn(wrapper.vm, "numberInput");
    //create the keyboard event
    const numericalEvent = new KeyboardEvent("keyup", { key: `${number}` });
    //instigate the event
    document.dispatchEvent(numericalEvent);

    //check the result
    expect(numericalSpy).toHaveBeenCalled();
    //log the result
    console.log(number + " has passed");
  }
});

test("operator keyboard inputs are managed appropriately", () => {
  const wrapper = mount(calculator);

  //Mock classLists to remove Uncaught Exceptions

  const mockClassList = {
    add: vi.fn(),
    remove: vi.fn(),
    contains: vi.fn().mockReturnValue(true), // Mock `contains` to return `true`
  };

  // when getElementByID is called, it is intercepted and the "function" is performed (mocked)
  vi.spyOn(document, "getElementById").mockImplementation((id) => {
    return {
      classList: mockClassList,
    };
  });

  for (const operator of operatorKeys) {
    const operatorSpy = vi.spyOn(wrapper.vm, "operatorClick");
    const operatorEvent = new KeyboardEvent("keyup", { key: `${operator}` });
    document.dispatchEvent(operatorEvent);

    expect(operatorSpy).toHaveBeenCalled();
    console.log(operator + " has passed");
  }
});

test("Equals/Enter keyboard inputs are managed appropriately", () => {
  const wrapper = mount(calculator);
  for (const calc of calculateKeys) {
    const calculateSpy = vi.spyOn(wrapper.vm, "equals");
    const calculateEvent = new KeyboardEvent("keyup", {
      key: `${calc}`,
    });
    document.dispatchEvent(calculateEvent);
    expect(calculateSpy).toHaveBeenCalled();
    console.log(calc + " has passed");
  }
});

test("Backspace keyboard input is managed appropriately", () => {
  const wrapper = mount(calculator);
  const backspaceSpy = vi.spyOn(wrapper.vm, "backspace");
  const backpaceEvent = new KeyboardEvent("keyup", { key: "Backspace" });
  document.dispatchEvent(backpaceEvent);
  expect(backspaceSpy).toHaveBeenCalled();
});

test("decimal keyboard input is managed appropriately", () => {
  const wrapper = mount(calculator);
  //spy
  const decimalSpy = vi.spyOn(wrapper.vm, "numberInput");
  //input
  const decimalEvent = new KeyboardEvent("keyup", { key: "." });
  //declare
  document.dispatchEvent(decimalEvent);
  //expect
  expect(decimalSpy).toHaveBeenCalled();
});
