export default function ShippingInfoSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-xl font-semibold">Thông tin vận chuyển</h3>
        <p className="mb-4">Chúng tôi giao hàng trên toàn quốc với các hình thức vận chuyển sau:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Giao hàng tiêu chuẩn: 2-3 ngày làm việc</li>
          <li>Giao hàng nhanh: 1-2 ngày làm việc</li>
          <li>Giao hàng hỏa tốc (nội thành): 2-3 giờ</li>
        </ul>
        <p className="mt-4">
          Phí vận chuyển sẽ được tính dựa trên khoảng cách và phương thức vận chuyển bạn lựa chọn.
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-semibold">Phương thức thanh toán</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>Thanh toán khi nhận hàng (COD)</li>
          <li>Chuyển khoản ngân hàng</li>
          <li>Ví điện tử (MoMo, ZaloPay, VNPay)</li>
          <li>Thẻ tín dụng/ghi nợ</li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-semibold">Chính sách đổi trả</h3>
        <p className="mb-4">
          Quý khách có thể đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng nếu:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Sản phẩm bị lỗi do nhà sản xuất</li>
          <li>Sản phẩm không đúng với mô tả</li>
          <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển</li>
        </ul>
        <p className="mt-4">
          Lưu ý: Sản phẩm đổi trả phải còn nguyên vẹn, chưa qua sử dụng và còn đầy đủ bao bì, nhãn
          mác.
        </p>
      </div>
    </div>
  )
}
