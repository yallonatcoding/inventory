import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/features/auth/components/login-form";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <LoginForm />
    </div>
  );
}