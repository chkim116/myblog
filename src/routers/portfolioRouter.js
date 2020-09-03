import express from "express";
import {
  getPort,
  getPortById,
  postPortFolio,
  portEditing,
  portDeleting,
} from "../controller/portfolioController";
const portfolioRouter = express.Router();

//  /port/

// port get All
portfolioRouter.get("/", getPort);

// port get By Id
portfolioRouter.get("/:id", getPortById);

// port Upload
portfolioRouter.post("/post", postPortFolio);

// port Update
portfolioRouter.post("/edit/:id", portEditing);

// post Delete
portfolioRouter.get("/del/:id", portDeleting);

export default portfolioRouter;
