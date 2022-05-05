import { Request, Response } from "express";

const getCompnaies = (req: Request, res: Response) => {
    return res.status(200).json({ msg: "Hello, world!" });
};

export { getCompnaies };
