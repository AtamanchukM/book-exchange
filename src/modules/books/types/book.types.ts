export interface ExchangeRequest {
  id: string;
  userId: string; // кому адресовано
  senderId?: string; // від кого
  senderName?: string;
  senderEmail?: string;
  bookId?: string; // яку книгу запитують
  bookName?: string;
  offeredBooks?: string; // що пропонують
  offeredBooksNames?: string[]; // імена запропонованих книг
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}
export interface BookData {
  id: string;
  name: string;
  author: string;
  photoUrl?: string;
  createdAt: string;
  ownerEmail?: string;
  ownerId: string;
  ownerName: string;
  ownerLocation: string;
  category?: string;
  description?: string;
}
