// splits AllSets.json from https://mtgjson.com/v4/ into smaller .json files

if (process.argv.length < 3) {
  console.log("target file path is required.");
  process.exit(1);
}

var target = process.argv[2];
console.log("file: " + target);

var fs = require("fs");
fs.readFile(target, function(err, data) {
  if (err) throw err;

  const jsonObject = JSON.parse(data);
  Object.keys(jsonObject).map(function(key, index) {
    // const fileName = jsonObject[key].code;
    fs.writeFileSync(
      `./sets/set${index}.json`,
      JSON.stringify(jsonObject[key])
    );
    console.log(`set${index}`);
  });
});
