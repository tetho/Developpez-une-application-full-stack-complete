import { Post } from "./post.interface";

export interface Topic {
    topic_id: number;
    posts: Post[];
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}
