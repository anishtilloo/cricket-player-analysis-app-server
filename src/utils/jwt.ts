import jwt, { JwtPayload }  from "jsonwebtoken";

// We Usually keep the token between 5 minutes - 15 minutes
export function generateAccessToken(user: { id: string; }) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: '5m',
  });
}

// Choosed 8h because i prefer to make the user login again each day.
// But keep him logged in if he is using the app.
// You can change this value depending on your app logic.
// Going for a maximum of 7 days, and make him login again after 7 days of inactivity.
export function generateRefreshToken(user: { id: string; }, jti: JwtPayload) {
  return jwt.sign({
    userId: user.id,
    jti
  }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: '8h',
  });
}

export function generateTokens(user: { id: string; }, jti: string): { accessToken: string; refreshToken: string } {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}
