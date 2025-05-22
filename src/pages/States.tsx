import { useGetStates } from "@/hooks/stateHooks/useGetStates"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useCreateState } from "@/hooks/stateHooks/useCreateState"
import { useGetCountries } from "@/hooks/countryHooks/useGetCountries"
import axios from "axios"
import { z } from "zod"
import { useQueryClient } from "@tanstack/react-query"
import { useUpdateState } from "@/hooks/stateHooks/useUpdateState"
import { useGetStateById } from "@/hooks/stateHooks/useGetStateById"
import { useDeleteState } from "@/hooks/stateHooks/useDeleteState"
import { stateValidation } from "@/validation/countryValidation"

export const States = () => {
  // const {id} = useParams()
  const queryClient = useQueryClient()

  const [stateName, setStateName] = useState('')
  const [countryId, setCountryId] = useState(0)
  const [stateId, setStateId] = useState(0)
  const [successMsg, setSuccessMsg] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { statesLoading, statesData, isStatesError, statesError } = useGetStates()
  const {data, isLoading, isError, error} = useGetCountries()
  const {createStatePending, createStateMutation} = useCreateState()
  const { stateData } = useGetStateById(stateId)
  const { deleteStateMutate} = useDeleteState()

  const { updateStatePending, mutateUpdateState} = useUpdateState()

useEffect(() => {
  if (stateData) {
    setIsModalOpen(true)
    setStateId(stateData.id)
    setStateName(stateData.name)
    setCountryId(stateData.countryId)
  }
}, [stateData])



  if (isStatesError && isError) {
    setErrorMsg(statesError?.message || error?.message || 'Something went wrong.')
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const AddModal = () => {
    setSuccessMsg('')
    setErrorMsg('')
    setCountryId(0)
    setStateName('')
    setStateId(0)
    setIsEditing(false)
    setIsModalOpen(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target

  if (name === 'stateName') {
    setStateName(value)
  }

  if (name === 'countries') {
    setCountryId(Number(value))
  }

  setSuccessMsg('')
  setErrorMsg('')
}

const handleStateSelect = (state: any) => {
  setSuccessMsg('')
  setErrorMsg('')
  setIsEditing(true)
  setIsModalOpen(true)
  setStateId(state.id)
  setStateName(state.name)
  setCountryId(state.country.id)
}



  const handleCreateState = () => {
     try {

      stateValidation.parse({ stateName, countryId })

      if (stateName.trim() && countryId && stateId) {
        mutateUpdateState({
          id: stateId,
          name: stateName,
          countryId:countryId

        },
          {
            onSuccess: (res: any) => {
              setErrorMsg('')
              setSuccessMsg(res?.message)
              setIsEditing(false)
              setStateName('')
              setStateId(0)
              setCountryId(0)
              setIsModalOpen(false)
              queryClient.invalidateQueries({ queryKey: ['states'] })
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
        createStateMutation({ name: stateName, countryId: countryId },
          {
            onSuccess: (res: any) => {
              setErrorMsg('')
              setSuccessMsg(res?.message)
              setIsModalOpen(false)
              setCountryId(0)
              queryClient.invalidateQueries({ queryKey: ['states'] })
              setStateName('')


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


  const handleDeleteState = (id:number)=>{
    const confirmDelete = window.confirm('Are you sure you want to delete this country?')
    if(!confirmDelete) return
    
    deleteStateMutate(id,{
      onSuccess:(res:any)=>{
        queryClient.invalidateQueries({queryKey: ['states']})
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
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
        <div>
          <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
            States List
          </h1>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded-md font-semibold text-right"
            onClick={AddModal}
          >
            + Add
          </button>
        </div>
        <div className="mt-4 ">
                {successMsg && (
                  <p className="mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-md text-center my-4">{successMsg}</p>)
                }

                {errorMsg && (
                  <p className="mt-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded-md text-center my-4">{errorMsg}</p>
                )}
              </div>
        <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-3 py-2 text-sm font-semibold text-gray-700">
                State Name
              </th>
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
            {!statesLoading && statesData?.states?.map((state: any) => (
              <tr key={state.id}>
                <td className="px-3 py-2 text-gray-800">{state.name}</td>
                <td className="px-3 py-2 text-gray-800">{state.country.name}</td>
                <td className="px-3 py-2">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-2 rounded-md font-semibold"
                    onClick={() => handleStateSelect(state)}
                  >
                    Edit
                  </button>
                </td>
                <td className="px-3 py-2">
                  <button 
                  onClick={() => handleDeleteState(state.id)}
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
     
      </div>

      {isModalOpen &&

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-10">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-semibold">{isEditing ? 'Edit State' : 'Create State'}</h2>
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
                  State Name
                </label>
                <input
                  type="text"
                  id="stateName"
                  name="stateName"
                  value={stateName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="moduleName" className="block">
                  Country
                </label>
                <select name="countries" 
                  onChange={handleChange} 
                  id="countries" 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={countryId}
                >
                  <option value="">Choose Country</option>
                  {!isLoading && data && data.map((country: any) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              

            </div>
            <div>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold mt-4 text-right"
                onClick={handleCreateState}
              >
                {createStatePending || updateStatePending
                  ? isEditing ?
                    'Updating State...' : 'Creating State'
                  : isEditing ? 'Update State' : 'Add State'
                }
                {/* create */}
              </button>
            </div>
          </div>
        </div>

      }

    </>
  )
}