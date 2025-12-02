export class UserCred {
    id: string = '';
    email: string = '';
    accessToken: string = '';
    identityId: string = '';

    constructor(id: string, email: string, accessToken: string, identityId: string) {
        this.id = id;
        this.email = email;
        this.accessToken = accessToken;
        this.identityId = identityId;
    }

    static fromSignInSession(session: any, email: string): UserCred {
        return new UserCred(
            session.userSub || '',
            email,
            session.tokens?.accessToken?.payload?.jti || '',
            session.identityId || ''
        );
    }
}