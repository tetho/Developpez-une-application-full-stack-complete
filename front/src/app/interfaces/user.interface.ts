import { Topic } from "./topic.interface";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    topics: Topic[];
    created_at: Date;
    updated_at: Date;
  }
