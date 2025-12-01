export interface ProfileFormValues {
  name: string;
  email: string;
  avatar: string;
}
export interface AuthUser {
  uid: string;
  name?: string;
  email: string;
  restoreEmail?: string;
  role?: string;
  token?: string;
  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  success?: string | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  restore: (email: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetAuth: () => void;
}
