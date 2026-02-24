export type OrderStatus = "pending" | "confirmed" | "processing" | "delivered" | "cancelled";

export interface Order {
  id: string;
  userId: string;
  serviceName: string;
  planName: string;
  status: OrderStatus;
  paymentMethod: string;
  totalMRU: number;
  redemptionCode?: string;
  createdAt: string;
  fulfilledAt?: string;
}

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    userId: "user-1",
    serviceName: "Spotify Premium",
    planName: "Individual (1 Month)",
    status: "delivered",
    paymentMethod: "Bankily",
    totalMRU: 429,
    redemptionCode: "SPOT-XXXX-XXXX-XXXX",
    createdAt: "2026-02-20T10:30:00Z",
    fulfilledAt: "2026-02-20T10:45:00Z",
  },
  {
    id: "ORD-002",
    userId: "user-1",
    serviceName: "Netflix",
    planName: "Standard (1 Month)",
    status: "delivered",
    paymentMethod: "Sedad",
    totalMRU: 604,
    redemptionCode: "NFLX-XXXX-XXXX-XXXX",
    createdAt: "2026-02-18T14:20:00Z",
    fulfilledAt: "2026-02-18T14:50:00Z",
  },
  {
    id: "ORD-003",
    userId: "user-1",
    serviceName: "ChatGPT Plus",
    planName: "Plus (1 Month)",
    status: "processing",
    paymentMethod: "Masrivi",
    totalMRU: 780,
    createdAt: "2026-02-23T09:15:00Z",
  },
  {
    id: "ORD-004",
    userId: "user-1",
    serviceName: "Steam Wallet",
    planName: "$20 Steam Card",
    status: "confirmed",
    paymentMethod: "BimBank",
    totalMRU: 780,
    createdAt: "2026-02-23T11:00:00Z",
  },
  {
    id: "ORD-005",
    userId: "user-1",
    serviceName: "Apple Gift Card",
    planName: "$25 Card",
    status: "pending",
    paymentMethod: "Bankily",
    totalMRU: 975,
    createdAt: "2026-02-23T12:30:00Z",
  },
];

export const orderStatusConfig: Record<OrderStatus, { label: string; labelAr: string; labelFr: string; color: string }> = {
  pending: { label: "Pending", labelAr: "قيد الانتظار", labelFr: "En attente", color: "#D4A445" },
  confirmed: { label: "Confirmed", labelAr: "مؤكد", labelFr: "Confirmé", color: "#00D4AA" },
  processing: { label: "Processing", labelAr: "قيد المعالجة", labelFr: "En cours", color: "#3693F3" },
  delivered: { label: "Delivered", labelAr: "تم التسليم", labelFr: "Livré", color: "#1DB954" },
  cancelled: { label: "Cancelled", labelAr: "ملغي", labelFr: "Annulé", color: "#E50914" },
};
