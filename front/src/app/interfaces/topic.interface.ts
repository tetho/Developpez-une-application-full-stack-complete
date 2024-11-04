import { Post } from "./post.interface";

export interface Topic {
    id: number;
    posts: Post[];
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
