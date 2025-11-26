"use client";

import { loginSchema } from "@/lib/schema/authSchema";
import AuthForm from "@/components/forms/AuthForm";

export default function Login() {
  return (
    <AuthForm
      title="Вхід"
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      method="login"
      buttonText="Увійти"
    />
  );
}
