'use client';
// import { getExchangeRequestsForUser } from "@/services/exchangeService"; // створіть цю функцію для реальних запитів
import { useAuthStore } from "@/stores/useAuthStore";
import { useUserBooks } from "@/hooks/useUserBooks";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const { books } = useUserBooks(user?.uid);
  const [requests, setRequests] = useState<any[]>([]);

  // Заглушка для запитів на обмін
  useEffect(() => {
    // getExchangeRequestsForUser(user?.uid).then(setRequests);
    setRequests([
      { id: 1, message: "Вам надійшов запит на обмін від user2" },
      { id: 2, message: "Ваш запит на обмін прийнято!" },
    ]);
  }, [user?.uid]);

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-gray-800 rounded text-white">
      <h1 className="text-2xl mb-4">Профіль</h1>
      <Formik
        initialValues={{ name: user?.name || "", email: user?.email || "", avatar: "" }}
        onSubmit={async (values) => {
          // TODO: update profile in Firestore/Auth
          alert("Профіль оновлено (заглушка)");
        }}
      >
        <Form className="flex flex-col gap-4 mb-6">
          <label>
            Ім'я:
            <Field name="name" className="text-black px-2 py-1 rounded ml-2" />
          </label>
          <label>
            Email:
            <Field name="email" type="email" className="text-black px-2 py-1 rounded ml-2" />
          </label>
          <label>
            Аватар (URL):
            <Field name="avatar" className="text-black px-2 py-1 rounded ml-2" />
          </label>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white">Зберегти</button>
        </Form>
      </Formik>
      <div className="mb-4">Кількість книг: <b>{books.length}</b></div>
      <div>
        <h2 className="text-xl mb-2">Запити на обмін</h2>
        <ul className="list-disc ml-6">
          {requests.length === 0 && <li>Немає запитів</li>}
          {requests.map((req) => (
            <li key={req.id}>{req.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
