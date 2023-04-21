export type EventType = {
  name: string;

  place: string;
  time: string;

  ticketVariants: TicketVariant[];
};

export type TicketVariant = {
  id: number;
  title: string;
  text: string;
  price: number;
};

export type TicketOrder = {
  tickets: Record<number, number>;

  name: string;
  email: string;
  phone: string;
};
