import type { Metadata } from "next";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export const metadata: Metadata = { title: "Sign in" };

export default async function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  const { email } = await searchParams;
  return <SignInForm defaultEmail={typeof email === "string" ? email : undefined} />;
}
