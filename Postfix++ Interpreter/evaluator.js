// evaluator.js
class Evaluator {
  static evaluate(num1, num2, op) { 
      // Perform binary operations based on the given operator
      switch (op) {
          case '+':
              return num1 + num2;
          case '-':
              return num1 - num2;
          case '*':
              return num1 * num2;
          case '/':
              if (num2 === 0) {
                  throw new Error('Cannot divide by zero');
              }
              return num1 / num2;
          case '^':
              return Math.pow(num1, num2);
          default:
              throw new Error(`Unsupported operator: ${op}`);
      }
  }

  static evaluateUnary(num, op) { 
      // Handle unary operations 
      switch (op) {
          case 'sqrt':
              if (num < 0) {
                  throw new Error('Cannot take square root of a negative number');
              }
              return Math.sqrt(num);
          default:
              throw new Error(`Unsupported operator: ${op}`);
      }
  }
}

module.exports = Evaluator;
