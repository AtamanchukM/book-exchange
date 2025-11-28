"use client";

import { restoreSchema } from "@/lib/schema/authSchema";
import AuthForm from "@/components/forms/AuthForm";
export default function ForgotPassword() {
  return (
    <AuthForm
      title="Відновлення пароля"
      initialValues={{ emailRestore: "" }}
      validationSchema={restoreSchema}
      method="restore"
      buttonText="Відновити пароль"
    />
  );
}
