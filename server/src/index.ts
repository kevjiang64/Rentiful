import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { authMiddleware } from "./middleware/authMiddleware";

//Route Import
import tenantRoutes from "./routes/tenantRoutes";
import managerRoutes from "./routes/managerRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import leaseRoutes from "./routes/leaseRoutes";
import applicationRoutes from "./routes/applicationRoutes";

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
app.use("/properties", propertyRoutes);
app.use("/managers", authMiddleware(["manager"]), managerRoutes);
app.use("/leases", leaseRoutes);
app.use("/applications", applicationRoutes);

const port = Number(process.env.PORT) || 3002;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
