import type { ReactionType } from "@/generated/prisma/enums";

export type PostReaction =
  | "LIKE"
  | "LOVE"
  | "HAHA"
  | "WOW"
  | "SAD"
  | "ANGRY";


export type ReactionSummary = {
  type: ReactionType;
  count: number;
};

export type CommentUser = {
  id: string;
  name: string | null;
  image: string | null;
};

export type PostComment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  parentId: string | null;

  user: CommentUser;

  replies?: PostComment[];
};

export type CommunityPost = {
  id: string;

  author: {
    id: string;
    name: string | null;
    image: string | null;
  };

  createdAt: string;

  caption: string;

  images: string[];

  reactionCount: number;

  reactions: ReactionSummary[];

  commentCount: number;

  comments: PostComment[];

  currentUserReaction: ReactionType | null;

  totalPosts?: number;
};

export type CurrentUser = {
  id: string;
  name?: string | null;
  image?: string | null;
};

type PostHandler = (postId: string) => void;

export type HomePostProps = {
  post: CommunityPost;
  isOwner: boolean;
  currentUser?: CurrentUser | null;
  onLike?: PostHandler;
  onComment?: PostHandler;
  onSave?: PostHandler;
};
