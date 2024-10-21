<script>
export default {
  data() {
    return { current: "", previous: "", operator: "" };
  },
  methods: {
    clear() {
      this.current = "";
      this.previous = "";
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
      // Define operations
      const operations = {
        "+": this.sum,
        "-": this.subtract,
        "*": this.multiply,
        "/": this.divide,
      };

      // Check if the operator is valid
      if (operations[operator]) {
        // Perform the operation, round to two decimals, and then apply truncateTrailingZeros
        const result = operations[operator].call(
          this,
          parseFloat(this.previous),
          parseFloat(this.current)
        );

        // Handle division by zero case
        if (operator === "/" && parseFloat(this.current) === 0) {
          this.current = "User Error";
        } else {
          // Round the result to two decimal places and then apply truncateTrailingZeros
          if (result.length >= 14) {
            this.current = "Number too long";
          } else {
            this.current = this.truncateTrailingZeros(result.toFixed(2));
          }
        }
      } else {
        this.current = "Default";
      }
    },

    truncateTrailingZeros(a) {
      //If value ends in n.00, floor the value and return n (returns int but can recieve float)
      if (a % 1 === 0) {
        return Math.floor(a);
      } else return a;
    },
    numberInput(digit) {
      if (digit !== "." || !this.current.includes(".")) {
        this.current = `${this.current}${digit}`;
      }
      if (this.current.length >= 14) {
        this.current = "Number too long";
      }

      // if (digit === ".") {
      //   if (this.current.includes(".")) {
      //   } else {
      //     this.current = `${this.current}${digit}`;
      //   }
      // } else {
      //   this.current = `${this.current}${digit}`;
      // }
    },
    currentToPrevious() {
      this.previous = parseFloat(this.current);
      this.current = "";
    },
    checkKey(event) {
      if (event.key !== "Shift") {
        const numberArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        const operatorArray = ["+", "-", "*", "/"];

        if (numberArray.includes(event.key)) {
          //Check to see if number input
          this.numberInput(event.key.toString());
        } else if (operatorArray.includes(event.key)) {
          //check to see if operator input
          this.operator = event.key.toString();
          this.currentToPrevious();
        }

        switch (event.key.toString()) {
          case "Backspace":
            this.backspace();
            break;
          case "=":
          case "Enter":
            console.log(this.current);
            console.log(this.previous);
            this.equals(this.operator);
            break;
          case ".":
            this.numberInput(".");
        }
      }
    },
    operatorClick(decimalAsciiForOperator) {
      switch (decimalAsciiForOperator) {
        case 42:
          this.operator = "*";
          break;
        case 43:
          this.operator = "+";
          break;
        case 45:
          this.operator = "-";
          break;
        case 47:
          this.operator = "/";
          break;
      }
      this.previous = parseFloat(this.current);
      this.current = "";
    },
  },
  mounted() {
    window.addEventListener("keyup", this.checkKey);
  },
};
</script>

<template>
  <div class="calculator rounded-md shadow-lg">
    <div class="display text-6xl">{{ current || "0" }}</div>
    <button @click="operatorClick(43)" class="button operator">+</button>
    <button @click="operatorClick(45)" class="button operator">-</button>
    <button @click="operatorClick(42)" class="button operator">x</button>
    <button @click="operatorClick(47)" class="button operator">/</button>
    <button @click="numberInput('1')" class="button">1</button>
    <button @click="numberInput('2')" class="button">2</button>
    <button @click="numberInput('3')" class="button">3</button>
    <button @click="backspace" class="button operator"><-</button>
    <button @click="numberInput('4')" class="button">4</button>
    <button @click="numberInput('5')" class="button">5</button>
    <button @click="numberInput('6')" class="button">6</button>
    <button @click="equals(this.operator)" class="button operator row-span-3">
      =
    </button>
    <button @click="numberInput('7')" class="button">7</button>
    <button @click="numberInput('8')" class="button">8</button>
    <button @click="numberInput('9')" class="button">9</button>
    <button @click="numberInput('.')" class="button !bg-gray-200">.</button>
    <button @click="numberInput('0')" class="button">0</button>
    <button @click="clear" class="button !bg-gray-200">AC</button>
  </div>
</template>

<style scoped>
.calculator {
  width: 50vw;
  height: 40vw;
  min-height: 300px;
  min-height: 300px;
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
  background-color: orange;
}
</style>
