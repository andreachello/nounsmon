import express from "express"
import * as callController from "./call.controller"

const callRouter = express.Router()

callRouter.get("/", callController.call);

export default callRouter