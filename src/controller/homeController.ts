import requestIp from "request-ip";
import Home from "../models/Home.js";
import { NextFunction, Request, Response } from "express";

export const getView = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const home = await Home.find({});

    if (home.length >= 1) {
        next();
        return;
    }
    await Home.create({
        views: 0,
        ip: [],
        totalView: 0,
    });
    next();
};

export const checkIp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const clientIp: string | null = requestIp.getClientIp(req);
    const home = await Home.find({});
    if (clientIp && home[0].ip.indexOf(clientIp) > -1) {
        console.log("아이피 중복으로 조회수 올라가지 않음.");
        res.json(home[0]);
        return;
    } else {
        next();
    }
};

export const checkView = async (req: Request, res: Response) => {
    const clientIp: string | null = requestIp.getClientIp(req);
    try {
        const home = await Home.find({});
        if (clientIp && home) {
            home[0].views += 1;
            home[0].ip.push(clientIp);
            home[0].save();
            res.status(200).json(home[0]);
        } else {
            res.status(400);
        }
    } catch (err) {
        res.status(400);
        console.log(err);
    }
};

// total view

export const totalView = async (req: Request, res: Response) => {
    const home = await Home.find({});
    const { totalView, _id, views } = home[0];
    if (totalView) {
        await Home.findOneAndUpdate(
            { _id },
            { views: 0, totalView: totalView + views, ip: [] }
        );
    }
};
