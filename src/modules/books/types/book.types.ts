export interface ExchangeRequest {
  id: string;
  userId: string; // кому адресовано
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}
export interface BookData {
  id: string;
  name: string ;
  author: string;
  photoUrl?: string;
  createdAt: string;
  ownerEmail?: string;
  ownerId: string;
  ownerName: string;
}
