import express from "express"
import * as callController from "./call.controller"

const callRouter = express.Router()

callRouter.get("/mint", callController.mintNoun);
callRouter.post("/catch", callController.catchNoun);
callRouter.get("/svg/:nounId", callController.getNounSVG);

export default callRouter