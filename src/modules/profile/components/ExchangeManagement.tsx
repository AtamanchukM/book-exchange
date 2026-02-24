"use client";

import { useEffect, useState, useCallback } from "react";
import type { ExchangeRequest } from "@/modules/books/types/book.types";
import {
  getIncomingRequests,
  getOutgoingRequests,
  updateRequestStatus,
} from "@/modules/books/services/exchangeRequests";
import { performBookExchange } from "@/modules/books/services/performExchange";

type ExchangeManagementProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
};

export default function ExchangeManagement({
  isOpen,
  onClose,
  userId,
}: ExchangeManagementProps) {
  const [activeTab, setActiveTab] = useState<"incoming" | "outgoing">(
    "incoming",
  );
  const [incomingRequests, setIncomingRequests] = useState<ExchangeRequest[]>(
    [],
  );
  const [outgoingRequests, setOutgoingRequests] = useState<ExchangeRequest[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  const loadRequests = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const [incoming, outgoing] = await Promise.all([
        getIncomingRequests(userId),
        getOutgoingRequests(userId),
      ]);
      setIncomingRequests(incoming);
      setOutgoingRequests(outgoing);
    } catch (error) {
      console.error("Error loading requests:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !userId) return;
    loadRequests();
  }, [isOpen, userId, loadRequests]);

  const handleAccept = async (request: ExchangeRequest) => {
    if (!request.bookId || !request.senderId || !request.senderName) {
      alert("Недостатньо даних для обміну");
      return;
    }

    const confirmExchange = window.confirm(
      `Ви дійсно хочете обміняти книгу "${request.bookName}" з користувачем ${request.senderName}?`,
    );

    if (!confirmExchange) return;

    try {
      // Розпарсити ID запропонованих книг
      const offeredBookIds = request.offeredBooks
        ? request.offeredBooks.split(", ").filter(Boolean)
        : [];

      // Виконати двосторонній обмін книги
      await performBookExchange(
        request.bookId,
        userId,
        request.senderId,
        offeredBookIds,
      );

      // Оновити статус запиту
      await updateRequestStatus(request.id, "accepted");

      await loadRequests();
      alert("Обмін успішно виконано! Книги успішно змінили власників.");
    } catch (error) {
      console.error("Error accepting request:", error);
      alert(
        "Помилка при прийнятті запиту: " +
          (error instanceof Error ? error.message : "Невідома помилка"),
      );
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await updateRequestStatus(requestId, "rejected");
      await loadRequests();
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Помилка при відхиленні запиту");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white shadow-xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Управління обмінами"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Управління обмінами
            </h2>
            <p className="text-sm text-gray-500">
              Переглядайте та керуйте запитами на обмін
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

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            onClick={() => setActiveTab("incoming")}
            className={`px-4 py-3 text-sm font-medium transition border-b-2 ${
              activeTab === "incoming"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Вхідні ({incomingRequests.length})
          </button>
          <button
            onClick={() => setActiveTab("outgoing")}
            className={`px-4 py-3 text-sm font-medium transition border-b-2 ${
              activeTab === "outgoing"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Вихідні ({outgoingRequests.length})
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto flex-1">
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Завантаження...
            </div>
          ) : activeTab === "incoming" ? (
            <IncomingRequestsTab
              requests={incomingRequests}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ) : (
            <OutgoingRequestsTab requests={outgoingRequests} />
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

function IncomingRequestsTab({
  requests,
  onAccept,
  onReject,
}: {
  requests: ExchangeRequest[];
  onAccept: (request: ExchangeRequest) => Promise<void>;
  onReject: (id: string) => Promise<void>;
}) {
  const pendingRequests = requests.filter((r) => r.status === "pending");

  if (requests.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">Немає вхідних запитів</p>
        <p className="text-sm mt-2">
          Тут з&apos;являться запити від інших користувачів
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pendingRequests.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Очікують на відповідь
          </h3>
          <div className="space-y-3">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="border border-amber-200 rounded-lg px-4 py-3 bg-amber-50/30"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {req.senderName || "Невідомий користувач"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {req.senderEmail || ""}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(req.createdAt).toLocaleDateString("uk-UA")}
                  </span>
                </div>
                {req.bookName && (
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Книга:</span> {req.bookName}
                  </p>
                )}
                {req.offeredBooks && (
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Пропонує:</span>{" "}
                    {req.offeredBooks}
                  </p>
                )}
                <p className="text-sm text-gray-600 mb-3">{req.message}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => onAccept(req)}
                    className="flex-1 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition"
                  >
                    Прийняти
                  </button>
                  <button
                    onClick={() => onReject(req.id)}
                    className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
                  >
                    Відхилити
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {requests.filter((r) => r.status !== "pending").length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 mt-6">
            Оброблені
          </h3>
          <div className="space-y-3">
            {requests
              .filter((r) => r.status !== "pending")
              .map((req) => (
                <div
                  key={req.id}
                  className="border border-gray-200 rounded-lg px-4 py-3"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {req.senderName || "Невідомий користувач"}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        req.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status === "accepted" ? "Прийнято" : "Відхилено"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{req.message}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OutgoingRequestsTab({ requests }: { requests: ExchangeRequest[] }) {
  if (requests.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">Немає вихідних запитів</p>
        <p className="text-sm mt-2">
          Ви ще не надсилали запити на обмін книгами
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((req) => (
        <div
          key={req.id}
          className="border border-gray-200 rounded-lg px-4 py-3 hover:border-amber-300 transition"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              {req.bookName && (
                <p className="font-medium text-gray-900">{req.bookName}</p>
              )}
            </div>
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
          </div>
          {req.offeredBooks && (
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Ви пропонуєте:</span>{" "}
              {req.offeredBooks}
            </p>
          )}
          <p className="text-sm text-gray-600 mb-2">{req.message}</p>
          <p className="text-xs text-gray-400">
            {new Date(req.createdAt).toLocaleDateString("uk-UA")}
          </p>
        </div>
      ))}
    </div>
  );
}
