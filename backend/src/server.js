const app = require("./app");
const dotenv = require("dotenv");
const port = process.env.PORT || 3333;

dotenv.config();

app.listen(port, () => console.log(`Server running on port ${port}`));
