<script>
export default {
  data() {
    return { current: "", previous: null, operator: null };
  },
  methods: {
    clear() {
      this.current = "";
    },
    backspace() {
      this.current = this.current.slice(0, -1);
    },
    sum(a, b) {
      return a + b;
    },
    subtract(a, b) {
      return a - b;
    },
    multiply(a, b) {
      return a * b;
    },
    divide(a, b) {
      if (a === 0) {
        return 0;
      }
      if (b === 0) {
        return "User Error";
      } else return a / b;
    },
    equals(operator) {
      switch (operator) {
        case "+":
          this.current = this.sum(
            parseFloat(this.previous),
            parseFloat(this.current)
          );
        case "-":
          this.current = this.subtract(
            parseFloat(this.previous),
            parseFloat(this.current)
          );

        case "*":
          this.current = this.multiply(
            parseFloat(this.previous),
            parseFloat(this.current)
          );

        case "/":
          this.current = this.divide(
            parseFloat(this.previous),
            parseFloat(this.current)
          );
      }
    },
    numberInput(digit) {
      this.current = `${this.current}${digit}`;
    },
    checkKey(event) {
      console.log(event.key);
      if (event.key !== "Shift") {
        const numberArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        const operatorArray = ["+", "-", "*", "/"];

        if (numberArray.includes(event.key)) {
          this.numberInput(event.key.toString());
        }
        if (operatorArray.includes(event.key)) {
          this.previous = parseFloat(this.current);
          this.current = "";
          this.operator = event.key.toString();
        }
        switch (event.key.toString()) {
          case "Backspace":
            this.backspace();
            break;
          case "=":
          case "Enter":
            this.equals(this.operator);
            break;
        }
      }
    },
  },
  mounted() {
    window.addEventListener("keyup", this.checkKey);
  },
};
</script>

<template>
  <div class="calculator rounded-md shadow-lg">
    <div class="display text-7xl sh">{{ current || "0" }}</div>
    <button class="button operator">+</button>
    <button class="button operator">-</button>
    <button class="button operator">x</button>
    <button class="button operator">/</button>
    <button @click="numberInput('1')" class="button">1</button>
    <button @click="numberInput('2')" class="button">2</button>
    <button @click="numberInput('3')" class="button">3</button>
    <button @click="backspace" class="button operator"><-</button>
    <button @click="numberInput('4')" class="button">4</button>
    <button @click="numberInput('5')" class="button">5</button>
    <button @click="numberInput('6')" class="button">6</button>
    <button class="button operator row-span-3">=</button>
    <button @click="numberInput('7')" class="button">7</button>
    <button @click="numberInput('8')" class="button">8</button>
    <button @click="numberInput('9')" class="button">9</button>
    <button class="button bg-gray-200">.</button>
    <button @click="numberInput('0')" class="button">0</button>
    <button @click="clear" class="button bg-gray-200">AC</button>
  </div>
</template>

<style scoped>
.calculator {
  width: 50vw;
  height: 40vw;
  min-height: max-content;
  max-height: max-content;
  display: grid;
  grid-template-rows: auto 15% 15% 15% 15% 15%;
  grid-template-columns: 25% 25% 25% 25%;

  border: black 1px solid;
}

.display {
  background-color: black;
  color: #eee;
  grid-column-start: 1;
  grid-column-end: 5;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 5%;
  padding-left: 5%;
}
.button {
  font-size: large;
  border: solid lightgrey 1px;
  border-radius: inherit;
}
.operator {
  background-color: orange;
}
</style>
