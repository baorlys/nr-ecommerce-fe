import Modal from 'react-modal'

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Action"
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      overlayClassName="fixed inset-0 bg-black/50"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">{title}</h2>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 transition hover:bg-gray-400"
          >
            Huỷ
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </Modal>
  )
}
