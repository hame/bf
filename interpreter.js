/***** Interpreter for Brainfuck *****/

/*
 * Code
 */

// Actual brainfuck program to interpret
let source =
  "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.";
// "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.>>+++.-.";
console.log(`Source code is: ${source}`);
console.log(`Source code length is ${source.length}`);

/*
 * Memory
 */

// Original implementation uses 30,000 memory cells
// Scaling that back to 100 for ease of console.log
let tape = new Array(100).fill(0); // Initialise all to 0

// Registers
let memory_pointer = 0; // Pointer to where on tape, think tape head
let instruction_pointer = 0; // Where we are in the program

// Stack
let loop_stack = []; // Used for creating the loop_lookup, for nested loops
let loop_lookup = {}; // Store the matching [] instruction address

/*
 * Parser
 */

// Loop through program to create the pointers for loops, specifically nested loops
for (let char of source) {
  if (char == "[") {
    loop_stack.push(instruction_pointer);
  }
  if (char == "]") {
    let stack_save = loop_stack.pop();
    loop_lookup[stack_save] = instruction_pointer;
    loop_lookup[instruction_pointer] = stack_save;
  }
  instruction_pointer++;
}

console.log(loop_lookup);

// Reset instruction_pointer after using
instruction_pointer = 0;

/*
 * Interpreter
 */
while (instruction_pointer < source.length) {
  let instruction = source.charAt(instruction_pointer);
  switch (instruction) {
    case "+":
      tape[memory_pointer]++;
      if (tape[memory_pointer] == 256) {
        tape[memory_pointer] = 0;
      }
      break;
    case "-":
      tape[memory_pointer]--;
      if (tape[memory_pointer] == -1) {
        tape[memory_pointer] = 255;
      }
      break;
    case ">":
      memory_pointer++;
      break;
    case "<":
      memory_pointer--;
      break;
    case ".":
      let ascii_value = String.fromCharCode(tape[memory_pointer]);
      console.log(ascii_value);
      break;
    case ",":
      // not implementing user input yet
      break;
    case "[":
      if (tape[memory_pointer] === 0) {
        instruction_pointer = loop_lookup[instruction_pointer];
        // this will move the pointer to the ]
        // but straight after this loop the instruction_pointer is ++
        // so it will then skip to after the loop
      }
      break;
    case "]":
      if (tape[memory_pointer] != 0) {
        instruction_pointer = loop_lookup[instruction_pointer];
      }
      break;
  }

  instruction_pointer++;
}

console.log(tape);
