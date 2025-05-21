import { useState } from "react"
import { useGetCountries } from "@/hooks/useGetCountries"
import { useCreateCountry } from "@/hooks/useCreateCountry"
import axios from "axios"
import { useQueryClient } from "@tanstack/react-query"
import { useUpdateCountry } from "@/hooks/useUpdateCountry"
import { countryValidation } from "@/validation/countryValidation"
import { z } from "zod"
import { useDeleteCountry } from "@/hooks/useDeleteCountry"
import { Link } from "react-router-dom"

export const Countries = () => {
  const [countryName, setCountryName] = useState('')
  const [countryId, setCountryId] = useState<number>(0)
  const [successMsg, setSuccessMsg] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)


  const { isLoading, data, isError, error } = useGetCountries()
  const { isPending, createCountryMutation } = useCreateCountry()
  const { updateCountryPending, mutateUpdateCountry } = useUpdateCountry()
  const { deleteCountryMutate } = useDeleteCountry()

  const queryClient = useQueryClient()

  if (isError) {
    setErrorMsg(error?.message || 'Something went wrong.')
  }

  const closeModal = () => {
    
    setIsModalOpen(false)
    setCountryName('')
    setCountryId(0)
    setIsEditing(false)
    setSuccessMsg('')
    setErrorMsg('')
  }

  const AddModal = () => {
    setSuccessMsg('')
    setErrorMsg('')
    setIsModalOpen(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryName(e.target.value)
    setSuccessMsg('');
    setErrorMsg('');
  }

  const handleCreateCountry = () => {
    try {

      countryValidation.parse({ countryName })

      if (countryName.trim() && countryId) {
        mutateUpdateCountry({
          id: countryId,
          name: countryName
        },
          {
            onSuccess: (res: any) => {
              setErrorMsg('')
              setSuccessMsg(res?.message)
              setIsEditing(false)
              setCountryName('')
              setCountryId(0)
              setIsModalOpen(false)
              queryClient.invalidateQueries({ queryKey: ['countries'] })
              queryClient.invalidateQueries({
                queryKey: ['countries']
              })
            },
            onError: (error: any) => {
              if (axios.isAxiosError(error)) {
                setErrorMsg(error?.response?.data.message || error.response?.data.errors || 'Something went wrong.')
              }
            }

          })
      }

      else {
        createCountryMutation({ name: countryName },
          {
            onSuccess: (res: any) => {
              setErrorMsg('')
              setSuccessMsg(res?.message)
              setIsModalOpen(false)
              setCountryId(0)
              queryClient.invalidateQueries({ queryKey: ['countries'] })
              setCountryName('')


            },
            onError: (error: any) => {
              if (axios.isAxiosError(error)) {
                setSuccessMsg('')
                setErrorMsg(error.response?.data.message || error.response?.data.errors || 'Something went wrong.')
              }
            }
          }

        )
      }

    }
    catch (error: any) {
      if (error instanceof z.ZodError) {
        setErrorMsg(error.errors[0]?.message || 'Invalid input')
      }
    }
  }


  const handleCountrySelect = (id: number) => {
    setIsModalOpen(true)
    setSuccessMsg('')
    setErrorMsg('')
    setIsEditing(true)
    setCountryId(id)
    const selectedCountry = data?.find((mod: { id: number }) => mod.id === id)
    if (selectedCountry) {
      setCountryName(selectedCountry.name)
      setIsEditing(true)
    }
  }

  const handleDeleteCountry = (id:number)=>{
    const confirmDelete = window.confirm('Are you sure you want to delete this country?')
    if(!confirmDelete) return
    
    deleteCountryMutate(id,{
      onSuccess:(res:any)=>{
        queryClient.invalidateQueries({queryKey: ['countries']})
        setSuccessMsg(res.message)
        setErrorMsg('')
      },
      onError:(error:any)=>{
        if(axios.isAxiosError(error))
        {
          setErrorMsg(error.response?.data.message || error.response?.data.errors || 'Something went wrong.')
          setSuccessMsg('')
        }
      }
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
      <div>
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          Countries List
        </h1>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded-md font-semibold my-4 text-right"
          onClick={AddModal}
        >
          + Add
        </button>
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-3 py-2 text-sm font-semibold text-gray-700">
                Country Name
              </th>
              <th className="text-left px-3 py-2 text-sm font-semibold text-gray-700">
                Edit
              </th>
              <th className="text-left px-3 py-2 text-sm font-semibold text-gray-700">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!isLoading && data?.map((country: { name: string, id: number }) => (
              <tr key={country.id}>
                <td className="px-3 py-2 text-gray-800">{country.name}</td>
                <td className="px-3 py-2">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-2 rounded-md font-semibold"
                    onClick={() => handleCountrySelect(country.id)}
                  >
                    Edit
                  </button>
                </td>
                <td className="px-3 py-2">
                  <button 
                  onClick={() => handleDeleteCountry(country.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-md font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

            <div className="text-center mt-4">
        <Link to="/settings" className="text-blue-500 hover:text-blue-700">
          Back to Settings
        </Link>
      </div>
      {errorMsg && (
        <p className="mt-4 text-center text-red-600 font-medium">{errorMsg}</p>
      )}

      {successMsg && (
        <p className="mt-4 text-center text-green-600 font-medium">{successMsg}</p>
      )}

      {isModalOpen &&

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-semibold">Add Country</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-500 text-lg font-bold"
              >
                ×
              </button>
            </div>
            <div>
              <div>
                <label htmlFor="moduleName" className="block">
                  Country Name
                </label>
                <input
                  type="text"
                  id="countryName"
                  name="name"
                  value={countryName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                {successMsg && (
                  <p className="mt-4 text-center text-green-600 font-medium">{successMsg}</p>)
                }

                {errorMsg && (
                  <p className="mt-4 text-center text-red-600 font-medium">{errorMsg}</p>
                )}
              </div>

            </div>
            <div>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold mt-4 text-right"
                onClick={handleCreateCountry}
              >
                {isPending || updateCountryPending
                  ? isEditing ?
                    'Updating Country...' : 'Creating Country'
                  : isEditing ? 'Edit country' : 'Add Country'
                }
              </button>
            </div>
          </div>
        </div>

      }




    </div>


  )
}
