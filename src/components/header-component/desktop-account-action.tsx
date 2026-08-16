import { ReactNode } from "react";
import { HeaderUser } from "../header";
import UserProfile from "../user-profile";
import Link from "next/link";


type DesktopAccountActionProps = {
  user?: HeaderUser;
  path: string;
  actionContent: ReactNode;
};

export function DesktopAccountAction({
  user,
  path,
  actionContent,
}: DesktopAccountActionProps) {
  if (user) {
    return (
      <div className="hidden md:block">
        <UserProfile {...user} />
      </div>
    );
  }

  return (
  
      <Link href={path}>{actionContent}</Link>
  );
}