import { useGetBranches } from "@/hooks/branchHooks/useGetBranches"
import { useState } from "react"

export const Branch = () => {

    // const [branchData, setBranchData] = useState({
    //     id: 0,
    //     branchName: '',
    //     pincode: '',
    //     countryId: 0,
    //     stateId: 0,
    //     locationId: 0
    // })
    // const [success, setSuccess] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const { branchesLoading, branchesData, isBranchesError, branchesError } = useGetBranches()

    if (isBranchesError) {
        setErrMsg(branchesError?.message || 'Promblem on fetchinh Branch data')
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
                    // onClick={AddModal}
                    >
                        + Add
                    </button>
                </div>
                <div className="mt-4 ">
                    {/* {success && (
                        <p className="mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-md text-center my-4">{success}</p>)
                    } */}

                    {errMsg && (
                        <p className="mt-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded-md text-center my-4">{errMsg}</p>
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
                            {!branchesLoading && branchesData?.branches?.map((bran: any) => (
                                <tr key={bran.id}>
                                    <td className="px-3 py-2 text-gray-800">{bran.name}</td>
                                    <td className="px-3 py-2 text-gray-800">{bran.state.name}</td>
                                    <td className="px-3 py-2 text-gray-800">{bran.state.country.name}</td>
                                    <td className="px-3 py-2">
                                        <button
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-2 rounded-md font-semibold"
                                            // onClick={() => handleLocationSelect(loc)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="px-3 py-2">
                                        <button
                                            // onClick={() => handleDeleteLocation(loc.id)}
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
            </div>
        </>

    )
}