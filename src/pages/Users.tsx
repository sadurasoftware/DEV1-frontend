import { Input } from '@/components/ui/input'
import { useFetchUsers } from '@/hooks/useFetchUsers'
import { Label } from '@radix-ui/react-label'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFetchDepartments } from '../hooks/useFetchDepartments'
import { useDebounce } from "@/hooks/useDebounce";

const Users = () => {
    const { pageno } = useParams();
    const [filterData, setFilterData] = useState({
        page: Number(pageno) || 1,
        search: '',
        departmentName: ''
    })

    const navigate = useNavigate()
    
    const debounceValue = useDebounce(filterData.search, 1000);
    const { departmentsLoading, departmentsData } = useFetchDepartments()

    useEffect(() => {
            setFilterData(prev => ({ ...prev, page: Number(pageno) || 1 }));
          }, [pageno]);

    const { usersLoading, usersData, isUsersError, usersError } = useFetchUsers(
        filterData.page,
        debounceValue,
        filterData.departmentName,
    )

    useEffect(() => {
        setFilterData(prevData => ({
            ...prevData,
            page: 1,
        }));
    }, [filterData.search, filterData.departmentName]);


   

    if (isUsersError) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <h4 className="text-xl font-semibold text-red-500">{usersError?.message}</h4>
            </div>
        );
    }

    
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFilterData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const totalPages = usersData?.totalPages || 1;

    const handleNextPage = () => {
        if (filterData.page < totalPages) {
          navigate(`/users/${filterData.page + 1}`);
        }
      };
      
      const handlePreviousPage = () => {
        if (filterData.page > 1) {
          navigate(`/users/${filterData.page - 1}`);
        }
      };
      



    return (
        <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
            <Link to='/dashboard' className="text-left font-bold text-blue-500">Back</Link>

            <div className="max-w-7xl mx-auto mt-4">

                <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-8">Users List</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div>
                        <Label htmlFor="department" className="label">
                            Department
                        </Label>
                        <select
                            id="departmentName"
                            name="departmentName"
                            value={filterData.departmentName}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        >
                            <option value="">All</option>
                            {!departmentsLoading ? (
                                departmentsData?.departments.map((department, index) => (
                                    <option key={index} value={department.name}>
                                        {department.name}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    Loading departments...
                                </option>
                            )}
                        </select>

                    </div>
                    <div>
                        <Label htmlFor="search" className="text-xs font-medium text-gray-600">Search</Label>
                        <Input
                            id="search"
                            name="search"
                            value={filterData.search}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Search users..."
                        />
                    </div>
                </div>

                {!usersLoading && usersData && usersData.users.length > 0 ? (
                    <>
                        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr className="bg-indigo-100 text-left">
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">UserName</th>
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Email</th>
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Department</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersData.users.map((user) => (
                                        <tr key={user.id} className="border-b hover:bg-indigo-50">
                                            <td className="px-4 py-3 text-sm">{user.firstname}{' '}{user.lastname}</td>
                                            <td className="px-4 py-3 text-sm">{user.email}</td>
                                            <td className="px-4 py-3 text-sm">{user.department?.name}</td>


                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={filterData.page === 1}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                            >
                                Previous
                            </button>
                            <span className="text-gray-600">Page {filterData.page} of {totalPages}</span>
                            <button
                                onClick={handleNextPage}
                                disabled={filterData.page >= totalPages}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-lg text-gray-600 mt-6">No users</div>
                )}
            </div>
        </div>
    )
}

export default Users
