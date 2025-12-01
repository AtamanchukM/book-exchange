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
      <Form className="flex flex-col gap-4 mb-6">
        <label>
          Ім'я:
          <Field
            name="name"
            className="text-black px-2 rounded ml-2 border border-blue-200 py-2 "
          />
        </label>
        <label>
          Email:
          <Field
            name="email"
            type="email"
            className="text-black px-2 rounded ml-2 border border-blue-200 py-2 "
          />
        </label>
        <label>
          Аватар (URL):
          <Field
            name="avatar"
            className="text-black px-2 rounded ml-2 border border-blue-200 py-2 "
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Зберегти
        </button>
      </Form>
    </Formik>
  );
}
