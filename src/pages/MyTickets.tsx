import { useGetTicketsByUser } from "@/hooks/useGetTicketsByUser";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteTicket } from '@/hooks/useDeleteTicket'; 
import { viewBackStore } from "@/store/viewBackStore";
import { useLoginInfoStore } from "@/store/useLoginInfoStore";
import { AxiosError } from "axios";

export const MyTickets = () => {
    const { userId } = useParams();
    const { ticketLoading, ticketData, isTicketError, ticketError, refetch } = useGetTicketsByUser(userId || '');
    const navigate = useNavigate();
    const {setBackRoutes} = viewBackStore()
    const { ticketDelete, isDeleteTicketError, deleteticketError } = useDeleteTicket();

    const {user} = useLoginInfoStore();
    console.log(`User in Store:`, user)

    const handleViewTicket = (id: string) => {
        setBackRoutes(`/my-tickets/${userId}`); 
        navigate(`/view-ticket/${id}`);
    };

    const handleEditTicket = (id: string) => {
        navigate(`/edit-ticket/${id}`)
    };
    
    const handleDeleteTicket = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
        if (!confirmDelete) return;
        try {
            await ticketDelete(id);
            refetch();
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
    };


    if (isTicketError) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <h4 className="text-xl font-semibold text-red-500">
                {(ticketError instanceof AxiosError ? ticketError.response?.data.message : 'An unexpected error occurred') || 'An unexpected error occurred'}
                </h4>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
            <Link to='/dashboard'>Back</Link>
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-8">Tickets List</h2>

                {!ticketLoading && ticketData && ticketData.tickets.length > 0 ? (
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
                                {!ticketLoading && ticketData.tickets.map((ticket: any) => (
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
                                                Delete
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
            {isDeleteTicketError && 
            <h3 className='text-red font-bold mt-5'>
                {(deleteticketError instanceof AxiosError ? deleteticketError.response?.data.message : 'An unexpected error occurred') || 'An unexpected error occurred'}
            </h3>
            }
            {ticketLoading && <p>Loading...</p>}

        </div>
    );
};
