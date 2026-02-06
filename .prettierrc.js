module.exports = {
  // Use single quotes instead of double quotes (standard in JS/TS)
  singleQuote: true,

  // Add a trailing comma to all objects/arrays (cleaner git diffs)
  trailingComma: 'all',

  // Don't wrap lines of code until 100 characters (80 is often too short for JSX)
  printWidth: 100,

  // IMPORTANT for React Native:
  // Keeps the closing `>` of JSX elements on the same line as the last prop.
  // This prevents the common "jagged" look in mobile UI code.
  bracketSameLine: true,

  // Add spaces inside object brackets { data } instead of {data}
  bracketSpacing: true,

  // Always use parentheses for arrow functions (x) => x
  // Safer for TypeScript refactoring
  arrowParens: 'always',

  // Use 2 spaces for indentation
  tabWidth: 2,
};
