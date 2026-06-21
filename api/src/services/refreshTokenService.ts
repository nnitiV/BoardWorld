import * as refreshTokenRepository from "../repository/refreshTokenRepository.js"

export const getRefreshToken = async (token: string) => {
    return await refreshTokenRepository.getRefreshToken(token);
}

export const upsertRefreshToken = async (rawToken: string, userId: string, deviceId: string, expiresAt: Date) => {
    return await refreshTokenRepository.upsertRefreshToken(rawToken, userId, deviceId, expiresAt);
}

export const deleteRefreshToken = async (token: string) => {
    return await refreshTokenRepository.deleteRefreshToken(token);
}

export const deleteTokensByDeviceId = async (userId: string, deviceId: string) => {
    return await refreshTokenRepository.deleteTokensByDeviceId(userId, deviceId);
}