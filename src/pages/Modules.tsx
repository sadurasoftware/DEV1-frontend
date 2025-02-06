import React, { useState } from 'react';
import { useCreateModule } from '../hooks/useCreateModule';
import { Link } from 'react-router-dom';
import { useFetchModules } from '@/hooks/useFetchModules';
import { moduleType } from '@/types/moduleTypes';
import { useUpdateModuleById } from '@/hooks/useUpdateModuleById';
import { useDeleteModuleById } from '@/hooks/useDeleteModuleById';

const Modules: React.FC = () => {
  const [moduleName, setModuleName] = useState<string>('');
  const [moduleId, setModuleId] = useState<number | null>(null);

  const [success, setSuccess] = useState<string>('');
  const [errror, setError] = useState<string>('');

  const { mutate, isPending, isError, isSuccess, error, data } = useCreateModule();
  const { modulesLoading, modulesData, isModulesError, modulesError, refetch } = useFetchModules();
  const { module } = modulesData || {};

  const { mutate: updateModule, updateModulePending, isModuleUpdateError, updateModuleError, updateModuleSuccess } = useUpdateModuleById();
  const { deleteModule, deleteModulePending } = useDeleteModuleById();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModuleName(e.target.value);
  };


  const handleModuleSelect = (id: number) => {
    setModuleId(id);
    const selectedModule = module?.find(mod => mod.id === id);
    if (selectedModule) {
      setModuleName(selectedModule.name);
    }
  };


  const moduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (moduleName.trim()) {
        if (moduleId) {

          console.log(moduleId, moduleName)
          updateModule({ id: moduleId, name: moduleName }, {
            onSuccess: () => {
              refetch();
              
            },
          });
        } else {

          mutate({ name: moduleName }, {
            onSuccess: () => {
              refetch();
              setSuccess(data?.message || '');
            },
          });
        }
      }
    } catch (err) {
      console.error("Error during module submission:", err);
    }
  };


  const handleDeleteModule = (id: number) => {
    deleteModule(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Manage Modules</h2>

      <form onSubmit={moduleSubmit} className="space-y-4">
        <div>
          <label htmlFor="moduleName" className="block text-gray-700">Module Name</label>
          <input
            type="text"
            id="moduleName"
            name="moduleName"
            value={moduleName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {isError && error && (
          <div className="text-red-600 text-center mt-2">{error.message}</div>
        )}

        {isSuccess && data && (
          <div className="text-green-600 text-center mt-2">Module created successfully!</div>
        )}

        {updateModuleSuccess && (
          <div className="text-green-600 text-center mt-2">Module updated successfully!</div>
        )}

        {isModuleUpdateError && updateModuleError && (
          <div className="text-red-600 text-center mt-2">{updateModuleError.message}</div>
        )}

        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
            disabled={isPending || updateModulePending}
          >
            {isPending || updateModulePending ? (moduleId ? 'Updating Module...' : 'Creating Module...') : (moduleId ? 'Update Module' : 'Create Module')}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-center mb-4">Existing Modules</h3>

        {modulesLoading ? (
          <div className="text-center">Loading Modules...</div>
        ) : isModulesError && modulesError ? (
          <div className="text-red-600 text-center">{modulesError.message}</div>
        ) : (
          <div className="text-center">
            <table className="w-full">
              <tbody>
                {module?.map((mod: moduleType) => (
                  <tr key={mod.id}>
                    <td>{mod.name}</td>
                    <td>
                      <button
                        className="bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-600 p-2"
                        onClick={() => handleModuleSelect(mod.id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 p-2"
                        onClick={() => handleDeleteModule(mod.id)}
                        disabled={deleteModulePending}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        )}
      </div>

      <div className="text-center mt-4">
        <Link to="/settings" className="text-blue-500 hover:text-blue-700">
          Back to Settings
        </Link>
      </div>
    </div>
  );
};

export default Modules;
