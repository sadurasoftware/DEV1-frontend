import { Link, useParams } from 'react-router-dom'
import { useLoginInfoStore } from '../store/useLoginInfoStore'
import { useViewUser } from '@/hooks/useViewUser'
export const MyProfile = () => {
    const {id} = useParams();
    const { user } = useLoginInfoStore()
    const {isLoading, data, isError, error} = useViewUser(id);
    return (
        <>
            <div className="max-w-7xl mx-auto my-8">
                
                {
                data && <div className=''>
                    <table className="min-w-full table-auto border-t">
                        <tbody className='border-t'>
                            <tr className="border-t px-4 py-2 text-left  text-gray-600 bg-gray-100">
                                <th className="px-4 py-2" colSpan={2}>User Details page</th>
                                

                            </tr>
                            <tr className="border-t px-4 py-2 text-left">
                                <th className="px-4 py-2">Name</th>
                                <td className="px-4 py-2">{data.userData.firstname}{' '}{data.userData.lastname}</td>

                            </tr>
                            <tr className="border-t px-4 py-2 text-left">
                                <th className="px-4 py-2">Email</th>
                                <td className="px-4 py-2">{data.userData.email}</td>

                            </tr>
                            <tr className="border-t px-4 py-2 text-left">
                                <th className="px-4 py-2">Role</th>
                                <td className="px-4 py-2">
                                    {data.userData.roleId === 1 && 'SuperAdmin'}
                                    {data.userData.roleId === 2 && 'Admin'}
                                    {data.userData.roleId === 3 && 'User'}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    
                </div>
                }
                <div className='text-center'>
                <Link to="/super-admin" className="bg-blue-500 text-white px-4 py-2 mt-3   rounded-md hover:bg-blue-600 transition duration-200">
                                Back
                            </Link>
                </div>
            </div>

        </>
    )
}