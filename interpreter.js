// Interpreter for Brainfuck

// Original implementation uses 30,000 memory cells
// Scaling that back to 100 for ease of console.log
let tape = new Array(100).fill(0); // Initialise all to 0

let memory_pointer = 0;
let instruction_pointer = 0;

let source = "++>>++";
console.log(`Source code is: ${source}`);
console.log(`Source code length is ${source.length}`);

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
      console.log(tape[memory_pointer]);
      break;
    case ",":
      // not implementing user input yet
      break;
  }

  instruction_pointer++;
}

console.log(tape);
