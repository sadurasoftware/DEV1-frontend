import { useGetTicketsByUser } from "@/hooks/useGetTicketsByUser";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteTicket } from '@/hooks/useDeleteTicket'; 

export const MyTickets = () => {
    const { id } = useParams();
    const { ticketLoading, ticketData, isTicketError, ticketError, refetch } = useGetTicketsByUser(id);
    const navigate = useNavigate();

    const { ticketDelete, deleteTicketPending } = useDeleteTicket();

    const handleViewTicket = (id: string) => {
        navigate(`/view-ticket/${id}`)
    };

    const handleEditTicket = (id: string) => {
        navigate(`/edit-ticket/${id}`)
    };
    
    const handleDeleteTicket = async (id: string) => {
        try {
            await ticketDelete(id);
            refetch();
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
    };

   
    if (ticketLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <h4 className="text-xl font-semibold text-gray-500">Loading...</h4>
            </div>
        );
    }


    if (isTicketError) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <h4 className="text-xl font-semibold text-red-500">{ticketError?.message}</h4>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
            <Link to='/super-admin'>Back</Link>
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-8">Tickets List</h2>

                {ticketData && ticketData.tickets.length > 0 ? (
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-indigo-100 text-left">
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">Title</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">Description</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">Priority</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">Assigned To</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">View</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">Edit</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ticketData.tickets.map((ticket: any) => (
                                    <tr key={ticket.id} className="border-b hover:bg-indigo-50">
                                        <td className="px-4 py-3 text-sm">{ticket.title}</td>
                                        <td className="px-4 py-3 text-sm">{ticket.description}</td>
                                        <td className="px-4 py-3 text-sm">{ticket.priority}</td>
                                        <td className="px-4 py-3 text-sm">{ticket.status}</td>
                                        <td className="px-4 py-3 text-sm">
                                            {ticket.assignedUser ? (
                                                <span>{ticket.assignedUser.firstname}</span>
                                            ) : (
                                                'Unassigned'
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <button
                                                onClick={() => handleViewTicket(ticket.id)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <button
                                                onClick={() => handleEditTicket(ticket.id)}
                                                className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <button
                                                onClick={() => handleDeleteTicket(ticket.id)}
                                                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                                            >
                                                {deleteTicketPending ? "Deleting" : "Delete"}
                                            </button>
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
