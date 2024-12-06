import { Comment } from "./comment.interface";
import { Topic } from "./topic.interface";
import { User } from "./user.interface";

export interface Post {
    post_id: number;
    topic_id: Topic;
    user_id: User;
    comments: Comment[];
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}
