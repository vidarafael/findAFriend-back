declare namespace Express {
  export interface Request {
    organization: {
      id: string | undefined;
    }
  }
}