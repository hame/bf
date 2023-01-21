// Interpreter for Brainfuck

// Original implementation uses 30,000 memory cells
// Scaling that back to 100 for ease of console.log
let tape = new Array(100).fill(0); // Initialise all to 0

let tape_pointer = 0;
let instruction_pointer = 0;

let source = "++>>++";
console.log(`Source code is: ${source}`);
console.log(`Source code length is ${source.length}`);

while (instruction_pointer < source.length) {
  let instruction = source.charAt(instruction_pointer);
  switch (instruction) {
    case "+":
      tape[tape_pointer]++;
      if (tape[tape_pointer] == 256) {
        tape[tape_pointer] = 0;
      }
      break;
    case "-":
      tape[tape_pointer]--;
      if (tape[tape_pointer] == -1) {
        tape[tape_pointer] = 255;
      }
      break;
    case ">":
      tape_pointer++;
      break;
    case "<":
      tape_pointer--;
      break;
  }

  instruction_pointer++;
}

console.log(tape);
