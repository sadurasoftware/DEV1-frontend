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
  ticketName: string
  description: string
  attachments: string[]
  priority: 'Low' | 'Medium' | 'High'
  category: 'Bug' | 'General' | 'Feedback'
  status: 'Open' | 'In Progress' | 'On Hold' | 'Closed'
  ticketID: string
  createdBy: string
  assignedTo: string
  //   createdDate: Date
  comments: Comment[]
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
