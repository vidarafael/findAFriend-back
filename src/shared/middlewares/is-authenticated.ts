import { configToken } from "@/configs/token";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}


export function isAuthenticated(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers

  if (!authorization) {
    throw new Error()
  }

  const [_, token] = authorization.split(' ')

  try {
    const { sub: organization_id } = verify(token, configToken.JWT_SECRET) as IPayload

    request.organization = {
      id: organization_id
    }

    next()
  } catch (error) {
    return response.status(404).json({ message: 'Unathourized.' })
  }
}