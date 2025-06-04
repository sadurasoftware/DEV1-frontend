import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
export const Settings = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className=" p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Settings</h1>

        <div className="space-y-4">
          <Button
            onClick={() => navigate('/super-admin-permissions')}
            className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
          >
            Admin User Permission
          </Button>

          {/* 
          <button
            onClick={() => navigate("/userpermission")}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            User Permission
          </button> */}
          <Button
            onClick={() => navigate('/roles')}
            className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
          >
            Roles
          </Button>
          <Button
            onClick={() => navigate('/modules')}
            className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
          >
            Modules
          </Button>
          <Button
            onClick={() => navigate('/permissions')}
            className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
          >
            Permissions
          </Button>
          <Button
            onClick={() => navigate('/departments')}
            className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
          >
            Departments
          </Button>
          <Button
            onClick={() => navigate('/category')}
            className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
          >
            Category
          </Button>
          <Button
            onClick={() => navigate('/countries')}
            className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
          >
            Country
          </Button>
          <Button
            onClick={() => navigate('/states')}
            className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
          >
            States
          </Button>
          <Button
            onClick={() => navigate('/locations')}
            className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
          >
            Locations
          </Button>
          <Button
            onClick={() => navigate('/branches')}
            className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
          >
            Branches
          </Button>
          <Button
            onClick={() => navigate('/designation')}
            className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
          >
            Designations
          </Button>
        </div>
      </div>
    </div>
  )
}
