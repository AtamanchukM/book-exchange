"use client";

import { Formik, Form, Field } from "formik";
import { useEffect } from "react";
import { changeProfile, useAuthStore } from "@/modules/auth";
import type { ProfileFormValues } from "@/modules/auth/types/auth.types";

type ProfileFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProfileForm({ isOpen, onClose }: ProfileFormProps) {
  const user = useAuthStore((s) => s.user);
  const userId = user?.uid;
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Редагування профілю"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Редагувати профіль
            </h2>
            <p className="text-sm text-gray-500">
              Оновіть ім&apos;я, email або фото
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
            aria-label="Закрити"
          >
            x
          </button>
        </div>
        <div className="px-6 py-5">
          <Formik<ProfileFormValues>
            initialValues={{
              name: user?.name || "",
              email: user?.email || "",
              avatar: user?.avatar || "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              if (!userId) {
                setSubmitting(false);
                return;
              }
              const isSuccess = await changeProfile(
                userId,
                values,
                setSubmitting,
              );
              if (isSuccess) onClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                  Ім&apos;я
                  <Field
                    name="name"
                    className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                    placeholder="Ваше ім'я"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                  Email
                  <Field
                    name="email"
                    type="email"
                    className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                    placeholder="Email"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                  Аватар (URL)
                  <Field
                    name="avatar"
                    className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                    placeholder="Посилання на аватар"
                  />
                </label>
                <div className="mt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-600 hover:border-gray-300 hover:text-gray-800"
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    Зберегти
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
