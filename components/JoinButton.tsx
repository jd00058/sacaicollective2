"use client";

import { useSite } from "./Providers";

export default function JoinButton({
  children,
  className = "",
  intent = "join",
}: {
  children: React.ReactNode;
  className?: string;
  intent?: "join" | "partner";
}) {
  const { openJoin } = useSite();
  return (
    <button type="button" onClick={() => openJoin(intent)} className={className}>
      {children}
    </button>
  );
}
