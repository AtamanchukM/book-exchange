"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { loginSchema } from "@/lib/schema/authSchema";
import { restoreSchema } from "@/lib/schema/authSchema";
import { registerSchema } from "@/lib/schema/authSchema";
import Link from "next/link";

type AuthFormProps = {
  title: string;
  initialValues: {
    name?: string;
    email?: string;
    emailRestore?: string;
    password?: string;
  };
  validationSchema:
    | typeof loginSchema
    | typeof registerSchema
    | typeof restoreSchema;
  buttonText: string;
  method: "register" | "login" | "restore";
};

export default function AuthForm(props: AuthFormProps) {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const login = useAuthStore((state) => state.login);
  const restore = useAuthStore((state) => state.restore);
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
            } else if (props.method === "register") {
              await register(values.name || "", values.email, values.password);
            } else if (props.method === "restore") {
              await restore(values.emailRestore || "");
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
            {props.method !== "restore" && (
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
            )}
            {/* RESET PASSWORD */}
            {props.method === "restore" ? (
              <div>
                <Field
                  name="emailRestore"
                  type="email"
                  placeholder="Введіть ваш email для відновлення пароля"
                  className="border p-2 w-full rounded"
                />
                <ErrorMessage
                  name="emailRestore"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            ) : null}

            {props.method !== "restore" && (
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
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-400 text-white p-2 rounded hover:bg-green-500 transition"
            >
              {props.buttonText}
            </button>
            {props.method === "login" ? (
              <div className="text-sm mt-2 flex flex-col justify-center items-center gap-2">
                <div className="flex justify-center gap-2">
                  Забули пароль?
                  <Link
                    href="/auth/forgot-password"
                    className="text-blue-500 hover:underline"
                  >
                    Відновити
                  </Link>
                </div>
                <div className=" flex justify-center gap-2">
                  Немає акаунту?
                  <Link
                    href="/auth/register"
                    className="text-blue-500 hover:underline"
                  >
                    Зареєструватися
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-sm mt-2 flex justify-center gap-2">
                Вже є акаунт?
                <Link
                  href="/auth/login"
                  className="text-blue-500 hover:underline"
                >
                  Увійти
                </Link>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
