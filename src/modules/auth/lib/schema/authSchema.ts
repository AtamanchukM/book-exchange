import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string().min(2, "Мінімум 2 символи").required("Ім’я обов’язкове"),
  email: Yup.string().email("Некоректний email").required("Email обов’язковий"),
  password: Yup.string()
    .min(6, "Мінімум 6 символів")
    .required("Пароль обов’язковий"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email("Некоректний email").required("Email обов’язковий"),
  password: Yup.string()
    .min(6, "Мінімум 6 символів")
    .required("Пароль обов’язковий"),
});

export const restoreSchema = Yup.object({
  emailRestore: Yup.string()
    .email("Некоректний email")
    .required("Email обов’язковий")

});
