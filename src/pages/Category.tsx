import { useDeleteCategoryById } from '@/hooks/useDeleteCategoryById'
import { useFetchCategories } from '@/hooks/useFetchCategories'
import { useUpdateCategoryById } from '@/hooks/useUpdateCategoryById'
import { categoryType } from '@/types/categoryTypes'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCreateCategory } from '../hooks/useCreateCategory'

const Category: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>('')
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [success, setSuccess] = useState<string>('')

  const { mutate, isPending, isError, error: createError } = useCreateCategory()
  const {
    categoriesLoading,
    categoriesData,
    isCategoriesError,
    categoriesError,
    refetch,
  } = useFetchCategories()

  const {
    mutate: updateCategory,
    updateCategoryPending,
    isCategoryUpdateError,
    updateCategoryError,
    updateCategorySuccess,
  } = useUpdateCategoryById()
  const { deleteCategory, deleteCategoryPending } = useDeleteCategoryById()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value)
  }

  const handleCategorySelect = (id: number) => {
    setCategoryId(id)
    const selectedModule = categoriesData?.find((mod: { id: number }) => mod.id === id)
    if (selectedModule) {
      setCategoryName(selectedModule.name)
      setIsEditing(true)
    }
  }

  const categorySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (categoryName.trim()) {
      if (categoryId) {
        updateCategory(
          { id: categoryId, name: categoryName },
          {
            onSuccess: () => {
              refetch()
              setSuccess('')
              setIsEditing(false)
              setCategoryId(null)
              setCategoryName('')
            },
            onError: error => {
              console.log('Error updating Category:', error)
            },
          }
        )
      } else {
        mutate(
          { name: categoryName },
          {
            onSuccess: () => {
              refetch()
              setSuccess('Category created successfully!')
              setCategoryName('')
            },
            onError: error => {
              console.log('Error creating Category:', error)
            },
          }
        )
      }
    } else {
      console.log('Category name cannot be empty.')
    }
  }

  const handleDeleteCategory = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?')
    if(!confirmDelete)
    {
      return
    }
    deleteCategory(id, {
      onSuccess: () => {
        refetch()
      },
    })
  }

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Manage Category
      </h2>

      <form onSubmit={categorySubmit} className="space-y-4">
        <div>
          <label htmlFor="moduleName" className="block">
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {isCategoryUpdateError && updateCategoryError && (
          <div className="text-red-600 text-center mt-2">
            {updateCategoryError.message}
          </div>
        )}

        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
            disabled={isPending || updateCategoryPending}
          >
            {isPending || updateCategoryPending
              ? isEditing
                ? 'Updating category...'
                : 'Creating category...'
              : isEditing
                ? 'Update category'
                : 'Create category'}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-center mb-4">
          Existing Categories
        </h3>

        {categoriesLoading ? (
          <div className="text-center">Loading categories...</div>
        ) : isCategoriesError && categoriesError ? (
          <div className="text-red-600 text-center">
            {categoriesError.message}
          </div>
        ) : (
          <div className="text-center">
            <table className="w-full">
              <tbody>
                {categoriesData?.map((mod: categoryType) => (
                  <tr key={mod.id}>
                    <td>{mod.name}</td>
                    <td>
                      <button
                        className="bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-600 p-2"
                        onClick={() => handleCategorySelect(mod.id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 p-2"
                        onClick={() => handleDeleteCategory(mod.id)}
                        disabled={deleteCategoryPending}
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

      {isError && createError && (
        <div className="text-red-600 text-center mt-2">
          {createError.message}
        </div>
      )}

      {updateCategorySuccess && (
        <div className="text-green-600 text-center mt-2">
          Category updated successfully!
        </div>
      )}

      {success && (
        <div className="text-green-600 text-center mt-2">{success}</div>
      )}
    </div>
  )
}

export default Category
