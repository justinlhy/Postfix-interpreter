// stack.js
class Stack {
    constructor() { // Intialise an empty stack
      this.stack = [];
    }
  
    push(value) { // Push a value onto the stack 
      this.stack.push(value);
    }
  
    pop() { // Pop a value from the stack 
      if (this.stack.length === 0) {
        throw new Error('Stack underflow');
      }
      return this.stack.pop();
    }
  
    peek() { // Peek to the top of the stack for the value without removing it 
      if (this.stack.length === 0) {
        throw new Error('Stack is empty');
      }
      return this.stack[this.stack.length - 1];
    }
  
    isEmpty() { // Check stack = empty
      return this.stack.length === 0;
    }
  }
  
  module.exports = Stack;
  