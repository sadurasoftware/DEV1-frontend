// import { useGetStates } from "@/hooks/useGetStates"
// import { useState } from "react"
export const States = () => {

  // const [stateName, setStateName] = useState('')

  // const { data, isLoading, isError, error } = useGetStates()

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
        <div>
          <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
            States List
          </h1>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded-md font-semibold my-4 text-right"
            // onClick={AddModal}
          >
            + Add
          </button>
        </div>
      </div>
    </>
  )
}