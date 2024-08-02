// hash.js
class SymbolTable {
  constructor() { // Initialize symbol table with all alphabets
    this.table = new Array(26).fill(null);
  }

  set(variable, value) { // Set variable to a value 
    const index = variable.charCodeAt(0) - 'A'.charCodeAt(0);
    this.table[index] = value;
  }

  get(variable) { // Get value of a variable 
    const index = variable.charCodeAt(0) - 'A'.charCodeAt(0);
    return this.table[index];
  }

  isDefined(variable) { // Check variable is defined
    const index = variable.charCodeAt(0) - 'A'.charCodeAt(0);
    return this.table[index] !== null;
  }
}

module.exports = SymbolTable;
