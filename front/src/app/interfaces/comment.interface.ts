import { Post } from "./post.interface";
import { User } from "./user.interface";

export interface Comment {
    comment_id: number;
    post_id: Post;
    user_id: User;
    text: string;
    created_at: Date;
    updated_at: Date;
}
