import { Link, useParams } from 'react-router-dom';
import { useFetchTicketById } from '@/hooks/useFetchTicketById';
import { useFetchCategories } from '@/hooks/useFetchCategories';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useUpdateTicket } from '@/hooks/useUpdateTicket';
import { Button } from '@/components/ui/button';

export const EditTicket = () => {
    const { id } = useParams<{ id?: string }>();
    const { ticketData } = useFetchTicketById(id || '');

    const [ticket, setTicket] = useState<any>({
        title: '',
        description: '',
        priority: 'Low',
        category: '',
        attachments:[],
    });

    useEffect(() => {
        if (ticketData?.ticket) {
            setTicket({
                title: ticketData.ticket.title,
                description: ticketData.ticket.description,
                priority: ticketData.ticket.priority,
                category: ticketData.ticket.category.name,
                attachments:ticketData.ticket.attachments
            });
        }
    }, [ticketData]);

    const {
        categoriesLoading,
        categoriesData,
    } = useFetchCategories();

    const { mutate, updateTicketPending, updateTicketSuccess, isTicketUpdateError, updateTicketError } = useUpdateTicket();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setTicket((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };
    

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
          setTicket((prevData: any) => ({
            ...prevData,
            attachments: Array.from(files),
          }))
        }
      } 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) {
            console.error("Ticket ID is missing.");
            return;
        }
        console.log('Submitting ticket data:', ticket);
        mutate({ id, ticket });
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-8 px-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Edit Ticket</h1>

                    <div>
                        <div>
                            <Label htmlFor="ticketName" className="text-xs font-medium">
                                Ticket Title
                            </Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                value={ticket.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="description" className="text-xs font-medium">
                                Description
                            </Label>
                            <textarea
                                id="description"
                                name="description"
                                value={ticket.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <Label htmlFor="priority" className="text-xs font-medium">
                                Priority
                            </Label>
                            <select
                                id="priority"
                                name="priority"
                                value={ticket.priority}
                                onChange={handleChange}
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
                                value={ticket.category.name}
                                onChange={handleChange}
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
                            {ticketData?.ticket?.attachments && ticketData.ticket.attachments.length > 0 ? (
                                ticketData.ticket.attachments.map((attachment: any) => (
                                    <div key={attachment.id}>
                                        <img
                                            src={attachment.url}
                                            alt={`Attachment ${attachment.id}`}
                                            width={500}
                                            height={500}
                                            className="mb-4"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>No attachments available.</p>
                            )}

                        </div>
                        <div>
                                      <Label htmlFor="attachments" className="text-xs font-medium">
                                        Select files:
                                      </Label>
                                      <input
                                        type="file"
                                        id="attachments"
                                        name="attachments"
                                        onChange={handleFileChange}
                                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        multiple
                                      />
                                    </div>
                        {updateTicketSuccess && <h3>Ticket updated Successfully.</h3>}

                        {isTicketUpdateError && updateTicketError && (
                            <p className='text-error-red text-center mt-4'>
                                {(updateTicketError as Error).message}
                            </p>
                        )}

                        <div className="flex gap-4 mt-6">
                            <Button
                                onClick={handleSubmit}
                                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out shadow-lg"
                                disabled={updateTicketPending}
                            >
                                {updateTicketPending ? 'Updating Ticket...' : 'Update Ticket'}
                            </Button>

                            <Link to={`/my-tickets/${ticketData?.ticket?.user?.id}`} className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out shadow-lg">
                                Back
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};
