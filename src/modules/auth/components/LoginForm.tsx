"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useAuthStore, loginSchema } from "@/modules/auth";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Вхід</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await login(values.email, values.password);
            router.push("/books");
          } catch (error: any) {
            alert(error.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 border p-6 rounded-lg shadow-md text-white bg-gray-800">
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <Field
                name="password"
                type="password"
                placeholder="Пароль"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-400 text-white p-2 rounded hover:bg-green-500 transition"
            >
              Увійти
            </button>
            <div className="text-sm mt-2 flex flex-col justify-center items-center gap-2">
              <div className="flex justify-center gap-2">
                Забули пароль?
                <Link
                  href="/forgot-password"
                  className="text-blue-500 hover:underline"
                >
                  Відновити
                </Link>
              </div>
              <div className="flex justify-center gap-2">
                Немає акаунту?
                <Link
                  href="/register"
                  className="text-blue-500 hover:underline"
                >
                  Зареєструватися
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
