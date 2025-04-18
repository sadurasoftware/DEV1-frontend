// export type Ticket = {
//   ticketID: number
//   title: string
//   description: string
//   attachment: string | File | null
//   priority: 'Low' | 'Medium' | 'High'
//   category: string
//   createdBy: number
//   status: 'Open' | 'Closed'
// }

export type Ticket = {
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  category: string
  status: 'Open' | 'Closed' | 'In Progress' | 'Resolved' | 'Pending'
  attachment: string | File | null
}

export type Comment = {
  user: string
  message: string
  createdAt: Date
}

export type ApiResponse = {
  message: string
  ticket: Ticket
}

export type ErrorResponse = {
  message: string
}

export type ticketType = {
  id: string;
  title: string;
  description: string;
  attachment: string | null;
  priority: 'High' | 'Medium' | 'Low';
  categoryId: number;
  status: string; 
  createdBy: number;
  assignedTo: number | null;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    firstname: string;
  };
  assignedUser: {
    id: number | null;
    firstname: string | null;
  } | null;
};

export type ticketResponse = {
  total: number;
  page: number;
  totalPages: number;
  tickets: ticketType[];
};
