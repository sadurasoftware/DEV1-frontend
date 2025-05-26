import { useFetchAllTickets } from "@/hooks/useFetchAllTickets"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { viewBackStore } from "@/store/viewBackStore"
import { useFetchTicketsCount } from "@/hooks/useFetchTicketsCount"
import { AxiosError } from "axios"
import { useLoginInfoStore } from "@/store/useLoginInfoStore"
import { useExportTicket } from "@/hooks/useExportTicket"

export const TicketsListPage = () => {
    const { pageno } = useParams();
    const { user } = useLoginInfoStore();
    const [filterData, setFilterData] = useState({
        status: '',
        priority: '',
        search: '',
        page: Number(pageno) || 1
    });

    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const [exportData, setExportData] = useState({
        startDate: '',
        endDate: '',
        format: ''

    })

    useEffect(() => {
    const today = new Date();
    const priorDate = new Date();
    priorDate.setMonth(today.getMonth() - 1);

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    setExportData(prev => ({
        ...prev,
        startDate: formatDate(priorDate),
        endDate: formatDate(today),
    }));
}, []);


    const { mutate, isPending } = useExportTicket()

    useEffect(() => {
        setFilterData(prev => ({ ...prev, page: Number(pageno) || 1 }));
    }, [pageno]);

    const debounceValue = useDebounce(filterData.search, 1000);
    const { ticketsLoading, tickets, isTicketsError, ticketsError } = useFetchAllTickets(
        filterData.status,
        filterData.priority,
        debounceValue,
        filterData.page
    );

    const { ticketsCountData, isTicketsCountError, ticketsCountError } = useFetchTicketsCount()


    const navigate = useNavigate();
    const { setBackRoutes } = viewBackStore()

    useEffect(() => {
        setFilterData(prevData => ({
            ...prevData,
            page: 1,
        }));
    }, [filterData.status, filterData.priority, filterData.search]);



    if (isTicketsError) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <h4 className="text-xl font-semibold text-red-500">
                    {(ticketsError instanceof AxiosError ? ticketsError.response?.data.message : 'An unexpected error occurred') || 'An unexpected error occurred'}

                </h4>
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

    const handleExportChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setExportData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
        setSuccessMsg('')
        setErrorMsg('')   
    };

    const handleAssignTicket = (id: string) => {
        navigate(`/assign-ticket/${id}`);
    };

    const handleUpdateStatus = (id: string) => {
        navigate(`/update-status/${id}`);
    };

    const handleViewTicket = (id: string) => {
        setBackRoutes('/tickets/1');
        navigate(`/view-ticket/${id}`);
    };

    const totalPages = tickets?.totalPages || 1;

    const handleNextPage = () => {
        if (filterData.page < totalPages) {
            navigate(`/tickets/${filterData.page + 1}`);
        }
    };

    const handlePreviousPage = () => {
        if (filterData.page > 1) {
            navigate(`/tickets/${filterData.page - 1}`);
        }
    };

    const handleExport = () => {
        try {
            mutate(exportData, {
                onSuccess: (data) => {
                    setErrorMsg('')
                    setSuccessMsg(data?.message)
                },
                onError: (error: any) => {
                    setSuccessMsg('')
                    setErrorMsg(error?.response?.data?.message || error?.response?.data?.errors)
                }
            })
        }
        catch (error: any) {
            setErrorMsg(error.message)
        }
    }


    // const openCount = tickets?.tickets.filter(ticket => ticket.status === 'Open').length;
    // const pendingCount = tickets?.tickets.filter(ticket => ticket.status === 'Pending').length;
    // const resolvedCount = tickets?.tickets.filter(ticket => ticket.status === 'Resolved').length;
    // const unassignedCount = tickets?.tickets.filter(ticket => !ticket.assignedUser).length;


    return (
        <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
            <Link to='/dashboard' className="text-left font-bold text-blue-500">Back</Link>

            <div className="max-w-7xl mx-auto mt-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500">
                        <h3 className="text-sm font-medium text-gray-500">Open Tickets</h3>
                        <p className="text-2xl font-bold text-blue-600">{ticketsCountData?.openTickets}</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4 border-l-4 border-red-500">
                        <h3 className="text-sm font-medium text-gray-500">InProgress Tickets</h3>
                        <p className="text-2xl font-bold text-red-600">{ticketsCountData?.inProgressTickets}</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4 border-l-4 border-yellow-500">
                        <h3 className="text-sm font-medium text-gray-500">Pending Tickets</h3>
                        <p className="text-2xl font-bold text-yellow-600">{ticketsCountData?.pendingTickets}</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4 border-l-4 border-green-500">
                        <h3 className="text-sm font-medium text-gray-500">Resolved Tickets</h3>
                        <p className="text-2xl font-bold text-green-600">{ticketsCountData?.resolvedTickets}</p>
                    </div>

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  mb-6">
                    <div>
                        <Label htmlFor="startDate" className="text-xs font-xxl text-gray-600 mx-5">From: </Label>
                        <input
                            type="date"
                            name="startDate"
                            value={exportData.startDate}
                            id="startDate"
                            className="p-3 border rounded-md"
                            onChange={handleExportChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="startDate" className="text-xs font-medium text-gray-600 mx-5">To:</Label>
                        <input
                            type="date"
                            name="endDate"
                            value={exportData.endDate}
                            id="endDate"
                            className="p-3 border rounded-md"
                            onChange={handleExportChange}
                        />
                    </div>

                    <div>
                        <Label className="text-xs font-medium text-gray-600 mx-5">Format:</Label>
                        <select name="format" 
                            id="format" 
                            className="p-3 border rounded-md" 
                            value={exportData.format}
                            onChange={handleExportChange}
                        >   
                            <option value="">Select Format</option>
                            <option value="csv">.csv</option>
                            <option value="pdf">.pdf</option>
                            <option value="excel">.excel</option>
                        </select>
                    </div>
                    <div>
                        <button 
                            className="p-3 bg-indigo-500 text-white font-medium rounded-md mt-2"
                            type='submit'
                            onClick={() => handleExport()}
                        > {
                                isPending ? "Exporting...." : "Export"
                            }

                        </button>
                    </div>
                    {successMsg && <p className="text-green-500 text-center">{successMsg}</p>}
                    {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
                </div>


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

                {!ticketsLoading && tickets && tickets.tickets.length > 0 ? (
                    <>
                        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr className="bg-indigo-100 text-left">
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Title</th>
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Description</th>
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Priority</th>
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                                        {
                                            user?.department === 'Support team department' &&
                                            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Update Status</th>
                                        }

                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Assigned To</th>
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.tickets.map((ticket) => (
                                        <tr key={ticket.id} className="border-b hover:bg-indigo-50">
                                            <td className="px-4 py-3 text-sm">{ticket.title}</td>
                                            <td className="px-4 py-3 text-sm">{ticket.description}</td>
                                            <td className="px-4 py-3 text-sm">{ticket.priority}</td>
                                            <td className="px-4 py-3 text-sm">{ticket.status}</td>
                                            {user?.department === 'Support team department' &&
                                                <td className="px-4 py-3 text-sm"><button
                                                    onClick={() => handleUpdateStatus(ticket.id)}
                                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
                                                >
                                                    Update Status
                                                </button></td>
                                            }

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
                                                    View Details
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
            {isTicketsCountError && <p>{ticketsCountError?.message}</p>}

        </div>
    );
};
