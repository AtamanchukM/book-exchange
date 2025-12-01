import { Formik, Form, Field } from "formik";
import { changeProfile } from "@/modules/auth/services/changeProfile";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
export default function ProfileForm() {
  const user = useAuthStore((s) => s.user);
  const userId = user?.uid;
  return (
    <Formik
      initialValues={{
        name: user?.name || "",
        email: user?.email || "",
        avatar: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (!userId) return;
        changeProfile(userId, values, setSubmitting);
      }}
    >
      <Form className="flex flex-col gap-4 mb-6">
        <label>
          Ім'я:
          <Field name="name" className="text-black px-2 py-1 rounded ml-2" />
        </label>
        <label>
          Email:
          <Field
            name="email"
            type="email"
            className="text-black px-2 py-1 rounded ml-2"
          />
        </label>
        <label>
          Аватар (URL):
          <Field name="avatar" className="text-black px-2 py-1 rounded ml-2" />
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
