import * as Yup from "yup";

export const addBookSchema = Yup.object({
  name: Yup.string()
    .min(2, "Мінімум 2 символи")
    .required("Назва книги обов’язкова"),
  author: Yup.string()
    .min(2, "Мінімум 2 символи")
    .required("Автор обов’язковий"),
  photoUrl: Yup.string().required("Фото обов’язкове"),
});
