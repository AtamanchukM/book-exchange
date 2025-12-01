
"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useAuthStore, registerSchema } from "@/modules/auth";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Реєстрація</h1>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await register(values.name, values.email, values.password);
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
                name="name"
                type="text"
                placeholder="Ім'я"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
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
              Зареєструватися
            </button>
            <div className="text-sm mt-2 flex justify-center gap-2">
              Вже є акаунт?
              <Link
                href="/auth/login"
                className="text-blue-500 hover:underline"
              >
                Увійти
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
