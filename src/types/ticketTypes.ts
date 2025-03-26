//   export enum Category {
//     Bug = "Bug",
//     FeatureRequest = "Feature Request",
//     Task = "Task",
//     Improvement = "Improvement"
//   }

//   export enum Status {
//     Open = "Open",
//     InProgress = "In Progress",
//     Closed = "Closed",
//     OnHold = "On Hold"
//   }

export type Ticket = {
  ticketID: number
  title: string
  description: string
  attachment: string
  priority: 'Low' | 'Medium' | 'High'
  categoryId: number
  createdBy: number
  assignedTo: number
  status: 'Open' | 'Closed'
}

export type Comment = {
  user: string
  message: string
  createdAt: Date
}

export type ApiResponse = {
  message: string
  data: Ticket
}

export type ErrorResponse = {
  message: string
}
