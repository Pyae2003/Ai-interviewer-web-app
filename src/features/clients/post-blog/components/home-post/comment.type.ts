export type CommentUser = {
  id: string;
  name: string | null;
  image: string | null;
};

export type PostCommentItem = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  user: CommentUser;

  parentId: string | null;

  replies?: PostCommentItem[];
};