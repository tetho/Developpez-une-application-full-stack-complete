import { Comment } from "./comment.interface";
import { Topic } from "./topic.interface";
import { User } from "./user.interface";

export interface Post {
    id: number;
    topic: Topic;
    user: User;
    comments: Comment[];
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
