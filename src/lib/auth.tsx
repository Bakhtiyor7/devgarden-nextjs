"use client"; // ← must be first line
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  FC,
  JSX,
} from "react";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

interface AuthContextType {
  token: string | null;
  isSignedIn: boolean;
  signIn: (credentials: {
    username: string;
    password: string;
  }) => Promise<void>;
  signOut: () => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside <AuthProvider>");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  // HTTP link is constant
  const httpLink = useMemo(
    () =>
      new HttpLink({
        uri:
          process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??
          "http://localhost:3001/graphql",
      }),
    []
  );

  // authLink re‑runs whenever `token` changes
  const authLink = useMemo(
    () =>
      setContext((_, { headers }) => ({
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      })),
    [token]
  );

  // combine them into a single client
  const client = useMemo(
    () =>
      new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      }),
    [authLink, httpLink]
  );

  const signIn = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    // TODO: use actual login mutation
    const LOGIN_MUTATION = gql`
      mutation Login($authInput: AuthInput!) {
        login(authInput: $authInput) {
          access_token
        }
      }
    `;

    const { data } = await client.mutate<{
      login: { access_token: string };
    }>({
      mutation: LOGIN_MUTATION,
      variables: { authInput: { username, password } },
    });

    if (data?.login.access_token) {
      setToken(data.login.access_token);
    }
  };

  const signOut = () => {
    setToken(null);
    client.clearStore();
  };

  const value: AuthContextType = {
    token,
    isSignedIn: !!token,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
}
