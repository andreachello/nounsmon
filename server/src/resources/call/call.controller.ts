import { Request, Response } from 'express';
import * as callService from "./call.service"

export const mintNoun = async (req: Request, res: Response) => {
    try {
        const results = await callService.mintNoun();
        return res.status(200).send({ status: "OK", data: results });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).send("Internal Error");
    }
}

export const catchNoun = async (req: Request, res: Response) => {
    try {
        const { address, nounId } = req.body
        const results = await callService.catchNoun(nounId, address);
        return res.status(200).send({ status: "OK", data: results });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).send("Internal Error");
    }
}

export const getNounSVG = async (req: Request, res: Response) => {
    try {
        const { nounId } = req.params

        const results = await callService.getNounSVG(nounId);
        return res.status(200).send({ status: "OK", data: results });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).send("Internal Error");
    }
}
