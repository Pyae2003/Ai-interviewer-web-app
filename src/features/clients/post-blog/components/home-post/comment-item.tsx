"use client";

import {
  Loader2,
  MoreHorizontal,
  Pencil,
  Reply,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { PostCommentItem } from "./comment.type";

type CommentItemProps = {
  comment: PostCommentItem;
  currentUserId?: string;

  onStartEdit: (commentId: string) => void;
  onEdit: (commentId: string, content: string) => void | Promise<void>;
  onDelete: (commentId: string) => void | Promise<void>;
  onReply: (commentId: string) => void;

  isEditing?: boolean;
  isDeleting?: boolean;
};

function formatCommentTime(date: Date | string) {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "";
  }

  const diff = Math.max(0, Date.now() - value.getTime());
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return "now";
  if (diff < hour) return `${Math.floor(diff / minute)}m`;
  if (diff < day) return `${Math.floor(diff / hour)}h`;
  if (diff < 7 * day) return `${Math.floor(diff / day)}d`;

  return value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function CommentItem({
  comment,
  currentUserId,
  onStartEdit,
  onEdit,
  onDelete,
  onReply,
  isEditing = false,
  isDeleting = false,
}: CommentItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isSaving, setIsSaving] = useState(false);

  // Refs for tracking button and menu wrapper
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    right: number;
    openUp: boolean;
  } | null>(null);

  const isOwner = currentUserId === comment.user.id;

  const userName = comment.user.name?.trim() || "Anonymous";
  const initial = userName.charAt(0).toUpperCase();
  const replyCount = comment.replies?.length ?? 0;

  function updateMenuPosition() {
    const button = menuButtonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const menuHeight = 90;
    const spacing = 6;

    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < menuHeight + spacing;

    setMenuPosition({
      top: openUp
        ? rect.top - menuHeight - spacing
        : rect.bottom + spacing,
      right: Math.max(8, window.innerWidth - rect.right),
      openUp,
    });
  }

  function handleToggleMenu() {
    if (isDeleting) return;

    if (showMenu) {
      setShowMenu(false);
      return;
    }

    updateMenuPosition();
    setShowMenu(true);
  }

  useEffect(() => {
    if (!showMenu) return;

    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;

      // 🛠 FIX: Check if click is outside both button and portal menu
      if (
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setShowMenu(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowMenu(false);
      }
    }

    function handleViewportChange() {
      updateMenuPosition();
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleViewportChange, true);
    window.addEventListener("resize", handleViewportChange);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleViewportChange, true);
      window.removeEventListener("resize", handleViewportChange);
    };
  }, [showMenu]);

  async function handleSaveEdit() {
    if (!isOwner || isSaving || isDeleting) return;

    const content = editContent.trim();
    if (!content) return;

    if (content === comment.content.trim()) {
      onStartEdit("");
      return;
    }

    setIsSaving(true);
    try {
      await onEdit(comment.id, content);
      onStartEdit(""); // Close edit mode after success
    } catch (error) {
      console.error("[COMMENT_EDIT_ERROR]", { commentId: comment.id, error });
    } finally {
      setIsSaving(false);
    }
  }

  function handleStartEdit() {
    setShowMenu(false);
    setEditContent(comment.content);
    onStartEdit(comment.id);
  }

  async function handleDelete() {
    if (!isOwner || isDeleting || isSaving) return;

    setShowMenu(false);

    try {
      await onDelete(comment.id);
    } catch (error) {
      console.error("[COMMENT_DELETE_ERROR]", { commentId: comment.id, error });
    }
  }

  function handleCancelEdit() {
    setEditContent(comment.content);
    onStartEdit("");
  }

  // 🛠 FIX: Added ref={menuRef} to the portal container so clicks inside don't close it
  const ownerMenu =
    showMenu && menuPosition && isOwner && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={menuRef}
            role="menu"
            className="fixed z-[9999] w-36 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-2xl ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-900 dark:ring-white/5"
            style={{
              top: menuPosition.top,
              right: menuPosition.right,
            }}
          >
            {/* Edit */}
            <button
              type="button"
              role="menuitem"
              onClick={handleStartEdit}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Pencil className="size-3.5 shrink-0" />
              <span>Edit</span>
            </button>

            {/* Delete */}
            <button
              type="button"
              role="menuitem"
              disabled={isDeleting}
              onClick={handleDelete}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50 disabled:pointer-events-none disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              {isDeleting ? (
                <Loader2 className="size-3.5 shrink-0 animate-spin" />
              ) : (
                <Trash2 className="size-3.5 shrink-0" />
              )}
              <span>{isDeleting ? "Deleting..." : "Delete"}</span>
            </button>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <article className="group flex gap-2.5">
        <div className="shrink-0">
          {comment.user.image ? (
            <img
              src={comment.user.image}
              alt={`${userName}'s avatar`}
              className="size-9 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div
              className="flex size-9 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700 dark:bg-sky-900/50 dark:text-sky-300"
              aria-hidden="true"
            >
              {initial}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="relative inline-block max-w-[calc(100%-8px)]">
            {isEditing ? (
              <div className="min-w-60 max-w-xl">
                <textarea
                  autoFocus
                  rows={3}
                  maxLength={2000}
                  value={editContent}
                  disabled={isSaving}
                  onChange={(event) => setEditContent(event.target.value)}
                  className="w-full resize-none rounded-2xl border border-sky-300 bg-white px-3 py-2.5 text-sm leading-relaxed text-slate-700 outline-none ring-2 ring-sky-100 focus:border-sky-500 dark:border-sky-700 dark:bg-slate-900 dark:text-slate-200 dark:ring-sky-950"
                  placeholder="Edit your comment..."
                />

                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isSaving || !editContent.trim()}
                    onClick={handleSaveEdit}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700 disabled:pointer-events-none disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 className="size-3.5 animate-spin" /> : null}
                    {isSaving ? "Saving..." : "Save"}
                  </button>

                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={handleCancelEdit}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>

                  <span className="ml-auto text-[10px] text-slate-400">
                    {editContent.length}/2000
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
                <p className="mb-0.5 text-[13px] font-semibold text-slate-900 dark:text-white">
                  {userName}
                </p>

                <p className="whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  {comment.content}
                </p>
              </div>
            )}

            {isOwner && !isEditing ? (
              <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                <button
                  ref={menuButtonRef}
                  type="button"
                  disabled={isDeleting}
                  aria-label="Comment options"
                  aria-expanded={showMenu}
                  aria-haspopup="menu"
                  onClick={handleToggleMenu}
                  className="flex size-7 items-center justify-center rounded-full text-slate-400 opacity-0 transition-all duration-150 group-hover:opacity-100 hover:bg-slate-100 hover:text-slate-700 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </div>
            ) : null}
          </div>

          {!isEditing ? (
            <div className="mt-1 flex items-center gap-4 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="font-normal text-slate-400 dark:text-slate-500">
                {formatCommentTime(comment.createdAt)}
              </span>

              {comment.updatedAt !== comment.createdAt ? (
                <span className="font-normal text-slate-400">edited</span>
              ) : null}
            </div>
          ) : null}

          {!isEditing && replyCount > 0 ? (
            <button
              type="button"
              onClick={() => onReply(comment.id)}
              className="mt-2 flex items-center gap-1.5 px-2 text-xs font-semibold text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
            >
              <Reply className="size-3.5" />
              {replyCount} {replyCount === 1 ? "reply" : "replies"}
            </button>
          ) : null}
        </div>
      </article>
      {ownerMenu}
    </>
  );
}