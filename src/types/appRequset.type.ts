import { Request } from "express";
import { AppServices } from "./appServices.type";

export type AppRequest = Request & { app: { locals: { services: AppServices } } };