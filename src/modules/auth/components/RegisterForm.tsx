"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useAuthStore, registerSchema } from "@/modules/auth";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const error = useAuthStore((state) => state.error);
  const loading = useAuthStore((state) => state.loading);
  const resetError = () => useAuthStore.setState({ error: null });

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-white">Реєстрація</h1>
      <Formik
        initialValues={{ name: "", email: "", password: "", location: "" }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting }) => {
          resetError();
          try {
            await register(
              values.name,
              values.email,
              values.password,
              values.location,
            );
            // Перевіримо, чи користувач успішно зареєструвався
            const user = useAuthStore.getState().user;
            if (user) {
              router.push("/books");
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
            <div>
              <Field
                name="name"
                type="text"
                placeholder="Ім'я"
                className="border border-gray-600 p-2 w-full rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="border border-gray-600 p-2 w-full rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>
            <div>
              <Field
                name="password"
                type="password"
                placeholder="Пароль"
                className="border border-gray-600 p-2 w-full rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>
            <div>
              <Field
                name="location"
                type="text"
                placeholder="Місцезнаходження"
                className="border border-gray-600 p-2 w-full rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded transition"
            >
              {loading ? "Завантаження..." : "Зареєструватися"}
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
