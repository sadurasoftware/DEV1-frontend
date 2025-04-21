import { Link, useParams } from 'react-router-dom';
import { useFetchTicketById } from '@/hooks/useFetchTicketById';
import { useFetchCategories } from '@/hooks/useFetchCategories'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react';
import { useUpdateTicketStatus } from '@/hooks/useUpdateTicketStatus';

export const UpdateStatus = () => {
    const { id } = useParams<{ id?: string }>();
    const { ticketData, isTicketError, ticketError } = useFetchTicketById(id || '');

    const { mutate, isPending, isError, isSuccess, error } = useUpdateTicketStatus();

    const {
        categoriesLoading,
        categoriesData,
    } = useFetchCategories()

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setTicket((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [ticket, setTicket] = useState<any>({
        status: ticketData?.ticket?.status || 'Open',
    });

    const handleUpdateStatus = () => {
        console.log('Ticket:', ticket)
        if (id && ticket) {
            mutate({ id, status: ticket.status })
        }

    }

    useEffect(() => {
        if (ticketData?.ticket) {
            setTicket({
                ...ticketData.ticket,
                status: ticketData.ticket.status,
            });
        }
    }, [ticketData]);



    return (
        <>
            <div className="min-h-screen bg-gray-100 py-8 px-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Update status</h1>

                    <div>
                        <div>
                            <Label htmlFor="ticketName" className="text-xs font-medium">
                                Ticket Title
                            </Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                value={ticketData?.ticket?.title || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label htmlFor="description" className="text-xs font-medium">
                                Description
                            </Label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={ticketData?.ticket?.description || ''}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                readOnly
                            />
                        </div>
                        <div>
                            <Label htmlFor="priority" className="text-xs font-medium">
                                Priority
                            </Label>
                            <select
                                id="priority"
                                name="priority"
                                value={ticketData?.ticket?.priority}
                                disabled
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>

                        </div>
                        <div>
                            <Label htmlFor="category" className="text-xs font-medium">
                                Category
                            </Label>
                            <select
                                id="category"
                                name="category"
                                value={ticketData?.ticket?.category}
                                disabled
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {!categoriesLoading ? (
                                    categoriesData?.map((category: any, index: any) => (
                                        <option key={index} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        Loading categories...
                                    </option>
                                )}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="attachments" className="text-xs font-medium">
                                Attachments
                            </Label>
                            <img src={ticketData?.ticket?.attachment} alt="Attachment" width={500} height={500} />
                        </div>

                        <div>
                            <Label htmlFor="status" className="text-xs font-medium">
                                Status
                            </Label>
                            <select
                                id="status"
                                name="status"
                                value={ticket?.status}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                                <option value="Pending">Pending</option>
                            </select>

                        </div>

                        {isTicketError && ticketError && (
                            <p className='text-error-red text-center mt-4'>
                                {(ticketError as Error).message}
                            </p>
                        )}


                        {isSuccess && <h3>Ticket status updated successfully..!</h3>}

                        {isError && <h3 className='text-red font-bold'>{error}</h3>}

                        <div className='mt-5 text-center'>
                            <button
                                onClick={handleUpdateStatus}
                                className="bg-green-500 text-white px-4 py-2 mx-3 rounded-md hover:bg-green-600 transition duration-200"
                                disabled={isPending}
                            >
                                {isPending ? 'Updating Status...' : 'Update Status'}
                            </button>
                            <Link to="/tickets" className="bg-blue-500 text-white px-4 py-2  rounded-md hover:bg-blue-600 transition duration-200">
                                Back
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}