import { confirmSignUp, fetchAuthSession, signIn, signUp } from 'aws-amplify/auth';

export type Result = { success: boolean; value: any }

export async function signUpMiddleware(username: string, password: string, confirmPassword: string): Promise<Result> {
    try {
        if  (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }
        const { nextStep } = await signUp({
            username: username,
            password: password,
        });
        return { success: true, value: nextStep };
    } catch (error) {
        return { success: false, value: error };
    }
}

export async function confirmSignUpMiddleware(username: string, code: string): Promise<Result> {
    try {
        let result = await confirmSignUp({
            username: username,
            confirmationCode: code,
        });
        return { success: true, value: result };
    } catch (error) {
        return { success: false, value: error };
    }
}

export async function loginMiddleware(username: string, password: string): Promise<Result> {
    try {
        const result = await signIn({
            username,
            password,
        });

        if (result.nextStep.signInStep !== "DONE") {
            throw new Error(`Sign in not complete. Current step: ${result.nextStep.signInStep}`);
        }

        const session = await fetchAuthSession();

        return {
            success: true,
            value: session
        };
    }
    catch (error: any) {
        if (error?.name === "UserAlreadyAuthenticatedException") {
            const session = await fetchAuthSession();
            return { success: true, value: session };
        }

        if (error?.name === "UserNotFoundException") {
            return { success: false, value: new Error("User does not exist") };
        }

        if (error?.name === "NotAuthorizedException") {
            return { success: false, value: new Error("Incorrect username or password") };
        }

        if (error?.name === "InvalidParameterException") {
            return { success: false, value: new Error("Invalid username/password format") };
        }

        return {
            success: false,
            value: error instanceof Error ? error : new Error(String(error))
        };
    }
}
