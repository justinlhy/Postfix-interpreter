// interpreter.js
// Import the modules
const readline = require('readline');
const SymbolTable = require('./hash');
const evaluateExpression = require('./postfixEvaluator');

// Create readline interface 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const symbolTable = new SymbolTable();

// Function to print help message
function printHelp() {
  console.log(`
    Postfix++ Calculator Commands:
    - A 1 = : Assign 1 to variable A
    - A 9 + : Add 9 to the value of A
    - M+ : Add the top of the stack to memory
    - M- : Subtract the top of the stack from memory
    - MR : Recall the memory value to the stack
    - MC : Clear the memory
    - clear : Clear the stack
    - +, -, *, /, ^ : Basic arithmetic operations
    - sqrt : Square root operation (applied to the top of the stack)
    - help : Print this help message
    - exit : Exit the calculator
  `);
}

// Print help message at the start
printHelp();

rl.setPrompt('> ');
rl.prompt();

// Event listeners for user input
rl.on('line', (input) => {
  const trimmedInput = input.trim();
  if (trimmedInput === 'help') {
    printHelp();
  } else if (trimmedInput === 'exit') {
    rl.close();
  } else {
    try {
      const result = evaluateExpression(trimmedInput, symbolTable);
      if (result !== undefined) {
        console.log(result);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  // Event listener for closing interface
  rl.prompt();
}).on('close', () => {
  console.log('Exiting Postfix++ interpreter.');
  process.exit(0);
});
