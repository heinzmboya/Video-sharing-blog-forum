import { CompatibilityEvent } from "h3"
import { IUser } from "~~/types/IUser"
import { v4 as uuidv4 } from "uuid"
import {
    createSession,
    getSessionByAuthToken
} from "../database/repositories/sessionRepository"
import { sanitizeUserForFrontend } from "./userService"

export async function makeSession(
    user: IUser,
    event: CompatibilityEvent
): Promise<IUser> {
    const authToken = uuidv4().replaceAll("-", "")
    const session = await createSession({ authToken, userId: user.id })
    const userId = session.userId

    if (userId) {
        setCookie(event, "auth_token", authToken, { path: "/", httpOnly: true }) //httpOnly so the cookie cant be manipulated in frontend js
        return getUserBySessionToken(authToken)
    }
    return
}
export async function getUserBySessionToken(authToken: string): Promise<IUser> {
    const session = await getSessionByAuthToken(authToken)

    return sanitizeUserForFrontend(session.user)
}
