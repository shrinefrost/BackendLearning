const fs = require("fs");

async function fileHandle() {
  await fs.writeFile("newMessage.txt", "hello my name is ....", (err) => {
    if (err) throw err;
    else console.log("successfully created");
  });
  console.log("hello after writing the first file");

  await fs.appendFile(
    "newMessage.txt",
    "\nloading taking more time then usual ",
    (err) => {
      if (err) throw err;
      console.log("new information added");
    }
  );

  console.log("the updated file: ");
  await fs.readFile("newMessage.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}
fileHandle();
