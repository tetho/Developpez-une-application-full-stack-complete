import { Post } from "./post.interface";

export interface Comment {
    id: number;
    post: Post;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
