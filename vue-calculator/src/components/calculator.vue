<script>
export default {
  data() {
    return {
      current: "",
      previous: "",
      operator: "",
      previousOperator: "",
      wasEqualsPressed: "",
    };
  },
  methods: {
    clear() {
      this.current = "";
      this.previous = "";
      document.getElementById(this.operator).classList.remove("!bg-blue-400");
      this.operator = "";
      this.previousOperator = "";
      this.wasEqualsPressed = "";
    },
    backspace() {
      this.current = this.current.slice(0, -1);
    },

    equals(operator) {
      if (operator === "=") {
        this.wasEqualsPressed = "yes";
      }

      // Define operations
      const operations = {
        "+": (x, y) => x + y,
        "-": (x, y) => x - y,
        "*": (x, y) => x * y,
        "/": (x, y) => (y === 0 ? "User Error 1" : x / y),
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
          this.current = "User Error 2";
        } else {
          // Round the result to two decimal places and then apply truncateTrailingZeros
          if (result.length >= 14) {
            this.current = "Number too long";
          } else {
            this.current = this.truncateTrailingZeros(result.toFixed(2));
            this.updateDisplay(this.current);
            this.previous = "";
            document
              .getElementById(this.operator)
              .classList.remove("!bg-blue-400");
          }
        }
      } else {
        this.current = "User Error 3";
      }
    },

    truncateTrailingZeros(longDecimalDigit) {
      //If value ends in n.00, floor the value and return n (returns int but can recieve float)
      if (longDecimalDigit % 1 === 0) {
        return Math.floor(longDecimalDigit);
      } else return longDecimalDigit;
    },
    numberInput(digit) {
      //This allows a reset to occur after enter has been pressed, without removing the result too soon.
      if (this.wasEqualsPressed === "yes") {
        this.current = "0";
      }

      //A number will always pass through this if statement, a decimal will only pass if one does not already exist.
      if (digit !== "." || !this.current.includes(".")) {
        this.current = `${this.current}${digit}`;
      }

      //This limits the display value of the calculator.
      if (this.current.length >= 14) {
        this.updateDisplay("Number too long");
      }
    },

    currentToPrevious() {
      this.previous = parseFloat(this.current);
    },
    updateDisplay(value) {
      this.current = value;
    },
    checkKey(event) {
      if (event.key !== "Shift") {
        const numberArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        const operatorArray = ["+", "-", "*", "/"];

        if (numberArray.includes(event.key)) {
          //Check to see if number input
          this.numberInput(event.key.toString());
        } else if (operatorArray.includes(event.key)) {
          this.operatorClick(event.key);
        }

        switch (event.key.toString()) {
          case "Backspace":
            this.backspace();
            break;
          case "=":
          case "Enter":
            this.previousOperator = this.operator;
            this.equals(this.operator);
            break;
          case ".":
            this.numberInput(".");
        }
      }
    },
    operatorClick(givenOperator) {
      //This clears the previousDisplay and allows clean continuous calculations.
      if (this.previous === "") {
        this.previous = "0";
      }
      //If an operator has already been pressed we need to continuously calculate
      //I.e. perform equals after every new operator.
      if (this.operator !== "") {
        //remove previous operator "in use" colour, should one exist
        document.getElementById(this.operator).classList.remove("!bg-blue-400");
        this.equals(this.operator);
      }

      //If an operator has not been entered during this calculation, proceed as normal.
      this.operator = givenOperator;
      this.previous = parseFloat(this.current);
      this.current = "";
      document.getElementById(this.operator).classList.add("!bg-blue-400");
    },
  },
  mounted() {
    window.addEventListener("keyup", this.checkKey);
  },
};
</script>

<template>
  <div class="calculator rounded-md shadow-lg bg-black">
    <div id="previousDisplay" class="text-3xl b">
      {{ previous }}
    </div>
    <div class="display text-6xl">{{ current || "0" }}</div>
    <button
      @click="operatorClick('+')"
      id="+"
      class="button operator"
      aria-label="plus"
    >
      +
    </button>
    <button
      @click="operatorClick('-')"
      id="-"
      class="button operator"
      aria-label="minus"
    >
      -
    </button>
    <button
      @click="operatorClick('*')"
      id="*"
      class="button operator"
      aria-label="multiply"
    >
      x
    </button>
    <button
      @click="operatorClick('/')"
      id="/"
      class="button operator"
      aria-label="divide"
    >
      /
    </button>
    <button @click="numberInput('1')" class="button" aria-label="1">1</button>
    <button @click="numberInput('2')" class="button" aria-label="2">2</button>
    <button @click="numberInput('3')" class="button" aria-label="3">3</button>
    <button @click="backspace" class="button operator" aria-label="delete">
      <-
    </button>
    <button @click="numberInput('4')" class="button" aria-label="4">4</button>
    <button @click="numberInput('5')" class="button" aria-label="5">5</button>
    <button @click="numberInput('6')" class="button" aria-label="6">6</button>
    <button
      @click="equals(this.operator)"
      class="button operator row-span-3"
      aria-label="equals"
    >
      =
    </button>
    <button @click="numberInput('7')" class="button" aria-label="7">7</button>
    <button @click="numberInput('8')" class="button" aria-label="8">8</button>
    <button @click="numberInput('9')" class="button" aria-label="9">9</button>
    <button
      @click="numberInput('.')"
      class="button !bg-gray-200"
      aria-label="decimal"
    >
      .
    </button>
    <button @click="numberInput('0')" class="button" aria-label="0">0</button>
    <button @click="clear" class="button !bg-gray-200" aria-label="clear">
      AC
    </button>
  </div>
</template>

<style scoped>
.calculator {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 10vh auto 10vh 10vh 10vh 10vh 10vh;
  grid-template-columns: 25vw 25vw 25vw 25vw;
}

.display {
  background-color: black;
  color: #eee;
  grid-column-start: 1;
  grid-column-end: 5;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 2rem;
  font-size: 3rem;
}

#previousDisplay {
  grid-column-start: 1;
  grid-column-end: 5;
  padding: 5%;
  border-bottom: 2px solid orange;
  color: #eeeeeeb9;
  display: flex;
  justify-content: end;
}

.button {
  font-size: 2rem;
  border: solid lightgrey 1px;
  border-radius: inherit;
  background-color: orange;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.button:active {
  transform: translate(2px, 2px);
}

@media (min-width: 769px) {
  .calculator {
    width: 50vw;
    height: 40vw;
    min-height: 300px;
    min-height: 300px;
    border: black 1px solid;
    grid-template-rows: auto;
  }
  .display {
    font-size: clamp(40px, 9vw, 50px);
  }
}
</style>
