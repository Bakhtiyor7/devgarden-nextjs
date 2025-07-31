"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signIn, isSignedIn } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // redirect if already signed in
  // this prevents mutation error
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn, router]);

  // don't render the form while redirecting
  if (isSignedIn) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signIn({ username, password });
      router.push("/"); // on success, go to home
    } catch (e: any) {
      setError(e.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <h1 className="text-2xl mb-4">Log In</h1>
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
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Sign In
      </button>
    </form>
  );
}
