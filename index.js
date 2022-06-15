const express = require("express");
const app = express();
const port = 3003;

app.use(express.static("src"));

app.listen(port, () => {
  console.log(`App listening on port http://127.0.0.1:${port}`);
});
