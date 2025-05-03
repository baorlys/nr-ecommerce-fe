import { Field, ErrorMessage } from "formik"

interface CategoryBasicInfoProps {
  categories: any[]
}

const CategoryBasicInfo = ({ categories }: CategoryBasicInfoProps) => {
  return (
    <>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
          Tên danh mục <span className="text-red-500">*</span>
        </label>
        <Field
          type="text"
          name="name"
          id="name"
          className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
        />
        <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
          Mô tả <span className="text-red-500">*</span>
        </label>
        <Field
          as="textarea"
          name="description"
          id="description"
          rows={4}
          className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
        />
        <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600" />
      </div>

      <div>
        <label htmlFor="parentId" className="mb-1 block text-sm font-medium text-gray-700">
          Danh mục cha
        </label>
        <Field
          as="select"
          name="parentId"
          id="parentId"
          className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
        >
          <option value="">Không có danh mục cha</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Field>
        <ErrorMessage name="parentId" component="div" className="mt-1 text-sm text-red-600" />
      </div>
    </>
  )
}

export default CategoryBasicInfo
