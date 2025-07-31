"use client";
import { useAuth } from "@/lib/auth";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SIGNUP_MUTATION = gql`
  mutation Signup($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      username
      email
    }
  }
`;

export default function SignupPage() {
  const router = useRouter();

  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION);

  // handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await signup({
        variables: { createUserInput: { username, email, password } },
      });

      if (data?.createUser) {
        await signIn({ username, password });
        router.push("/"); // redirect to home on success
      }
    } catch (e: any) {
      setError(e.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <h1 className="text-2xl mb-4">Sign Up</h1>
      {error && <p className="text-red-600">{error}</p>}
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full border p-2 rounded mb-4"
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full border p-2 rounded mb-4"
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full border p-2 rounded mb-4"
          required
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
