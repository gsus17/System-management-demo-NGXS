/**
 * Login request.
 */
export interface LoginRequest {

    /** User name. */
    username: string;

    /** The user password. */
    password: string;

    /** Client Identifier valid at the Authorization Server (the AppKey). */
    client_id: string;

    /** Grant type. The value must be "password". */
    grant_type: string;

    /** The scopes. */
    scopes: string;
}
