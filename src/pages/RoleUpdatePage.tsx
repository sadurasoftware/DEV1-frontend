import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

// Types for role data
type Role = {
  id: number;
  name: string;
};

type UpdateRole = {
  name: string;
};

type ErrorResponse = {
  message: string;
};

type Params = {
  id: string;
};

const RoleUpdatePage = () => {
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [role, setRole] = useState<UpdateRole>({ name: "" });

  // Fetch role data from the API
  const fetchRole = async (id: string): Promise<Role> => {
    const res: AxiosResponse<Role> = await axios.get(
      `http://localhost:3000/api/roles/${id}`
    );
    if (!res) {
      throw new Error("Error fetching role data");
    }
    return res.data;
  };

  // Use React Query's useQuery to fetch role data
  const { data: fetchedRole, isLoading, isError, error: queryError } = useQuery<Role | null>(
    ['role', id],
    () => fetchRole(id!),
    { enabled: !!id }
  );

  // Update the role state when fetched role data is available
  useEffect(() => {
    if (fetchedRole) {
      setRole({ name: fetchedRole.name });
    }
  }, [fetchedRole]);

  // Handle input change (for role name)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setRole((prevRole) => ({
      ...prevRole,
      [name]: value,
    }));
  };

  // API call to update role
  const updateRole = async (): Promise<Role> => {
    const res: AxiosResponse<Role> = await axios.put(
      `http://localhost:3000/api/roles/update/${id}`,
      role
    );
    return res.data;
  };

  // Use React Query's useMutation for updating the role
  const { mutate, isLoading: isUpdating, isError: isUpdateError, error: updateError } = useMutation(
    updateRole,
    {
      onSuccess: (data) => {
        navigate("/roles"); // Redirect to roles list after successful update
      },
      onError: (error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.message || "An unexpected error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      },
    }
  );

  // Handle the update button click
  const handleUpdate = () => {
    mutate(); // Trigger the mutation to update the role
  };

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Error: {queryError instanceof Error ? queryError.message : "Unknown error"}</h1>;

  return (
    <div className="App flex items-center justify-center min-h-screen">
      <div className="header bg-gray-200 p-10">
        <h1 className="mb-5 text-center">Edit Role</h1>
        <div className="inputContainer sm space-y-4">
          <input
            type="text"
            placeholder="Role Name"
            name="name"
            onChange={handleChange}
            value={role?.name || ""}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
          onClick={handleUpdate}
          disabled={isUpdating} // Disable button while updating
        >
          {isUpdating ? "Updating..." : "Update Role"}
        </button>

        {/* Display error message if any */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default RoleUpdatePage;
