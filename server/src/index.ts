import express from "express";
import v1Router from "./v1";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/v1", v1Router);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
