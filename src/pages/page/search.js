import React from 'react'
import { Row, Col } from 'antd'
import { AppleOutlined } from '@ant-design/icons'
import './style.css'
import Header from '../../components/layout/layoutPage/header'
import Footer from '../../components/layout/layoutPage/footer'
import { useParams } from "react-router"
import { getProduct } from '../../api/axios'
import { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom'
import {
    CarOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons'
import { Input } from 'antd';

function Search() {
    const { Search } = Input;
    let { searchKey } = useParams();
    const [searchKey1, setSearchKey1] = useState(searchKey);
    
    const [data, setData] = useState([]);
    const [condition, setCondition] = useState({
        "page": 0,
        "size": 20,
        "manufacturer": searchKey
    });

    const listProduct = () => {
        getProduct(condition).then((res) => {
            if (res.data.success) {
                setData(res.data.data.listItem);
            } else { setData([]); }
        });
    };

    function getListProduct() {
        const productList = data?.map(item =>
            <Col className="gutter-row-1" span={4}>
                <div>
                    <Link to={'/prod/' + item["productId"]} >
                        <img src={item["image"]} alt='anh-1' className='anh' />
                    </Link>
                    <h4>{item["productName"]}</h4>
                    <ul className='text-1'>
                        <h3 className='text-2'>
                            <NumericFormat value={item["price"]} displayType={'text'} thousandSeparator={true} prefix={''} /> đ
                        </h3>
                        <del><NumericFormat value={item["price"]} displayType={'text'} thousandSeparator={true} prefix={''} /> đ</del>
                    </ul>
                </div>
            </Col>
        )

        return (
            <Row gutter={22}>
                {productList}
            </Row>
        );
    }

    const onSearchChange = (e) => {
        setSearchKey1(e.currentTarget.value);
        const newCondition = { ...condition, manufacturer: e.currentTarget.value };
        setCondition(newCondition);
    }

    useEffect(() => {
        listProduct();
    }, [condition]);

    console.log(condition);

    return (
        <div>
            {/* <Header /> */}
            <div className='header'>
                <div className='header-line'>
                    <h3 className='header-text-one'>Chào mừng đến với thế giới smartphone với muôn ngàn ưu đãi</h3>
                </div>
                <div className='header-line-1'>
                    <div className='logo'>
                        <Link to={'/'}>
                            <img src='https://scontent.xx.fbcdn.net/v/t1.15752-9/344287970_1865581070472074_2327929001103548366_n.png?stp=dst-png_p206x206&_nc_cat=107&ccb=1-7&_nc_sid=aee45a&_nc_ohc=13sgCU1zkEcAX_EXbYo&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQxR6rHOFlTCYj1H-xNpugz6pBfeVoBEJOD8scV5pw-BQ&oe=647C9A4F'
                                alt='Logo'
                                className='Lo-go' />
                        </Link>
                    </div>
                    <h2 className='header-text'>Smart</h2>
                    <h2 className='header-text-1'>phone</h2>
                    <Search className='input' placeholder="Hôm nay bạn cần gì" value={searchKey1} onChange={onSearchChange} />
                    <Link to={'/kiem-tra-don-hang'}>
                        <putton className={'putton-one'}><CarOutlined className={'icon'} />
                            Kiểm tra đơn hàng
                        </putton>
                    </Link>
                    <Link to={'/gio-hang'}>
                        <ShoppingCartOutlined className='icon-1' />
                    </Link>
                    <a href='/login'>
                        <UserOutlined className='icon-2' />
                    </a>
                </div>
                <div className='header-menu' >
                    <Link to='/dien-thoai'><h3 className='text-header' activeHeading >ĐIỆN THOẠI</h3></Link>
                    <Link to='/iphone'><h3 className='text-header' activeHeading >IPHONE</h3></Link>
                    <Link to='/sam-sung'><h3 className='text-header' activeHeading >SAMSUNG</h3></Link>
                    <Link to='/oppo'><h3 className='text-header' activeHeading >OPPO</h3></Link>
                    <Link to='/realme'><h3 className='text-header' activeHeading >REALME</h3></Link>
                    <Link to='/redmi'><h3 className='text-header' activeHeading >REDMI</h3></Link>
                </div>
            </div>
            <div className='content-iphone-line'>
                <h2 className='iphone-text'>Kết quả tìm kiếm cho: {searchKey1}</h2>
            </div>

            <div className='content-line-4'>
                {getListProduct()}
            </div>
            <Footer />
        </div>
    )
}

export default Search