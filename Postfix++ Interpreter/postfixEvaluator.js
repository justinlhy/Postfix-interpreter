// Import the necessary modules
const Stack = require('./stack');
const Evaluator = require('./evaluator');

// Memory storage initialisation
let memory = 0;

// Evaluate the expression from the symbol table
function evaluateExpression(expression, symbolTable) {
  const stack = new Stack(); // Initialise new stack
  const tokens = expression.split(' '); // Split input expression into tokens

  for (const token of tokens) {  // Iterate over each token in the expression
    if (token === 'help' || token === 'exit') { // Skip 'help' and 'exit' commands
      continue; 
    }
    if (!isNaN(token)) { // If token is a number, push onto stack
      stack.push(parseInt(token));
    } else if (/^[A-Za-z]$/.test(token)) { // If token is a variable (A-Z)
      if (symbolTable.isDefined(token)) { // If the variable is defined, push its value onto the stack
        stack.push(symbolTable.get(token));
      } else { // Otherwise, push the variable itself onto the stack for future assignment
        stack.push(token);
      }
    } else if (token === '=') {  // Handle variable assignment
      const value = stack.pop();
      const variable = stack.pop();
      if (typeof variable === 'string') { // If the popped variable is a string, set its value in the symbol table
        symbolTable.set(variable, value);
      } else {
        throw new Error('Invalid assignment');
      }
    } else if (token === 'M+') {  // Add the top of the stack to memory
      memory += stack.pop();
    } else if (token === 'M-') { // Subtract the top of the stack from memory
      memory -= stack.pop();
    } else if (token === 'MC') { // Clear the memory
      memory = 0;
    } else if (token === 'MR') { // Recall memory value and push onto stack
      stack.push(memory);
    } else if (token === 'clear') { // Clear the stack
      while (!stack.isEmpty()) { 
        stack.pop();
      }
    } else if (['sqrt'].includes(token)) { // Handle unary operations
      const operand = stack.pop();
      const result = Evaluator.evaluateUnary(operand, token);
      stack.push(result);
    } else { // Handle binary operations
      let operand2 = stack.pop();
      let operand1 = stack.pop();
      if (typeof operand1 === 'string') { // If the operand is a variable name, get its value from the symbol table
        operand1 = symbolTable.get(operand1);
      }
      if (typeof operand2 === 'string') { // If the operand is a variable name, get its value from the symbol table
        operand2 = symbolTable.get(operand2);
      }
      const result = Evaluator.evaluate(operand1, operand2, token); // Evaluate the binary operation
      stack.push(result); // Push the result back onto the stack
    }
  }

  return stack.isEmpty() ? undefined : stack.pop(); // Return the final result if the stack is not empty, otherwise return undefined
}

module.exports = evaluateExpression;
