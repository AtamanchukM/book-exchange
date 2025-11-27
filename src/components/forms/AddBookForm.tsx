import { Formik, Form, Field, ErrorMessage } from "formik";
import { addBookSchema } from "@/lib/schema/addBookSchema";
import { addBook } from "@/services/addBook";
import Container from "@/components/common/Container";
import { useAuthStore } from "@/stores/useAuthStore";
export default function AddBookForm() {
  const user = useAuthStore((state) => state.user);

  return (
    <Container>
      <div className="flex flex-col w-fit m-auto gap-2 mt-8">
        <Formik
          initialValues={{ name: "", author: "", photoUrl: "" }}
          validationSchema={addBookSchema}
          onSubmit={async (values, { resetForm }) => {
            await addBook({
              id: `${Math.floor(Math.random() * 10000)}`,
              photoUrl: values.photoUrl,
              name: values.name,
              author: values.author,
              createdAt: new Date().toISOString(),
              ownerId: user?.uid || "",
              ownerName: user?.name || "",
            });
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col w-fit m-auto gap-2 mt-8">
              <div className="flex">
                <Field
                  type="text"
                  name="name"
                  className="border"
                  placeholder="Book Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex">
                <Field
                  type="text"
                  name="author"
                  className="border"
                  placeholder="Author"
                />
                <ErrorMessage
                  name="author"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex">
                <Field
                  type="text"
                  name="photoUrl"
                  className="border"
                  placeholder="Photo URL"
                />
                <ErrorMessage
                  name="photoUrl"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 transition-all text-white px-4 py-2 rounded"
                disabled={isSubmitting}
              >
                Add Book
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
