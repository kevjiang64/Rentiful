import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authMiddleware } from "./middleware/authMiddleware";

//Route Import
import tenantRoutes from "./routes/tenantRoutes";
import managerRoutes from "./routes/managerRoutes";

//Configurations
dotenv.config();
const app = express();

//Middlwares
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("This is home route");
});

app.use("/tenants", authMiddleware(["tenant"]), tenantRoutes);

app.use("/managers", authMiddleware(["manager"]), managerRoutes);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
