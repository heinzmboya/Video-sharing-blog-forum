import { ISession } from "~~/types/ISession"
import { IUser } from "~~/types/IUser"
import prisma from "../client"

export async function createSession(data: ISession): Promise<ISession> {
    return await prisma.session.create({
        data: {
            userId: data.userId,
            authToken: data.authToken
        }
    })
}

export async function getSessionByAuthToken(
    authToken: string
): Promise<ISession> {
    const user = (await prisma.session
        .findUnique({
            where: {
                authToken: authToken
            }
        })
        .user()) as unknown as IUser

    // .user() - is how you return a relatnshp in prisma

    return { authToken, user }
}
