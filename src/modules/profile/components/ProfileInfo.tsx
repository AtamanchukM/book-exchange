import React from "react";
import Image from "next/image";
import type { AuthUser } from "@/modules/auth/types/auth.types";
import { SlLocationPin } from "react-icons/sl";
import defaultAvatar from "../images/default-avatar.png";

import type {
  BookData,
  ExchangeRequest,
} from "@/modules/books/types/book.types";
import { CiMail } from "react-icons/ci";

type ProfileUser = AuthUser & {
  location?: string;
  rating?: number | string;
};

type ProfileInfoProps = {
  user: ProfileUser | null;
  books: BookData[];
  requests: ExchangeRequest[];
  onEditClick?: () => void;
};

export default function ProfileInfo({
  user,
  books,
  requests,
  onEditClick,
}: ProfileInfoProps) {
  return (
    <div className="">
      <div className="bg-amber-100 h-30 rounded-t-lg"></div>
      <div className="bg-white  py-8">
        <div className="flex items-start justify-between px-8">
          <div className="-mt-20">
            <div className="rounded-full border-12 border-white  overflow-hidden w-32 h-32 bg-gray-200">
              <Image
                src={user?.avatar || defaultAvatar}
                alt="Аватар користувача"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="">
            <button
              type="button"
              onClick={onEditClick}
              disabled={!onEditClick}
              className="px-6 py-2 border-2 border-gray-400 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              Редагувати профіль
            </button>
          </div>
        </div>
        <div className="px-8 mt-4">
          <h1 className="text-4xl font-bold text-black mb-1">
            {user?.name || "Користувач"}
          </h1>

          <div className="flex gap-6 text-gray-600 flex-col">
            <div className="flex items-center gap-2">
              <CiMail className="h-5 w-5 text-gray-400" />
              <span>{user?.email || "email@example.com"}</span>
            </div>
            <div className="flex items-center gap-2">
              <SlLocationPin className="h-5 w-5 text-gray-400" />
              <span>{user?.location || "Місто, Країна"}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 px-8 mt-8 border-y py-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-black mb-2">
              {books.length || 0}
            </p>
            <p className="text-gray-600 font-medium">Книг</p>
          </div>
          <div className="text-center border-x ">
            <p className="text-4xl font-bold text-black mb-2 ">
              {requests.length || 0}
            </p>
            <p className="text-gray-600 font-medium">Обмінів</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-black mb-2">
              {user?.rating || "0.0"}
            </p>
            <p className="text-gray-600 font-medium">Рейтинг</p>
          </div>
        </div>
      </div>
    </div>
  );
}
