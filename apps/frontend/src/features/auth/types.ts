export type User = {
  id: string;
  email: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export type EmailCheck = {
  registered: boolean;
};

export type AuthRequest = (credentials: Credentials) => Promise<User>;

export type SignUpStep = "email" | "password";
