import { Link, useParams } from 'react-router-dom';
import { useFetchTicketById } from '@/hooks/useFetchTicketById';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';

export const ViewTicket = () => {
    const { id } = useParams<{ id?: string }>();
    
    const { ticketData } = useFetchTicketById(id || '');
    
    const [imageURL, setImageURL] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleImageClick = () => {
        if (ticketData?.ticket?.attachment) {
            setImageURL(ticketData.ticket.attachment);  
            setIsModalOpen(true);  
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);  
        setImageURL('');  
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-8 px-6">
                <div className="max-w mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Ticket Details</h1>
                    <div className=''>
                        <table className="min-w-full table-auto border-t">
                            <tbody className='border-t'>
                                <tr className="border-t px-4 py-2 text-left  text-gray-600 bg-gray-100">
                                    <th className="px-4 py-2">Title</th>
                                    <td className="px-4 py-2">{ticketData?.ticket?.title}</td>
                                    <th className="px-4 py-2">Creation Date</th>
                                    <td className="px-4 py-2">{ticketData?.ticket?.createdAt}</td>
                                </tr>
                                <tr className="border-t px-4 py-2 text-left">
                                    <th className="px-4 py-2">Email</th>
                                    <td className="px-4 py-2">{ticketData?.ticket?.user.email}</td>
                                    <th className="px-4 py-2">Ticket Category</th>
                                    <td className="px-4 py-2">{ticketData?.ticket?.category.name}</td>
                                </tr>
                                <tr className="border-t px-4 py-2 text-left text-gray-600 bg-gray-100">
                                    <th className="px-4 py-2">Priority</th>
                                    <td className="px-4 py-2">{ticketData?.ticket?.priority}</td>
                                    <th className="px-4 py-2">Ticket status</th>
                                    <td className="px-4 py-2">{ticketData?.ticket?.status}</td>
                                </tr>
                                <tr className="border-t px-4 py-2 text-left">
                                    <th className="px-4 py-2 ">Description</th>
                                    <td className="px-4 py-2" colSpan={3}>{ticketData?.ticket?.description}</td>
                                </tr>
                                <tr className="border-t px-4 py-2 text-left text-gray-600 bg-gray-100">
                                    <th className="px-4 py-2 ">Attachment</th>
                                    <td className="px-4 py-2" colSpan={3}>
                                        <button onClick={handleImageClick} className="text-blue-500 hover:underline">
                                            Click here to view attachment
                                        </button>
                                        {isModalOpen && (
                                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                                <div className="bg-white p-4 rounded-lg max-w-lg relative">
                                                    <button 
                                                        onClick={closeModal} 
                                                        className="absolute top-2 right-2 text-black font-bold text-lg"
                                                    >
                                                        X
                                                    </button>
                                                    <img 
                                                        src={imageURL} 
                                                        alt="Ticket Attachment" 
                                                        className="max-w-full max-h-screen object-contain" 
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-4'>
                        <table className="min-w-full table-auto border-t">
                            <tbody className='border-t'>
                                <tr className="border-t px-4 py-2 text-left text-gray-600 bg-gray-100">
                                    <th className="px-4 py-2">Ticket Comments</th>
                                    <td className="px-4 py-2"><div>
                                        <Label htmlFor="description" className="text-xs font-medium">
                                        Comments
                                        </Label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            readOnly
                                            rows={4}
                                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div></td>
                                </tr>
                                <tr className="border-t px-4 py-2 text-left">
                                    <th className="px-4 py-2">Attachment</th>
                                    <td className="px-4 py-2">
                                        <div>
                                            <Label htmlFor="attachments" className="text-xs font-medium">
                                                Attachments
                                            </Label>
                                            <input
                                                type="file"
                                                id="attachment"
                                                name="attachment"
                                                // onChange={handleFileChange}
                                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </td>

                                </tr>
                                <tr className="border-t px-4 py-2 text-left text-gray-600 bg-gray-100">
                                    <th className="px-4 py-2">Status</th>
                                    <td className="px-4 py-2"> <div>
                                        <Label htmlFor="status" className="text-xs font-medium">
                                            Status
                                        </Label>
                                        <select
                                            id="status"
                                            name="status"
                                            value={ticketData?.ticket?.status}
                                            // onChange={handleChange}
                                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="Open">Open</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Resolved">Resolved</option>
                                            <option value="Closed">Closed</option>
                                            <option value="Pending">Pending</option>
                                        </select>

                                    </div></td>

                                </tr>

                            </tbody>
                        </table>
                    </div>

                    <div className='mt-5 text-center'>
                        <Link to="/tickets" className="bg-blue-500 text-white px-4 py-2  rounded-md hover:bg-blue-600 transition duration-200">
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
