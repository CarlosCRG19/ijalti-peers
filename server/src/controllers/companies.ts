import { Request, Response } from "express";

const getCompanies = (req: Request, res: Response) => {
    return res.status(200).json({ msg: "Hello, world!" });
};

export { getCompanies };
