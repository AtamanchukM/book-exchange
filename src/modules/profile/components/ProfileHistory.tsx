"use client";

import { useEffect } from "react";
import type { ExchangeRequest } from "@/modules/books/types/book.types";

type ProfileHistoryProps = {
  isOpen: boolean;
  onClose: () => void;
  requests: ExchangeRequest[];
};

export default function ProfileHistory({
  isOpen,
  onClose,
  requests,
}: ProfileHistoryProps) {
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
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Історія обмінів"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Історія обмінів
            </h2>
            <p className="text-sm text-gray-500">
              Ваші запити на обмін книгами
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
            aria-label="Закрити"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto">
          {requests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">Немає запитів на обмін</p>
              <p className="text-sm mt-2">
                Почніть обмінюватися книгами з іншими користувачами
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {requests.map((req) => (
                <li
                  key={req.id}
                  className="border border-gray-200 rounded-lg px-4 py-3 hover:border-amber-300 hover:bg-amber-50/50 transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        req.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : req.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {req.status === "accepted"
                        ? "Прийнято"
                        : req.status === "rejected"
                          ? "Відхилено"
                          : "Очікує"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(req.createdAt).toLocaleDateString("uk-UA")}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{req.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
}
