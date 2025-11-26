"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Book() {

  return (
    <ProtectedRoute>
      <div className="">book</div>
    </ProtectedRoute>
  );
}
