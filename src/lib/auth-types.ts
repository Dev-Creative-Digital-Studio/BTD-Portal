export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'vendor';
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
  }
  
  