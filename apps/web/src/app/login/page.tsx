"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <button onClick={() => signIn("google")}>
        Login con Google
      </button>

      <button onClick={() => signIn("credentials")}>
        Login con email
      </button>
    </div>
  );
}