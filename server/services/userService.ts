import { RegistrationRequest } from "~~/types/IRegistration"
import { IUser } from "~~/types/IUser"
import { validate } from "./validator"

export async function validateUser(
    data: RegistrationRequest
): Promise<FormValidation> {
    const errors = await validate(data)

    if (errors.size > 0) {
        return { hasErrors: true, errors }
    }

    return { hasErrors: false }
}

export function sanitizeUserForFrontend(user: IUser | undefined): IUser {
    
    if (!user) {
        return user //esentially returning undefined
    }

    delete user.password
    delete user.loginType
    delete user.stripeCustomerId

    return user
}
