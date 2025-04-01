import { useFetchAllTickets } from "@/hooks/useFetchAllTickets";
import { useNavigate } from "react-router-dom";

export const TicketsListPage = () => {
    const { ticketsLoading, tickets, isTicketsError, ticketsError } = useFetchAllTickets('', '', '', 1);
    const navigate = useNavigate();

    if (ticketsLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h4 className="text-xl font-semibold text-gray-500">Loading...</h4>
            </div>
        );
    }
    if (isTicketsError) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h4 className="text-xl font-semibold text-red-500">{ticketsError?.message}</h4>
            </div>
        );
    }

    const handleAssignTicket = (id: string) => {
        navigate(`/assign-ticket/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Tickets List</h2>

                {tickets && tickets.tickets.length > 0 ? (
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-indigo-100 text-left">
                                    <th className="px-4 py-2 text-sm font-semibold text-gray-600">Title</th>
                                    <th className="px-4 py-2 text-sm font-semibold text-gray-600">Description</th>
                                    <th className="px-4 py-2 text-sm font-semibold text-gray-600">Priority</th>
                                    <th className="px-4 py-2 text-sm font-semibold text-gray-600">Status</th>
                                    <th className="px-4 py-2 text-sm font-semibold text-gray-600">Assigned To</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.tickets.map((ticket) => (
                                    <tr key={ticket.id} className="border-b">
                                        <td className="px-4 py-3 text-sm">{ticket.title}</td>
                                        <td className="px-4 py-3 text-sm">{ticket.description}</td>
                                        <td className="px-4 py-3 text-sm">{ticket.priority}</td>
                                        <td className="px-4 py-3 text-sm">{ticket.status}</td>
                                        <td className="px-4 py-3 text-sm">
                                            {ticket.assignedUser ? (
                                                <span>{ticket.assignedUser.firstname}</span>
                                            ) : (
                                                <button
                                                    onClick={() => handleAssignTicket(ticket.id)}
                                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                                                >
                                                    Assign Ticket
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center text-lg text-gray-600 mt-6">No tickets available</div>
                )}
            </div>
        </div>
    );
};
