import { Formik, Form, Field } from "formik";
import { changeProfile, useAuthStore } from "@/modules/auth";
import type { ProfileFormValues } from "@/modules/auth/types/auth.types";
export default function ProfileForm() {
  const user = useAuthStore((s) => s.user);
  const userId = user?.uid;
  return (
    <Formik<ProfileFormValues>
      initialValues={{
        name: user?.name || "",
        email: user?.email || "",
        avatar: user?.avatar || "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (!userId) return;
        changeProfile(userId, values, setSubmitting);
      }}
    >
      <Form className="flex flex-col gap-5 mb-6">
        <label className="flex flex-col gap-1 text-blue-100 font-medium">
          Ім'я:
          <Field
            name="name"
            className="bg-gray-900 text-blue-100 px-3 py-2 rounded border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-400"
            placeholder="Ваше ім'я"
          />
        </label>
        <label className="flex flex-col gap-1 text-blue-100 font-medium">
          Email:
          <Field
            name="email"
            type="email"
            className="bg-gray-900 text-blue-100 px-3 py-2 rounded border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-400"
            placeholder="Email"
          />
        </label>
        <label className="flex flex-col gap-1 text-blue-100 font-medium">
          Аватар (URL):
          <Field
            name="avatar"
            className="bg-gray-900 text-blue-100 px-3 py-2 rounded border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-400"
            placeholder="Посилання на аватар"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-blue-100 font-bold px-6 py-2 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Зберегти
        </button>
      </Form>
    </Formik>
  );
}
