import app from "./server";
import mongoose from "mongoose";
const port = process.env.PORT || 8080;

mongoose.connect(
  "mongodb://localhost:27017/inventory",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("successfully connected to mongodb server .... ");
  }
);

app.listen(port, () => console.log(`listening on port - ${port}`));
