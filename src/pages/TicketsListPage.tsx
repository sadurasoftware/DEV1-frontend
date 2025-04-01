import { useNavigate } from "react-router-dom";
import { useFetchAllTickets } from "@/hooks/useFetchAllTickets";

export const TicketsListPage = () =>{

    const {ticketsLoading, tickets, isTicketsError, ticketsError} = useFetchAllTickets('Open', 'Medium', '', 1)

    if(ticketsLoading)
    {
        return <h4>Loading...</h4>
    }
    if(isTicketsError)
    {
        return <h4>{ticketsError?.message}</h4>
    }

    return(
        <>
<div>
      
      <h2>Tickets List</h2>
      
      {tickets && tickets.tickets.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {tickets.tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.description}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.status}</td>
                <td>{ticket.assignedUser ? ticket.assignedUser.firstname : 'Unassigned'}</td>
                <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                <td>{new Date(ticket.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No tickets available</div>
      )}
    </div>

        </>
    )
}