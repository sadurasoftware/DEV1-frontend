import { useFetchAllTickets } from "@/hooks/useFetchAllTickets";
import { useNavigate } from "react-router-dom";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export const TicketsListPage = () => {
    const [filterData, setFilterData] = useState({
        status: '',
        priority: '',
        search: '',
        page: 1
    });
    const debounceValue = useDebounce(filterData.search, 1000);
    const { ticketsLoading, tickets, isTicketsError, ticketsError } = useFetchAllTickets(
        filterData.status, 
        filterData.priority, 
        debounceValue, 
        filterData.page
    );
    const navigate = useNavigate();

    useEffect(() => {
        setFilterData(prevData => ({
            ...prevData,
            page: 1, 
        }));
    }, [filterData.status, filterData.priority, filterData.search]);

    // if (ticketsLoading) {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen bg-gray-100">
    //             <h4 className="text-xl font-semibold text-gray-500">Loading...</h4>
    //         </div>
    //     );
    // }

    if (isTicketsError) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <h4 className="text-xl font-semibold text-red-500">{ticketsError?.message}</h4>
            </div>
        );
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFilterData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAssignTicket = (id: string) => {
        navigate(`/assign-ticket/${id}`);
    };

    const handleViewTicket = (id: string) => {
        navigate(`/view-ticket/${id}`);
    };

    const handleEditTicket = (id: string) => {
        navigate(`/edit-ticket/${id}`);
    };

    const totalPages = tickets?.totalPages || 1;

    const handleNextPage = () => {
        if (filterData.page < totalPages) {
            setFilterData(prevData => ({
                ...prevData,
                page: prevData.page + 1,
            }));
        }
    };

    const handlePreviousPage = () => {
        if (filterData.page > 1) {
            setFilterData(prevData => ({
                ...prevData,
                page: prevData.page - 1,
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-8">Tickets List</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div>
                        <Label htmlFor="priority" className="text-xs font-medium text-gray-600">Priority</Label>
                        <select
                            id="priority"
                            name="priority"
                            value={filterData.priority}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="status" className="text-xs font-medium text-gray-600">Status</Label>
                        <select
                            id="status"
                            name="status"
                            value={filterData.status}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="search" className="text-xs font-medium text-gray-600">Search</Label>
                        <Input
                            id="search"
                            name="search"
                            value={filterData.search}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Search tickets..."
                        />
                    </div>
                </div>

                {tickets && tickets.tickets.length > 0 ? (
                    <>
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

                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.tickets.map((ticket) => (
                                        <tr key={ticket.id} className="border-b hover:bg-indigo-50">
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
                                            <td className="px-4 py-3 text-sm">
                                                <button
                                                    onClick={() => handleViewTicket(ticket.id)}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                                                >
                                                    View
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={filterData.page === 1}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                            >
                                Previous
                            </button>
                            <span className="text-gray-600">Page {filterData.page} of {totalPages}</span>
                            <button
                                onClick={handleNextPage}
                                disabled={filterData.page >= totalPages}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-lg text-gray-600 mt-6">No tickets available</div>
                )}
            </div>
        </div>
    );
};
