import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFetchCategories } from '@/hooks/useFetchCategories'
import React, { useState } from 'react'
import { useCreateTicketMutation } from '../hooks/useCreateTicket'
import { Ticket } from '../types/ticketTypes'

const CreateTicket: React.FC = () => {
  const [ticketData, setTicketData] = useState<Ticket>({
    title: '',
    description: '',
    attachment: null,
    priority: 'Low',
    category: 'bug',
    status: 'Open',
  })

  const { categoriesLoading, categoriesData } = useFetchCategories()

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const { mutate, isPending, isError, isSuccess } = useCreateTicketMutation()

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setTicketData(prevData => ({
      ...prevData,
      [name]: value,
    }))
    setFormErrors({})
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setTicketData(prevData => ({
        ...prevData,
        attachment: files[0],
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})

    const formData = new FormData()
    formData.append('title', ticketData.title)
    formData.append('description', ticketData.description)
    formData.append('priority', ticketData.priority)
    formData.append('category', ticketData.category)
    formData.append('status', ticketData.status)

    if (ticketData.attachment) {
      console.log(ticketData.attachment)
      formData.append('attachment', ticketData.attachment)
    }

    try {
      mutate(formData)
      setTicketData({
        title: '',
        description: '',
        attachment: null,
        priority: 'Low',
        category: 'bug',
        status: 'Open',
      })
    } catch (err) {
      setFormErrors({ submit: 'An error occurred while creating the ticket.' })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="max-w-md w-full p-8 rounded-lg border m-auto mt-3 mb-3 bg-white dark:bg-black">
        <h2 className="text-2xl font-semibold mb-6 dark:text-cust-green">
          Create a New Ticket
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-4">
            <div>
              <Label htmlFor="ticketName" className="text-xs font-medium">
                Ticket Title
              </Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={ticketData.title}
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
                value={ticketData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {formErrors.description && (
                <p className="text-error-red text-sm">
                  {formErrors.description}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="priority" className="text-xs font-medium">
                Priority
              </Label>
              <select
                id="priority"
                name="priority"
                value={ticketData.priority}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {formErrors.priority && (
                <p className="text-error-red text-sm">{formErrors.priority}</p>
              )}
            </div>

            <div>
              <Label htmlFor="category" className="text-xs font-medium">
                Category
              </Label>
              <select
                id="category"
                name="category"
                value={ticketData.category}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {!categoriesLoading ? (
                  categoriesData?.map((category:any, index:number) => (
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

            <div>
              <Label htmlFor="attachments" className="text-xs font-medium">
                Attachments
              </Label>
              <input
                type="file"
                id="attachment"
                name="attachment"
                onChange={handleFileChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label htmlFor="status" className="text-xs font-medium">
                Status
              </Label>
              <select
                id="status"
                name="status"
                value={ticketData.status}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
                <option value="Pending">Pending</option>
              </select>
              {formErrors.status && (
                <p className="text-error-red text-sm">{formErrors.status}</p>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                type="submit"
                className="w-full py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
                disabled={isPending}
              >
                {isPending ? 'Creating Ticket...' : 'Create Ticket'}
              </Button>
            </div>
          </div>
        </form>

        {isError && formErrors.submit && (
          <p className="text-error-red text-center mt-4">{formErrors.submit}</p>
        )}
        {isSuccess && (
          <p className="text-green-500 text-center mt-4">
            Ticket created successfully!
          </p>
        )}
      </div>
    </div>
  )
}

export default CreateTicket
