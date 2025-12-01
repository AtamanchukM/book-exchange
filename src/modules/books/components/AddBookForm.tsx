import { Formik, Form, Field, ErrorMessage } from "formik";
import { addBookSchema } from "@/modules/books/lib/schema/addBookSchema";
import { addBook } from "@/modules/books/services/addBook";
import Container from "@/modules/common/Container";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";

export default function AddBookForm() {
  const user = useAuthStore((state) => state.user);

  return (
    <Container>
      <div className="flex flex-col w-full max-w-md m-auto gap-4 mt-10 bg-gray-800 p-8 rounded-lg shadow-lg">
        <Formik
          initialValues={{ name: "", author: "", photoUrl: "" }}
          validationSchema={addBookSchema}
          onSubmit={async (values, { resetForm }) => {
            const newBook = {
              id: `${Math.floor(Math.random() * 10000)}`,
              photoUrl: values.photoUrl,
              name: values.name,
              author: values.author,
              createdAt: new Date().toISOString(),
              ownerId: user?.uid || "",
              ownerName: user?.name || "",
            };
            await addBook(newBook);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5">
              <h2 className="text-2xl font-bold text-white mb-1 ">Додати книгу</h2>
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-white font-medium ">Назва книги</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-white"
                  placeholder="Book Name"
                />
                <div className="min-h-[20px]">
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-400 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="author" className="text-white font-medium">Автор</label>
                <Field
                  type="text"
                  name="author"
                  id="author"
                  className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-white"
                  placeholder="Author"
                />
                <div className="min-h-[20px]">
                  <ErrorMessage
                    name="author"
                    component="div"
                    className="text-red-400 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="photoUrl" className="text-white font-medium">Фото (URL)</label>
                <Field
                  type="text"
                  name="photoUrl"
                  id="photoUrl"
                  className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-white"
                  placeholder="Photo URL"
                />
                <div className="min-h-[20px]">
                  <ErrorMessage
                    name="photoUrl"
                    component="div"
                    className="text-red-400 text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 transition-all text-white px-4 py-2 rounded font-semibold mt-2"
                disabled={isSubmitting}
              >
                Додати книгу
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
