import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetSupportTeam } from "@/hooks/useGetSupportTeam";
import { useAssignTicket } from '@/hooks/useAssignTicket';
import { Link, useParams } from 'react-router-dom';
import { useFetchTicketById } from '@/hooks/useFetchTicketById';
import { useFetchCategories } from '@/hooks/useFetchCategories';

export const AssignTicket = () => {
    const { id } = useParams<{ id?: string }>();

    const { usersLoading, usersData, isUsersError, usersError } = useGetSupportTeam();
    const { ticketData } = useFetchTicketById(id || '');
    const { mutate, isPending, isError, isSuccess, error, data } = useAssignTicket();

    const [success, setSuccess] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<any>({
        id: 0,
        firstname: '',
        lastname: '',
        email: '',
    });

    const { categoriesLoading, categoriesData } = useFetchCategories();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUserId = e.target.value;
        const user = usersData?.users?.find((user: any) => user.id.toString() === selectedUserId);
        if (user) {
            setSelectedUser({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            });
        }
    };

    const handleAssignTicket = () => {
        if (id && selectedUser.id) {
            mutate({ id, assignedTo: selectedUser.id });
        }
    };

    useEffect(() => {
        if (isSuccess && data?.message) {
            setSuccess(data.message);
        }
    }, [isSuccess, data]);

    // if (isTicketLoading) {
    //     return <div>Loading ticket data...</div>;
    // }

    // if (isTicketError || !ticketData?.ticket) {
    //     return <div>Error loading ticket data: {usersError?.message || 'An unexpected error occurred'}</div>;
    // }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Assign Ticket</h1>

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
                        <Label htmlFor="status" className="text-xs font-medium">
                            Status
                        </Label>
                        <select
                            id="status"
                            name="status"
                            value={ticketData?.ticket?.status}
                            disabled
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="users" className="text-xs font-medium">Select Support Team Member</Label>
                        <select
                            id="users"
                            name="users"
                            value={selectedUser.id}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {usersLoading ? (
                                <option value="" disabled>Loading users...</option>
                            ) : (usersData?.users && usersData?.users.length > 0) ? (
                                usersData.users.map((user: any) => (
                                    <option key={user.id} value={user.id}>
                                        {user.firstname} {user.lastname}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No users found</option>
                            )}
                        </select>

                        {isUsersError && usersError && (
                            <p className="text-red-600 text-sm mt-2">Error loading users: {usersError.message}</p>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleAssignTicket}
                    className="bg-green-500 text-white px-4 py-2 mx-3 rounded-md hover:bg-green-600 transition duration-200"
                    disabled={isPending || !selectedUser.id}
                >
                    {isPending ? 'Assigning...' : 'Assign Ticket'}
                </button>
                <Link to="/tickets/1" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    Back
                </Link>

                {isSuccess && success && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-md">
                        <p>{success}</p>
                    </div>
                )}

                {isError && error && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded-md">
                        <p>Error assigning ticket: {error.message || 'An unexpected error occurred'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
