import { Link, useParams } from 'react-router-dom';
import { useFetchTicketById } from '@/hooks/useFetchTicketById';
import { useFetchCategories } from '@/hooks/useFetchCategories';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useUpdateTicket } from '@/hooks/useUpdateTicket';
import { Button } from '@/components/ui/button';
// import { AxiosError } from 'axios';
import { createTicketValidation } from '@/validation/createTicketValidation';
import { z } from 'zod';

export const EditTicket = () => {
    const { id } = useParams<{ id?: string }>();
    const { ticketData } = useFetchTicketById(id || '');
    const [successMsg, setSuccessMsg] = useState('')
    // const [errMsg, setErrMsg] = useState('')
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

    const [ticket, setTicket] = useState<any>({
        title: '',
        description: '',
        priority: 'Low',
        category: '',
    });

    const [existingAttachments, setExistingAttachments] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);

    useEffect(() => {
        if (ticketData?.ticket) {
            setTicket({
                title: ticketData.ticket.title,
                description: ticketData.ticket.description,
                priority: ticketData.ticket.priority,
                category: ticketData.ticket.category.name,
            });
            setExistingAttachments(ticketData.ticket.attachments.map((a: any) => a.url));
        }
    }, [ticketData]);

    const {
        categoriesLoading,
        categoriesData,
    } = useFetchCategories();



    const { mutate, updateTicketPending, updateTicketSuccess, isTicketUpdateError, updateTicketError, data } = useUpdateTicket();
    useEffect(() => {
        if (updateTicketSuccess) {
            setSuccessMsg(data?.message)
            setFormErrors({})
        }


    }, [updateTicketSuccess])
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
        const files = e.target.files;
        if (files && files.length > 0) {
            setNewFiles(Array.from(files));
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            createTicketValidation.parse(ticket);
            if (!id) return console.error('Missing ticket ID');

            const formData = new FormData();
            formData.append('title', ticket.title);
            formData.append('description', ticket.description);
            formData.append('priority', ticket.priority);
            formData.append('category', ticket.category);

            newFiles.forEach(file => formData.append('attachments', file));

            console.log('Submitting ticket:', {
                ...ticket,
                attachments: newFiles.map(file => file.name),
            });

            mutate({ id, formData });
        }
        catch (err: any) {
            if (err instanceof z.ZodError) {
                const errors: { [key: string]: string } = {}
                err.errors.forEach(error => {
                    errors[error.path[0]] = error.message
                });
                setFormErrors(errors);
            }
           else {
                console.error('Unknown error:', err);
            }
        }
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
                            {formErrors.title && (
                                <p className="text-error-red text-sm">{formErrors.title}</p>
                            )}
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
                            {formErrors.description && (
                                <p className="text-error-red text-sm">{formErrors.description}</p>
                            )}
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
                            {formErrors.priority && (
                                <p className="text-error-red text-sm">{formErrors.description}</p>
                            )}
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
                            {formErrors.category && (
                                <p className="text-error-red text-sm">{formErrors.category}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <Label>Existing Attachments</Label>
                            {existingAttachments.length > 0 ? (
                                <div className="flex gap-2 flex-wrap">
                                    {existingAttachments.map((url, i) => (
                                        <img
                                            key={i}
                                            src={url}
                                            alt={`attachment-${i}`}
                                            className="w-32 h-32 object-cover mb-2 rounded"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p>No attachments available.</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="attachments">Upload New Attachments</Label>
                            <input
                                type="file"
                                id="attachments"
                                name="attachments"
                                onChange={handleFileChange}
                                multiple
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {newFiles.length > 0 && (
                            <div className="mb-4">
                                <Label>New Files Preview</Label>
                                {newFiles.map((file, i) => (
                                    <img
                                        key={i}
                                        src={URL.createObjectURL(file)}
                                        alt={`new-attachment-${i}`}
                                        className="w-32 h-32 object-cover mb-2"
                                    />
                                ))}
                            </div>
                        )}

                        {updateTicketSuccess && <h3>{successMsg}</h3>}
                        {/* {errMsg && <h3>{errMsg}</h3>} */}

                        {isTicketUpdateError && updateTicketError && (
                            <p className='text-error-red text-center mt-4'>
                                {updateTicketError.message}
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
