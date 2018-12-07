// Writes ../index.js to console

// Import statements
for (var i = 0; i < 430; i++) {
  console.log(`const set${i} = require("./sets/set${i}.json")`);
}
console.log();

// Combine all sets into allSets array
console.log("const allSets = [");
for (var i = 0; i < 430; i++) {
  if (i === 429) {
    console.log(`set${i}`);
  } else {
    console.log(`set${i},`);
  }
}
console.log("];");

// Export allSets
console.log();
console.log("module.exports = allSets;");
