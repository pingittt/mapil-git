import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
};

export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return <Tag className={`container-clc ${className}`}>{children}</Tag>;
}
