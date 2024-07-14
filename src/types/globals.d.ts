export {};

export type Roles = "admin" | "user"

declare global {
  export interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
