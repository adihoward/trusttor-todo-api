import { AppRequest } from "../types/appRequset.type";

export const getAppServicesFromRequest = (req: AppRequest) =>  req.app.locals.services;
