/**
 * Successful Authentication Response.
 * @export
 */
export interface JsonWebToken {

    /** Token type ("Bearer"). */
    token_type: string;

    /** Access Token (in JWT format). */
    access_token: string;

    /** Expiration time of the Access Token in seconds since the response was generated. */
    expires_in: number;

    /** ID Token. */
    id_token: string;
}
