import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Calculator from "../calculator.vue";

test(
  "clear resets current, previous, operator, previousOperator, and endOfCalculation "
),
  async () => {
    const wrapper = mount(Calculator);

    //Set values to the props
    wrapper.vm.current = "1";
    wrapper.vm.previous = "2";
    wrapper.vm.operator = "+";
    wrapper.vm.previousOperator = "*";
    wrapper.vm.endOfCalculation = "Y";

    // Mock the document.getElementById method to simulate removing class (clear method)
    vi.spyOn(document, "getElementById").mockReturnValue({
      classList: { remove: vi.fn() },
    });

    //execute backspace funciton
    await wrapper.vm.clear();
    //expect current to be 1
    expect(wrapper.vm.current).toBe("");
    expect(wrapper.vm.previous).toBe("");
    expect(wrapper.vm.operator).toBe("");
    expect(wrapper.vm.previousOperator).toBe("");
    expect(wrapper.vm.endOfCalculation).toBe(" ");

    expect(document.getElementById).toHaveBeenCalledWith("+");
    expect(document.getElementById().classList.remove).toHaveBeenCalledWith(
      "!bg-blue-400"
    );
  };
