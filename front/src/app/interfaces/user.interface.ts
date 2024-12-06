export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    //admin: boolean;
    created_at: Date;
    updated_at: Date;
  }
