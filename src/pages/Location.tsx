import { useGetLocations } from "@/hooks/LocationHooks/useGetLocations"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useCreateLocation } from "@/hooks/LocationHooks/useCreateLocation"
import { useGetStates } from "@/hooks/stateHooks/useGetStates"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useUpdateLocation } from "@/hooks/LocationHooks/useUpdateLocation"
import { useDeleteLocation } from "@/hooks/LocationHooks/useDeleteLocation"
import { locationValidation } from "@/validation/countryValidation"
import { z } from "zod"

export const Location = () => {

    // Queryclient for invalidate
    const queryClient = useQueryClient()

    // States for data handling
    const [locationData, setLocationData] = useState(
        {
            locationId: 0,
            locationName: '',
            stateId: 0,
            // countryId: 0
        }
    )
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)


    // Hooks
    const { locationsLoading, locationsData, isLocationsError, locationsError } = useGetLocations()
    const { statesLoading, statesData, isStatesError, statesError } = useGetStates()
    const { createLocationPending, createLocationMutation } = useCreateLocation()
    // const { locationDatum, locationLoading, IsLocationError, locationError } = useGetLocationById()
    const { updateLocationPending, mutateUpdateLocation } = useUpdateLocation()
    const { deleteLocationMutate } = useDeleteLocation()


    // Hadle error on fetch hook
    if (isLocationsError && isStatesError) {
        setErrorMsg(locationsError?.message || statesError?.message || 'Something went wrongs')
    }

    // Add modal 
    const AddModal = () => {
        setSuccessMsg('')
        setErrorMsg('')
        setLocationData({
            locationId: 0,
            locationName: '',
            stateId: 0

        })
        setIsEditing(false)
        setIsModalOpen(true)
    }

    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false)
        setLocationData({
            locationId: 0,
            locationName: '',
            stateId: 0
        })
    }

    // Hanle the inputs 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setLocationData((prev) => ({
            ...prev,
            [name]: name === 'countryId' || name === 'stateId' || name === 'locationId' ? Number(value) : value,
        }));

        setSuccessMsg('');
        setErrorMsg('');
    };

    const handleLocationSelect = (location: any) => {
        setSuccessMsg('')
        setErrorMsg('')
        setIsEditing(true)
        setIsModalOpen(true)
        setLocationData({
            locationId: location.id,
            locationName: location.name,
            stateId: location.stateId
        })
    }

    // create and update function
    const handleCreateLocation = () => {
        try {
            locationValidation.parse(locationData)
            if (locationData.locationName.trim() && locationData.locationId && locationData.stateId) {
                mutateUpdateLocation({
                    id: locationData.locationId,
                    name: locationData.locationName,
                    stateId: locationData.stateId

                },
                    {
                        onSuccess: (res: any) => {
                            setErrorMsg('')
                            setSuccessMsg(res?.message)
                            setIsEditing(false)
                            setLocationData({
                                locationId: 0,
                                locationName: '',
                                stateId: 0
                            })
                            setIsModalOpen(false)
                            queryClient.invalidateQueries({ queryKey: ['locations'] })
                        },
                        onError: (error: any) => {
                            if (axios.isAxiosError(error)) {
                                setErrorMsg(error?.response?.data.message || error.response?.data.errors || 'Something went wrong.')
                            }
                        }

                    })
            } else {
                createLocationMutation({ name: locationData.locationName, stateId: locationData.stateId },
                    {
                        onSuccess: (res: any) => {
                            setErrorMsg('')
                            setSuccessMsg(res?.message)
                            setIsModalOpen(false)
                            setLocationData({
                                locationId: 0,
                                locationName: '',
                                stateId: 0
                            })

                            queryClient.invalidateQueries({ queryKey: ['locations'] })



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
            else
            {
                setErrorMsg('Something went wrong.')
            
            }
        }

    }

    // Delete funtion

    const handleDeleteLocation = (id: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Location?')
        if (!confirmDelete) return

        deleteLocationMutate(id, {
            onSuccess: (res: any) => {
                queryClient.invalidateQueries({ queryKey: ['locations'] })
                setSuccessMsg(res.message)
                setErrorMsg('')
            },
            onError: (error: any) => {
                if (axios.isAxiosError(error)) {
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
                        Locations List
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
                                    Location Name
                                </th>
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
                            {!locationsLoading && locationsData?.locations?.map((loc: any) => (
                                <tr key={loc.id}>
                                    <td className="px-3 py-2 text-gray-800">{loc.name}</td>
                                    <td className="px-3 py-2 text-gray-800">{loc.state.name}</td>
                                    <td className="px-3 py-2 text-gray-800">{loc.state.name}</td>
                                    <td className="px-3 py-2">
                                        <button
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-2 rounded-md font-semibold"
                                            onClick={() => handleLocationSelect(loc)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="px-3 py-2">
                                        <button
                                            onClick={() => handleDeleteLocation(loc.id)}
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
                                    <label htmlFor="locationName" className="block">
                                        Location Name
                                    </label>
                                    <input
                                        type="text"
                                        id="locationName"
                                        name="locationName"
                                        value={locationData.locationName}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="moduleName" className="block">
                                        State
                                    </label>
                                    <select name="stateId"
                                        onChange={handleChange}
                                        id="stateId"
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        value={locationData.stateId}
                                    >
                                        <option value="">Choose State</option>
                                        {!statesLoading && statesData && statesData.states.map((state: any) => (
                                            <option key={state.id} value={state.id}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* <div>
                <label htmlFor="moduleName" className="block">
                  Country
                </label>
                <select name="countries"
                //   onChange={handleChange}
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
              </div> */}

                                {successMsg && (
                                    <p className="mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-md text-center my-4">{successMsg}</p>)
                                }

                                {errorMsg && (
                                    <p className="mt-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded-md text-center my-4">{errorMsg}</p>
                                )}

                            </div>
                            <div>
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold mt-4 text-right"
                                    onClick={handleCreateLocation}
                                >
                                    {createLocationPending || updateLocationPending
                                        ? isEditing ?
                                            'Updating State...' : 'Creating State'
                                        : isEditing ? 'Update State' : 'Add State'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                }
            </div>
        </>
    )
}