"use client";

import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
import { useEffect, useState } from "react";
import { getIncomingRequests } from "@/modules/books/services/exchangeRequests";
import ProfileForm from "@/modules/profile/components/ProfileForm";
import ExchangeManagement from "@/modules/profile/components/ExchangeManagement";
import { ExchangeRequest } from "@/modules/books/types/book.types";
import Container from "@/modules/common/Container";
import ProfileInfo from "@/modules/profile/components/ProfileInfo";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { useUserBooks } from "@/modules/books";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const userId = user?.uid;
  const [requests, setRequests] = useState<ExchangeRequest[]>([]);
  const { books } = useUserBooks(userId);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    getIncomingRequests(userId).then(setRequests);
  }, [userId]);

  return (
    <Container className="flex justify-center items-center min-h-[80vh] px-0 ">
      <div className="w-full max-w-2xl  rounded-2xl md:shadow-2xl  text-gray-100 ">
        <div className="mb-6">
          <ProfileInfo
            user={user}
            books={books}
            requests={requests}
            onEditClick={() => setIsEditOpen(true)}
          />
        </div>

        <div className="px-8 pb-8 flex flex-col gap-6">
          <div className="">
            <button
              onClick={() => setIsExchangeOpen(true)}
              className="flex items-center gap-2 text-black"
            >
              <svg
                className="h-6 w-6 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
              <span>Управління обмінами</span>
            </button>
          </div>

          <div className="">
            <Link
              href="/settings"
              className="flex items-center gap-2 text-black"
            >
              <IoSettingsOutline size={24} className=" text-gray-400" />
              <span>Налаштування</span>
            </Link>
          </div>
          <div className="">
            <button
              className="flex items-center gap-2 text-red-500 cursor-pointer"
              onClick={logout}
            >
              <FiLogOut size={24} />
              <span>Вийти</span>
            </button>
          </div>
        </div>
      </div>
      <ProfileForm isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />

      {userId && (
        <ExchangeManagement
          isOpen={isExchangeOpen}
          onClose={() => setIsExchangeOpen(false)}
          userId={userId}
        />
      )}
    </Container>
  );
}
