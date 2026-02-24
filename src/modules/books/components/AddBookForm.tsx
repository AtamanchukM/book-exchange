import { Formik, Form, Field, ErrorMessage } from "formik";
import { addBookSchema } from "@/modules/books/lib/schema/addBookSchema";
import { addBook } from "@/modules/books/services/addBook";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
import { useEffect } from "react";

type AddBookFormProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const bookCategories = [
  { value: "fiction", label: "Художня література" },
  { value: "non-fiction", label: "Нехудожня література" },
  { value: "science", label: "Наукова література" },
  { value: "history", label: "Історична література" },
  { value: "children", label: "Дитяча література" },
  { value: "biography", label: "Біографія" },
  { value: "fantasy", label: "Фентезі" },
  { value: "mystery", label: "Детектив" },
  { value: "romance", label: "Роман" },
  { value: "thriller", label: "Трилер" },
  { value: "self-help", label: "Самодопомога" },
];

export default function AddBookForm({
  isOpen = true,
  onClose,
}: AddBookFormProps) {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Додати книгу</h2>
          <p className="text-sm text-gray-500">
            Додайте нову книгу до вашої колекції
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
            aria-label="Закрити"
          >
            x
          </button>
        )}
      </div>
      <div className="px-6 py-5">
        <Formik
          initialValues={{
            name: "",
            author: "",
            photoUrl: "",
            category: "",
            description: "",
          }}
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
              ownerLocation: user?.location || "",
              category: values.category,
              description: values.description,
            };
            await addBook(newBook);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Назва книги
                <Field
                  type="text"
                  name="name"
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  placeholder="Назва книги"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Автор
                <Field
                  type="text"
                  name="author"
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  placeholder="Автор книги"
                />
                <ErrorMessage
                  name="author"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Фото (URL)
                <Field
                  type="text"
                  name="photoUrl"
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  placeholder="Посилання на фото"
                />
                <ErrorMessage
                  name="photoUrl"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Опис
                <Field
                  as="textarea"
                  name="description"
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  placeholder="Опис книги"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Категорія
                <Field
                  as="select"
                  name="category"
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                >
                  {bookCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-600 hover:border-gray-300 hover:text-gray-800"
                  >
                    Скасувати
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Додати книгу
                </button>
              </label>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );

  if (onClose) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        onClick={onClose}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Додати книгу"
        >
          {modalContent}
        </div>
      </div>
    );
  }

  return modalContent;
}
