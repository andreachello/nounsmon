import { Request, Response } from 'express';
import * as callService from "./call.service"

export const call = async (req: Request, res: Response) => {
    try {
        const results = await callService.call();
        return res.status(200).send({ status: "OK", data: results });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).send("Internal Error");
    }
}
