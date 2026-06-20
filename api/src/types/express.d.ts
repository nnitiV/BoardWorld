import { Request } from "express";

export interface AuthRequest<P = any> extends Request<P> {
    user? : {
        id: string
    }
}