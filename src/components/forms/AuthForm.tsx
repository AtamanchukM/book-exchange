import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { loginSchema } from "@/lib/schema/authSchema";
import { restoreSchema } from "@/lib/schema/authSchema";
import { registerSchema } from "@/lib/schema/authSchema";

type AuthFormProps = {
  title: string;
  initialValues: {
    name?: string;
    email: string;
    password: string;
  };
  validationSchema:
    | typeof loginSchema
    | typeof registerSchema
    | typeof restoreSchema;
  buttonText: string;
  method: "register" | "login";
};

export default function AuthForm(props: AuthFormProps) {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const login = useAuthStore((state) => state.login);
  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">{props.title}</h1>
      <Formik
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (props.method === "login") {
              await login(values.email, values.password);
            } else {
              await register(values.name || "", values.email, values.password);
            }
            alert("Успішно!");
            router.push("/books");
          } catch (error: any) {
            alert(error.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col  gap-4 border p-6 rounded-lg shadow-md text-white bg-gray-800">
            {props.method === "register" && (
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
            )}
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
              {props.buttonText}
            </button>
            {props.method === "login" ? (
              <div className="text-sm mt-2 flex justify-center gap-2">
                Немає акаунту?
                <a
                  href="/auth/register"
                  className="text-blue-500 hover:underline"
                >
                  Зареєструватися
                </a>
              </div>
            ) : (
              <div className="text-sm mt-2 flex justify-center gap-2">
                Вже є акаунт?
                <a
                  href="/auth/login"
                  className="text-blue-500 hover:underline"
                >
                  Увійти
                </a>
              </div>
            )
            
            }
          </Form>
        )}
      </Formik>
    </div>
  );
}
