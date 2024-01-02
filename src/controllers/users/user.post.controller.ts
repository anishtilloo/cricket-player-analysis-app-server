import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt, { Jwt, JwtPayload, Secret } from "jsonwebtoken";
import { findUserByEmail, createUserByEmailAndPassword, findUserById } from "../../handlers/users/userService";
import { addRefreshTokenToWhitelist, deleteRefreshToken, findRefreshTokenById } from "../../handlers/auth/authService";
import { generateTokens } from "../../utils/jwt";
import { Request, Response, NextFunction } from 'express';
import hashToken from "../../utils/hashToken";

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
            if (req.body.email && req.body.password) {
                const existingUser = await findUserByEmail(req.body.email);
                    if (!existingUser) {
                        const userObject = { email: req.body.email, password: req.body.password }
                
                        const userId = await createUserByEmailAndPassword(userObject);
                        const jti = uuidv4();
                        const { accessToken, refreshToken } = generateTokens({id: userId}, jti);
                        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: userId });
                    
                        res.status(201).json({
                            success: true,
                            message: "The Tokens are generated",
                            result: {
                                accessToken,
                                refreshToken,
                            }
                        });
                    } else {
                        res.status(400).json({
                            success: false,
                            message: "Email is already in use.",
                        });
                        next();
                    }
            } else {
                res.status(400).json({
                    success: false,
                    message: "You have to provide both email as well an password.",
                });
                next();
            }
      } catch (err) {
        res.status(501).json({
            success: false,
            message: "something went wrong",
        });
        next(err);
      }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.body.email && req.body.password) {
            const existingUser = await findUserByEmail(req.body.email);
                if (existingUser) {
                    const validPassword = await bcrypt.compare(req.body.password, existingUser.password);
                    if (validPassword) {
                        const jti = uuidv4();
                        const { accessToken, refreshToken } = generateTokens(existingUser, jti);
                        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

                    
                        res.status(201).json({
                            success: true,
                            message: "The Tokens are generated",
                            result: {
                                accessToken,
                                refreshToken,
                            }
                        });
                    } else {
                        res.status(403).json({
                            success: false,
                            message: "Invalid login credentials.",
                        });
                        next();
                    }
                } else {
                    res.status(403).json({
                        success: false,
                        message: "Invalid login credentials.",
                    });
                    next();
                }
        } else {
            res.status(400).json({
                success: false,
                message: "You have to provide both email as well an password.",
            });
            next();
        }
  } catch (err) {
    res.status(501).json({
        success: false,
        message: "something went wrong",
    });
    next(err);
  }
}

export async function assignNewRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400);
        throw new Error('Missing refresh token.');
      }
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const savedRefreshToken = await findRefreshTokenById(payload.jti);
  
      if (!savedRefreshToken || savedRefreshToken.revoked === true) {
        res.status(401);
        throw new Error('Unauthorized');
      }
  
      const hashedToken = hashToken(refreshToken);
      if (hashedToken !== savedRefreshToken.hashedToken) {
        res.status(401);
        throw new Error('Unauthorized');
      }
  
      const user = await findUserById(payload.userId);
      if (!user) {
        res.status(401);
        throw new Error('Unauthorized');
      }
  
      await deleteRefreshToken(savedRefreshToken.id);
      const jti = uuidv4();
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
      await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });
  
      res.json({
        accessToken,
        refreshToken: newRefreshToken
      });
    } catch (err) {
      next(err);
    }
  });
