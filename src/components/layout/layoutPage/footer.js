import React from 'react'
import './styles.css';

function Footer() {
  return (
    <div>
        <div className='footer'>
          <div className='footer-line-1'>
            <img src='https://fptshop.com.vn/dien-gia-dung/Content/desktop/images/g1.png' alt='anh-1' />
            <h3>Thương hiệu đảm bảo</h3>
            <h5>Sản phẩm chính hãng</h5>
          </div>
          <div className='footer-line-2'>
            <img src='https://fptshop.com.vn/dien-gia-dung/Content/desktop/images/g2.png' alt='anh-2' />
            <h3 >Đổi trả dễ dàng</h3>
            <h5>Thủ tục đổi trả dễ dàng</h5>
          </div>
          <div className='footer-line-3'>
            <img src='https://fptshop.com.vn/dien-gia-dung/Content/desktop/images/g3.png' alt='anh-3' />
            <h3>Giao hàng tận nơi</h3>
            <h5>Miễn phí vận chuyển toàn quốc</h5>
          </div>
          <div className='footer-line-4'>
            <img src='https://fptshop.com.vn/dien-gia-dung/Content/desktop/images/g4.png' alt='anh-4' />
            <h3>Sản phẩm chất lượng</h3>
            <h5>Hotline hỗ trợ 1900.2091</h5>
          </div>
        </div>
        
        <div className='footer-1'>
          <div className='footer-text-1'>
            <h3>Hỗ trợ - Dịch vụ</h3>
            <h4>Mua hàng trả góp</h4>
            <h4>Tra cứu đơn hàng</h4>
            <h4>Chính sách bảo hành</h4>
            <h4>Chính sách bảo mật</h4>
            <h4>Câu hỏi thường gặp</h4>
          </div>
          <div className='footer-text-1'>
            <h3>Bán hàng online</h3>
            <h4>Chăm sóc khách hàng</h4>
            <h4>Trung tâm bảo hành</h4>
          </div>
          <div className='footer-text-1'>
              <h3>Thanh toán miễn phí</h3>
              <h4>Giao hàng tận nơi</h4>
              <h4>Thanh toán khi nhận hàng</h4>
          </div>
          <div className='footer-text-1'>
            <h3>Hình thức vận chuyển</h3>
            <img src='https://fptshop.com.vn/Content/v4/images/ft-img2.png' alt='anh-2' />
          </div>
        </div>
    </div>
  )
}

export default Footer