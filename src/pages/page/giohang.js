import { React, useState } from 'react'
import './style.css'
import { LeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Button, message, Steps } from 'antd';
import FirstContent from '../../components/layout/layoutCart/FirstContent';
import LastContent from '../../components/layout/layoutCart/LastContent';
import Footer from '../../components/layout/layoutPage/footer';
import SecondContent from '../../components/layout/layoutCart/SecondContent';
import { useEffect } from 'react';
import { fetchCart } from '../../api/axiosCart';




function Giohang() {
  const [cart, setCart] = useState([]);
 
  

  
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  
  const steps = [
    {
      title: 'Giỏ hàng',
      content: <FirstContent next={()=>next()} />,
    },
    {
      title: 'Thông tin đặt hàng',
      content: <SecondContent next={()=>next()} prev ={()=> prev()} />,
    },
    {
      title: 'Xác nhận thanh toán',
      content: <LastContent prev={()=>prev()} />,
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    marginTop: 20,
  };
 
 
  useEffect(() => {
    const getCart = async () => {
      const cartData = await fetchCart();
      setCart(cartData);
    }
    getCart();
  }, []);

  return (
    <div>
      <div>
        <div className='header-line'>
          <h3 className='header-text-one'>Chào mừng đến với thế giới smartphone với muôn ngàn ưu đãi</h3>
        </div>
        <Link to={'/'}>
          <div className='gio-hang-line'>
            <LeftOutlined className='gio-hang-icon' />
            <h4>Quay lại</h4>
          </div>
        </Link>
      </div>

      <div className='cart-content'>
        <Steps className='cart-line' current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
       
      </div>
      <Footer />
    </div>
  )
}

export default Giohang