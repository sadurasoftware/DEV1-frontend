import { useCreateDesignation } from "@/hooks/designationHooks/useCreateDesignation";
import { useDeleteDesignation } from "@/hooks/designationHooks/useDeleteDesignation";
import { useGetDesignations } from "@/hooks/designationHooks/usegetDesignations";
import { useUpdateDesignation } from "@/hooks/designationHooks/useUpdateDesignation";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { designationValidation } from "@/validation/designationValidation";

export const Designation = () => {

    const [designationName, setDesignationName] = useState('')
    const [designationId, setDesignationId] = useState(0)
    const [successMsg, setSuccessMsg] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const queryClient = useQueryClient()

    const { designationsLoading, designationsData, isDesignationsError, designationsError } = useGetDesignations()
    const {isPending, createDesignationMutation} = useCreateDesignation()
    const { updateDesignationPending, mutateUpdateDesignation} = useUpdateDesignation()
    const { deleteDesignationMutate } = useDeleteDesignation()

    if (isDesignationsError) {
        setErrMsg(designationsError?.message || 'Error to fetch designations')
    }

    const AddModal = () => {
    setSuccessMsg('')
    setErrMsg('')
    setIsModalOpen(true)
  }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesignationName(e.target.value)
    setSuccessMsg('');
    setErrMsg('');
  }

  const closeModal = () => {
    
    setIsModalOpen(false)
    setDesignationName('')
    setDesignationId(0)
    setIsEditing(false)
    setSuccessMsg('')
    setErrMsg('')
  }

    const handleCreateDesignation = () => {
    try {

      designationValidation.parse({ designationName })

      if (designationName.trim() && designationId) {
        mutateUpdateDesignation({
          id: designationId,
          name: designationName
        },
          {
            onSuccess: (res: any) => {
              setErrMsg('')
              setSuccessMsg(res?.message)
              setIsModalOpen(false)
              setIsEditing(false)
              setDesignationName('')
              setDesignationId(0)
              
              queryClient.invalidateQueries({ queryKey: ['designations'] })
              
            },
            onError: (error: any) => {
              if (axios.isAxiosError(error)) {
                setErrMsg(error?.response?.data.message || error.response?.data.errors || 'Something went wrong.')
              }
            }

          })
      }

      else {
        createDesignationMutation({ name: designationName },
          {
            onSuccess: (res: any) => {
              setErrMsg('')
              setSuccessMsg(res?.message)
              setIsModalOpen(false)
              setDesignationId(0)
              queryClient.invalidateQueries({ queryKey: ['designations'] })
              setDesignationName('')


            },
            onError: (error: any) => {
              if (axios.isAxiosError(error)) {
                setSuccessMsg('')
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
    }
  }

  const handleDeleteDesignation = (id:number)=>{
    const confirmDelete = window.confirm('Are you sure you want to delete this country?')
    if(!confirmDelete) return
    
    deleteDesignationMutate(id,{
      onSuccess:(res:any)=>{
        queryClient.invalidateQueries({queryKey: ['designations']})
        setSuccessMsg(res.message)
        setErrMsg('')
      },
      onError:(error:any)=>{
        if(axios.isAxiosError(error))
        {
          setErrMsg(error.response?.data.message || error.response?.data.errors || 'Something went wrong.')
          setSuccessMsg('')
        }
      }
    })
  }

   const handleDesignationSelect = (id: number) => {
    setIsModalOpen(true)
    setSuccessMsg('')
    setErrMsg('')
    setIsEditing(true)
    setDesignationId(id)
    const selectedDesignation = designationsData?.designations?.find((des: { id: number }) => des.id === id)
    if (selectedDesignation) {
      setDesignationName(selectedDesignation.name)
      setIsEditing(true)
    }
  }

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
                <div>
                    <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
                        Degignations List
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
                                    Designation Name
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
                            {!designationsLoading && designationsData.designations?.map((des: { name: string, id: number }) => (
                                <tr key={des.id}>
                                    <td className="px-3 py-2 text-gray-800">{des.name}</td>
                                    <td className="px-3 py-2">
                                        <button
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-2 rounded-md font-semibold"
                                        onClick={() => handleDesignationSelect(des.id)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="px-3 py-2">
                                        <button
                                            onClick={() => handleDeleteDesignation(des.id)}
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
                {errMsg && (
                    <p className="mt-4 text-center text-red-600 font-medium">{errMsg}</p>
                )}

                {successMsg && (
                    <p className="mt-4 text-center text-green-600 font-medium">{successMsg}</p>
                )}

                {isModalOpen &&

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-semibold">{isEditing ? 'Edit Country' : 'Add Country' }</h2>
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
                  Designation Name
                </label>
                <input
                  type="text"
                  id="designationName"
                  name="designationName"
                  value={designationName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                {successMsg && (
                  <p className="mt-4 text-center text-green-600 font-medium">{successMsg}</p>)
                }

                {errMsg && (
                  <p className="mt-4 text-center text-red-600 font-medium">{errMsg}</p>
                )}
              </div>

            </div>
            <div>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold mt-4 text-right"
                 onClick={handleCreateDesignation}
              >
                {isPending || updateDesignationPending
                  ? isEditing ?
                    'Updating Designation...' : 'Creating Designation'
                  : isEditing ? 'Edit Designation' : 'Add Designation'
                }
              </button>
            </div>
          </div>
        </div>

      }

            </div>
        </>
    );
};