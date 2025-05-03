'use client'

import { FieldArray, Field, ErrorMessage, useFormikContext } from 'formik'
import { FaPlus, FaTrash } from 'react-icons/fa'

const ProductVariants = () => {
  const { values } = useFormikContext<any>()
  const variants = values.variants || []

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Danh sách phân loại</h3>
      <FieldArray name="variants">
        {({ remove, push }) => (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Tên phân loại
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Giá bán (VNĐ)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Số lượng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {variants.map((variant, index) => (
                    <tr key={index}>
                      <td className="hidden">
                        <Field type="hidden" name={`variants.${index}.id`} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Field
                          type="text"
                          name={`variants.${index}.name`}
                          className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none"
                        />
                        <ErrorMessage
                          name={`variants.${index}.name`}
                          component="div"
                          className="text-xs text-red-600"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Field
                          type="number"
                          name={`variants.${index}.price`}
                          min="0"
                          className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none"
                        />
                        <ErrorMessage
                          name={`variants.${index}.price`}
                          component="div"
                          className="text-xs text-red-600"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Field
                          type="number"
                          name={`variants.${index}.stockQuantity`}
                          min="0"
                          className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none"
                        />
                        <ErrorMessage
                          name={`variants.${index}.stockQuantity`}
                          component="div"
                          className="text-xs text-red-600"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {variants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() =>
                push({
                  id: null,
                  name: '',
                  price: 0,
                  stockQuantity: 0,
                })
              }
              className="focus:shadow-outline-blue mt-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm leading-5 font-medium text-gray-700 transition duration-150 ease-in-out hover:text-gray-500 focus:border-blue-300 focus:outline-none active:bg-gray-50 active:text-gray-800"
            >
              <FaPlus className="mr-2" /> Thêm phân loại
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  )
}

export default ProductVariants
