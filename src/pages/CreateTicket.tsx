import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFetchCategories } from '@/hooks/useFetchCategories'
import React, { useState } from 'react'
import { useCreateTicketMutation } from '../hooks/useCreateTicket'
import { Ticket } from '../types/ticketTypes'
import { Link } from 'react-router-dom'
import { AxiosError } from 'axios'
import { createTicketValidation } from '@/validation/createTicketValidation'
import { z } from 'zod'

const CreateTicket: React.FC = () => {
  const [ticketData, setTicketData] = useState<Ticket>({
    title: '',
    description: '',
    attachments: [], 
    priority: '',
    category: ''
  })
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const { categoriesLoading, categoriesData, isCategoriesError, categoriesError } = useFetchCategories()

  
  const { mutate, isPending, isError, error, isSuccess } = useCreateTicketMutation()

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
    if (files && files.length > 0) {
      setTicketData(prevData => ({
        ...prevData,
        attachments: Array.from(files),
      }))
    }
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setFormErrors({})
    
   

    try {
      createTicketValidation.parse(ticketData)
    const formData = new FormData()
    formData.append('title', ticketData.title)
    formData.append('description', ticketData.description)
    formData.append('priority', ticketData.priority)
    formData.append('category', ticketData.category)

    if (ticketData.attachments && ticketData.attachments.length > 0) {
      ticketData.attachments.forEach(file => {
        formData.append('attachments', file)
      })
    }
      mutate(formData)
      setTicketData({
        title: '',
        description: '',
        attachments: [],
        priority: '',
        category: '',
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
              const errors: { [key: string]: string } = {}
              err.errors.forEach(error => {
                errors[error.path[0]] = error.message
              })
              setFormErrors(errors)
            }
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
                <option value="">Select priority</option>
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
                <option value="">Select category</option>
                {!categoriesLoading ? (
                  categoriesData?.map((category: any, index: number) => (
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



            <div className="flex gap-2 mt-4">
              <Button
                type="submit"
                className="w-full py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
               
              >
                {isPending ? 'Creating Ticket...' : 'Create Ticket'}
              </Button>

            </div>
            <div className="flex gap-2 mt-4">
              <Link
                className="w-full py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-gray transition dark:bg-gary dark:hover:bg-cust-green uppercase text-center"
                to='/dashboard'>Back
              </Link>
            </div>

          </div>
        </form>

        {formErrors.submit && (
          <p className="text-error-red text-center mt-4">{formErrors.submit}</p>
        )}

        {isError && error && (
          <h3 className='text-error-red font-bold'>
            {(error instanceof AxiosError ? error.response?.data.message : 'An unexpected error occurred') || 'An unexpected error occurred'}
          </h3>
        )}


        {isCategoriesError && categoriesError && (
          <p className='text-error-red text-center mt-4'>
            {(categoriesError instanceof AxiosError? categoriesError.response?.data.message : 'Categorry not set')}
          </p>
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
