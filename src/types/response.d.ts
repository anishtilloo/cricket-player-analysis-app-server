export interface TokenResponse {
  token: string;
  expires: Date | string;
}

export interface AuthTokensResponse {
  access: TokenResponse;
  refresh?: TokenResponse;
}

declare namespace Express {
  export interface Request {
    get: any;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: any,
      extraString?: String,
    }
  }
}
