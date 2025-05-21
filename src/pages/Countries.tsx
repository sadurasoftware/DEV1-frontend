import { useState } from "react"
import { useGetCountries } from "@/hooks/useGetCountries"
import { useCreateCountry } from "@/hooks/useCreateCountry"
import { useUpdateCountry } from "@/hooks/useUpdateCountry"
import { useDeleteCountry } from "@/hooks/useDeleteCountry"
import axios from "axios"

export const Countries = () => {

    const [country, setCountry] = useState({
        id: 0,
        name: '',
    })
    const [success, setSuccess] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const { data, isLoading, isError, error } = useGetCountries()
    const {isPending, createCountryMutation} = useCreateCountry()
    const {updateCountryPending, mutateUpdateCountry} = useUpdateCountry()
    const {deletePending, deleteCountryMutate} = useDeleteCountry()
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setCountry({
            ...country,
            [name]: value
        })
    }

  const handleCountrySelect = (id: number, name:string) => {
    setCountry({
        id: id,
        name: name,
    })
    const selectedCountry = data?.find((country: { id: number }) => country.id === id)
    if (selectedCountry) {
      setCountry({
        id:id,
        name:selectedCountry.name})
      setIsEditing(true)
    }
  }

  const countrySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (country.name.trim()) {
      if (country.id) {
        console.log("Form submit:", country)
        mutateUpdateCountry(
          { id: country.id, name: country.name },
          {
            onSuccess: (response) => {
                setErrorMsg('')
              setSuccess(response?.message)
              setIsEditing(false)
              setCountry({
                id: 0,
                name: '',
              })
            },
            onError: (error:any) => {
              setErrorMsg(error?.response?.data?.message || error.response?.data?.errors)
              setSuccess('')
              setIsEditing(false)
              setCountry({
                id: 0,
                name: '',
              })
            },
          }
        )
      } else {
        createCountryMutation(
          { name: country.name },
          {
            onSuccess: (res:any) => {
              setSuccess(res.message)
              setCountry({
                id: 0,
                name: '',
              })
              setIsEditing(false)
            },
            onError: (error:any) => {
              if(axios.isAxiosError(error))
              {
                setErrorMsg(error?.response?.data?.message || error.response?.data?.errors)
              }
              else
              {

              }
            },
          }
        )
      }
    } else {
      console.log('Category name cannot be empty.')
    }
  }

  const handleDeleteCountry = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?')
    if(!confirmDelete)
    {
      return
    }
    deleteCountryMutate(id, {
      onSuccess: (response:any) => {
       setSuccess(response?.message)
       setIsEditing(false)
      },
    })
  }


    return (
        <>
            <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Manage Country
                </h2>

                <form onSubmit={countrySubmit}>
                    <div>
                        <label htmlFor="moduleName" className="block">
                            Country Name
                        </label>
                        <input
                            type="text"
                            id="countryName"
                            name="name"
                            value={country.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="text-center mt-4">
                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
                            // disabled={isPending || updateCountryPending}
                        >
                            {isPending || updateCountryPending
                                ? isEditing
                                    ? 'Updating Countries...'
                                    : 'Creating country...'
                                : isEditing
                                    ? 'Update Country'
                                    : 'Create Counttry'}
                        </button>
                    </div>
                </form>
                <div className="mt-6">
                        <h3 className="text-xl font-semibold text-center mb-4">
                          Existing Countries
                        </h3>
                
                        {isLoading ? (
                          <div className="text-center">Loading Countries...</div>
                        ) : isError && error ? (
                          <div className="text-red-600 text-center">
                            {error.message}
                          </div>
                        ) : (
                          <div className="text-center">
                            <table className="w-full">
                              <tbody>
                                {data?.map((country: any) => (
                                  <tr key={country.id}>
                                    <td>{country.name}</td>
                                    <td>
                                      <button
                                        className="bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-600 p-2"
                                        onClick={() => handleCountrySelect(country.id, country.name)}
                                      >
                                        Edit
                                      </button>
                                    </td>
                                    <td>
                                      <button
                                        className="bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 p-2"
                                        onClick={() => handleDeleteCountry(country.id)}
                                        disabled={deletePending}
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                        {success && <div className="text-green-600">{success}</div>}
                        {errorMsg && <div className="text-red-600">{errorMsg}</div>}
            </div>
        </>
    )
}