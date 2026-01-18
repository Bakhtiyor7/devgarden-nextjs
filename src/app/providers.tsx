// src/app/providers.tsx
"use client";
import { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth";
import ApolloWrapper from "@/components/ApolloWrapper";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloWrapper>
      <AuthProvider>{children}</AuthProvider>
    </ApolloWrapper>
  );
}
