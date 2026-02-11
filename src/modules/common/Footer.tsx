import React from "react";
import Container from "./Container";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center h-32 border-t  border-gray-200 shadow-md ">
      <Container className="flex justify-between w-full max-w-7xl ">
        <div className="text-black/40">
          © 2025 BookSwap Ukraine. Всі права захищено.
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              className="text-black/40 hover:text-black/60"
              size={24}
            />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
