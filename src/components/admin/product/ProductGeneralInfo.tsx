import { Field, ErrorMessage } from 'formik'

interface ProductGeneralInfoProps {
  categories: any[]
}

const ProductGeneralInfo = ({ categories }: ProductGeneralInfoProps) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
          Tên sản phẩm <span className="text-red-500">*</span>
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
        <label htmlFor="shortDescription" className="mb-1 block text-sm font-medium text-gray-700">
          Mô tả ngắn <span className="text-red-500">*</span>
        </label>
        <Field
          as="textarea"
          name="shortDescription"
          id="shortDescription"
          rows={2}
          className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
        />
        <ErrorMessage
          name="shortDescription"
          component="div"
          className="mt-1 text-sm text-red-600"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
          Mô tả chi tiết <span className="text-red-500">*</span>
        </label>
        <Field
          as="textarea"
          name="description"
          id="description"
          rows={5}
          className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
        />
        <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600" />
      </div>

      <div>
        <label htmlFor="categoryId" className="mb-1 block text-sm font-medium text-gray-700">
          Danh mục <span className="text-red-500">*</span>
        </label>
        <Field
          as="select"
          name="categoryId"
          id="categoryId"
          className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
        >
          <option value="">Chọn danh mục</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Field>
        <ErrorMessage name="categoryId" component="div" className="mt-1 text-sm text-red-600" />
      </div>

      <div>
        <label htmlFor="isFeatured" className="flex items-center">
          <Field
            type="checkbox"
            name="isFeatured"
            id="isFeatured"
            className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-700">Sản phẩm nổi bật</span>
        </label>
      </div>
    </div>
  )
}

export default ProductGeneralInfo
