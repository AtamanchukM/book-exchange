"use client";

import { registerSchema } from "@/lib/schema/authSchema";
import AuthForm from "@/components/forms/AuthForm";
export default function RegisterPage() {
  return (
    <AuthForm
      title="Реєстрація"
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={registerSchema}
      method="register"
      buttonText="Зареєструватися"
    />
  );
}
