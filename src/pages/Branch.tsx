import { useGetBranches } from "@/hooks/branchHooks/useGetBranches"
import { useState } from "react"
import { useCreateBranch } from "@/hooks/branchHooks/useCreateBranch"
import { useGetCountries } from "@/hooks/countryHooks/useGetCountries"
import { useGetStates } from "@/hooks/stateHooks/useGetStates"
import { useGetLocations } from "@/hooks/LocationHooks/useGetLocations"
import { branchValidation } from "@/validation/countryValidation"
import axios from "axios"
import { useQueryClient } from "@tanstack/react-query"
import { z } from "zod"
import { useUpdateBranch } from "@/hooks/branchHooks/useUpdateBranch"
import { useDeleteBranch } from "@/hooks/branchHooks/useDeleteBranch"
import { Link } from "react-router-dom"

export const Branch = () => {

    const [branchData, setBranchData] = useState({
        branchId: 0,
        branchName: '',
        pincode: 0,
        countryId: 0,
        stateId: 0,
        locationId: 0
    })
    const queryClient = useQueryClient()
    const [success, setSuccess] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const { branchesLoading, branchesData, isBranchesError, branchesError } = useGetBranches()
    const { isLoading, data, isError, error } = useGetCountries()
    const { statesLoading, statesData, isStatesError, statesError } = useGetStates()
    const { locationsLoading, locationsData, isLocationsError, locationsError } = useGetLocations()
    const { createBranchPending, createBranchMutation } = useCreateBranch()
    const { updateBranchPending, mutateUpdateBranch } = useUpdateBranch()
    const { deleteBranchMutate } = useDeleteBranch()

    // Add modal 
    const AddModal = () => {
        setSuccess('')
        setErrMsg('')
        setBranchData({
            branchId: 0,
            branchName: '',
            pincode: 0,
            locationId: 0,
            stateId: 0,
            countryId: 0
        })
        setIsEditing(false)
        setIsModalOpen(true)
    }

    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false)
        setBranchData({
            branchId: 0,
            branchName: '',
            pincode: 0,
            locationId: 0,
            stateId: 0,
            countryId: 0
        })
    }

    // Hanle the inputs 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setBranchData((prev) => ({
            ...prev,
            [name]: name === 'countryId' || name === 'stateId' || name === 'locationId' || name === 'branchId' || name === 'pincode' ? Number(value) : value,
        }));

        // if (name === 'locationId') {
        //     setSuccess('');
        //     setErrMsg('');
        // }
        setSuccess('')
        setErrMsg('')
    }

    if (isBranchesError || isError || isStatesError || isLocationsError) {
        setErrMsg(branchesError?.message || error?.message || statesError?.message || locationsError?.message || 'Problem on fetchinh Branch data')
    }

    const handleBranchSelect = (branch: any) => {
        console.log('Branch selected:', Branch)
        setSuccess('')
        setErrMsg('')
        setIsEditing(true)
        setIsModalOpen(true)
        setBranchData({
            branchId: branch.id,
            branchName: branch.name,
            pincode: branch.pincode,
            countryId: branch.countryId,
            stateId: branch.stateId,
            locationId: branch.locationId
        })
    }

    // create and update function
    const handleCreateBranch = () => {
        try {
            branchValidation.parse(branchData)
            if (branchData.branchName.trim() && branchData.branchId && branchData.locationId) {
                mutateUpdateBranch({
                    id: branchData.branchId,
                    name: branchData.branchName,
                    pincode: branchData.pincode,
                    countryId: branchData.countryId,
                    stateId: branchData.stateId,
                    locationId: branchData.locationId

                },
                    {
                        onSuccess: (res: any) => {
                            setErrMsg('')
                            setSuccess(res?.message)
                            setIsEditing(false)
                            setBranchData({
                                branchId: 0,
                                branchName: '',
                                pincode: 0,
                                locationId: 0,
                                stateId: 0,
                                countryId: 0
                            })
                            setIsModalOpen(false)
                            queryClient.invalidateQueries({ queryKey: ['branches'] })
                        },
                        onError: (error: any) => {
                            if (axios.isAxiosError(error)) {
                                setErrMsg(error?.response?.data.message || error.response?.data.errors || 'Something went wrong.')
                            }
                        }

                    })
            } else {
                createBranchMutation({ name: branchData.branchName, pincode: branchData.pincode, countryId: branchData.countryId, stateId: branchData.stateId, locationId: branchData.locationId },
                    {
                        onSuccess: (res: any) => {
                            setErrMsg('')
                            setSuccess(res?.message)
                            setIsModalOpen(false)
                            setBranchData({
                                branchId: 0,
                                branchName: '',
                                pincode: 0,
                                locationId: 0,
                                stateId: 0,
                                countryId: 0
                            })

                            queryClient.invalidateQueries({ queryKey: ['branches'] })



                        },
                        onError: (error: any) => {
                            if (axios.isAxiosError(error)) {
                                setSuccess('')
                                setErrMsg(error.response?.data.message || error.response?.data.errors || 'Something went wrong.')
                            }
                        }
                    }

                )
            }
        }
        catch (error: any) {
            if (error instanceof z.ZodError) {
                setErrMsg(error.errors[0]?.message || 'Invalid input')
            }
            else {
                setErrMsg('Something went wrong.')

            }
        }

    }


    // Delete funtion

    const handleDeleteBranch = (id: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Branch?')
        if (!confirmDelete) return

        deleteBranchMutate(id, {
            onSuccess: (res: any) => {
                queryClient.invalidateQueries({ queryKey: ['branches'] })
                setSuccess(res.message)
                setErrMsg('')
            },
            onError: (error: any) => {
                if (axios.isAxiosError(error)) {
                    setErrMsg(error.response?.data.message || error.response?.data.errors || 'Something went wrong.')
                    setSuccess('')
                }
            }
        })
    }


    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
                <div>
                    <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
                        Branch List
                    </h1>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded-md font-semibold text-right"
                        onClick={AddModal}
                    >
                        + Add
                    </button>
                </div>
                <div className="mt-4 ">
                    {success && (
                        <p className="mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-md text-center my-4">{success}</p>)
                    }

                    {errMsg && (
                        <p className="mt-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded-md text-center my-4">{errMsg}</p>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left px-3 py-2 text-sm font-semibold text-gray-700">
                                    Branch Name
                                </th>
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
                            {!branchesLoading && branchesData?.branches?.map((bran: any) => (
                                <tr key={bran.id}>
                                    <td className="px-3 py-2 text-gray-800">{bran.name}</td>
                                    <td className="px-3 py-2 text-gray-800">{bran.location.name}</td>
                                    <td className="px-3 py-2 text-gray-800">{bran.location.state.name}</td>
                                    <td className="px-3 py-2 text-gray-800">{bran.location.state.country.name}</td>
                                    <td className="px-3 py-2">
                                        <button
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-2 rounded-md font-semibold"
                                            onClick={() => handleBranchSelect(bran)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="px-3 py-2">
                                        <button
                                            onClick={() => handleDeleteBranch(bran.id)}
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
                                <h2 className="text-xl font-semibold">{isEditing ? 'Edit Location' : 'Create Location'}</h2>
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
                                        Branch Name
                                    </label>
                                    <input
                                        type="text"
                                        id="branchName"
                                        name="branchName"
                                        value={branchData.branchName}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        placeholder="Enter Branch Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="pincode" className="block">
                                        Pincode
                                    </label>
                                    <input
                                        type="text"
                                        id="pincode"
                                        name="pincode"
                                        value={branchData.pincode || ''}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        placeholder="123 456"
                                    />
                                </div>
                                <div>

                                    <label htmlFor="countryId" className="block">
                                        Country
                                    </label>
                                    <select name="countryId"
                                        id="countryId"
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        value={branchData.countryId}
                                        onChange={handleChange}

                                    >
                                        <option value="">Choose Country</option>
                                        {!isLoading && data && data.map((country: any) => (
                                            <option key={country.id} value={country.id}>
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* <div>
                                    StateId:{locationData.stateId}
                                </div> */}
                                <div>
                                    <label htmlFor="stateId" className="block">
                                        State
                                    </label>
                                    <select name="stateId"
                                        onChange={handleChange}
                                        id="stateId"
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        value={branchData.stateId}
                                    >
                                        <option value="">Choose State</option>
                                        {!statesLoading && statesData && (() => {
                                            const filteredStates = statesData.states.filter(
                                                (state: any) => state.countryId === branchData.countryId
                                            );

                                            if (filteredStates.length === 0) {
                                                return (
                                                    <option value="" disabled>No states available for this country</option>
                                                );
                                            }

                                            return filteredStates.map((state: any) => (
                                                <option key={state.id} value={state.id}>
                                                    {state.name}
                                                </option>
                                            ));
                                        })()}



                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="locationId" className="block">
                                        Location
                                    </label>
                                    <select name="locationId"
                                        onChange={handleChange}
                                        id="locationId"
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        value={branchData.locationId}
                                    >
                                        <option value="">Choose Location</option>
                                        {!locationsLoading && locationsData && (() => {
                                            const filteredLocations = locationsData.locations.filter(
                                                (bran: any) => bran.stateId === branchData.stateId
                                            );

                                            if (filteredLocations.length === 0) {
                                                return (
                                                    <option value="" disabled>No Location available for this country</option>
                                                );
                                            }

                                            return filteredLocations.map((loc: any) => (
                                                <option key={loc.id} value={loc.id}>
                                                    {loc.name}
                                                </option>
                                            ));
                                        })()}



                                    </select>
                                </div>

                            </div>
                            {success && (
                                <p className="mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-md text-center my-4">{success}</p>)
                            }

                            {errMsg && (
                                <p className="mt-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded-md text-center my-4">{errMsg}</p>
                            )}
                            <div>
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold mt-4 text-right"
                                    onClick={handleCreateBranch}
                                >
                                    {createBranchPending || updateBranchPending
                                        ? isEditing ?
                                            'Updating Branch...' : 'Creating Branch'
                                        : isEditing ? 'Update Branch' : 'Add Branch'
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