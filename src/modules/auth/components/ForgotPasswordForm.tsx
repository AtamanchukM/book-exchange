"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useAuthStore, restoreSchema } from "@/modules/auth";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const restore = useAuthStore((state) => state.restore);
  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Відновлення паролю</h1>
      <Formik
        initialValues={{ emailRestore: "" }}
        validationSchema={restoreSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await restore(values.emailRestore);
            alert("Інструкції для відновлення паролю надіслано на email!");
            router.push("/login");
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-400 text-white p-2 rounded hover:bg-green-500 transition"
            >
              Відновити
            </button>
            <div className="text-sm mt-2 flex justify-center gap-2">
              Вже є акаунт?
              <Link
                href="/login"
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
