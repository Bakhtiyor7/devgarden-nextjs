"use client";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.replace("/login");
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return <p>Redirecting to login page...</p>;
  }
  return <>{children}</>;
}
