"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useAuthStore, restoreSchema } from "@/modules/auth";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const restore = useAuthStore((state) => state.restore);
  const error = useAuthStore((state) => state.error);
  const success = useAuthStore((state) => state.success);
  const loading = useAuthStore((state) => state.loading);
  const resetMessages = () =>
    useAuthStore.setState({ error: null, success: null });

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-white">Відновлення паролю</h1>
      <Formik
        initialValues={{ emailRestore: "" }}
        validationSchema={restoreSchema}
        onSubmit={async (values, { setSubmitting }) => {
          resetMessages();
          try {
            await restore(values.emailRestore);
            // Якщо успішно, покажемо успіх і редиректимо
            const authState = useAuthStore.getState();
            if (authState.success && !authState.error) {
              setTimeout(() => router.push("/login"), 2000);
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 border p-6 rounded-lg shadow-md text-white bg-gray-800">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-2 rounded-lg text-sm">
                {success}
              </div>
            )}
            <div>
              <Field
                name="emailRestore"
                type="email"
                placeholder="Введіть ваш email для відновлення пароля"
                className="border border-gray-600 p-2 w-full rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="emailRestore"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded transition"
            >
              {loading ? "Завантаження..." : "Відновити"}
            </button>
            <div className="text-sm mt-2 flex justify-center gap-2">
              Вже є акаунт?
              <Link href="/login" className="text-blue-400 hover:underline">
                Увійти
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
