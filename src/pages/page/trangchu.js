import React from "react";
import "./style.css";
import { Col, Row, Carousel, Pagination } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AppleOutlined } from "@ant-design/icons";
import Header from "../../components/layout/layoutPage/header";
import Footer from "../../components/layout/layoutPage/footer";
import { useState } from "react";
import { getAllProduct, getProduct } from "../../api/axios";
import { useEffect } from "react";
import { NumericFormat } from "react-number-format";

function Trangchu() {
  //api
  const navigate = useNavigate("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [condition, setCondition] = useState({
    page: page,
    size: 10,
  });
  const onChangePagination = (value) => {
    console.log(value);
    setCondition({
      page: value - 1,
      size: 10,

      // manufacturer: "",
    });
  };

  const listProduct = () => {
    getProduct(condition).then((res) => {
      setData(res.data.data.listItem);
      console.log(res.data);
      setTotalProduct(res.data.data.total);
    });
  };

  useEffect(() => {
    listProduct();
  }, [condition]);

  function getListProduct() {
    const productList = data?.map((item) => (
      <div className="w-[20%]  md:my-[20px] lg:my-[20px] relative py-2">
        <div className="mx-[20px] shadow-md hover:scale-[1.2] hover:transition-transform py-[10px] box-content">
          <p className="font-[600] text-[#fff] text-[18px] px-[10px] w-[50px] py-[10px] rounded-[50%] bg-red-600  absolute right-[50px] ">
            30%
          </p>

          <Link to={"/prod/" + item["productId"]}>
            <div className="w-[100%] ">
              <img src={item["image"]} alt="anh-1" />
            </div>
          </Link>
          <h4 className="font-[600] truncate text-center text-[16px]">
            {item["productName"]}
          </h4>
          <ul className="justify-center flex text-[18px]">
            <h3 className="text-2">
              <NumericFormat
                value={item["price"]}
                displayType={"text"}
                thousandSeparator={true}
                prefix={""}
              />
              đ
            </h3>
            <del>
              <NumericFormat
                className="ml-[4px]"
                value={item["price"]}
                displayType={"text"}
                thousandSeparator={true}
                prefix={""}
              />
              đ
            </del>
          </ul>
        </div>
      </div>
    ));

    return (
      <div className=" w-full mt-[30px]">
        <Row>{productList}</Row>;
        <Pagination
          className="block text-center"
          onChange={onChangePagination}
          defaultCurrent={0}
          total={totalProduct}
        />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="content-line-1">
        <Carousel autoplay>
          <img
            src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/04/13/ip-pc.png"
            alt="anh-1"
          />
          <img
            src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/04/01/showcase-redmi-buds-4-lite-web-01.jpg"
            alt="anh-2"
          />
          <img
            src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/03/20/xiaomi-13-series-01.jpg"
            alt="anh-3"
          />
          <img
            src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/04/14/galaxy-z-fold4-z-flip4-02.jpg"
            alt="anh-4"
          />
          <img
            src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/04/18/web-galaxy-s23-ultra-03.jpg"
            alt="anh-5"
          />
          <img
            src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/04/15/web-c55.png"
            alt="anh-6"
          />
          <img
            src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/04/18/taba8-web-1.jpg"
            alt="anh-7"
          />
          <img
            src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/04/10/oppo-find-n2-flip-web.jpg"
            alt="anh-8"
          />
        </Carousel>
      </div>

      <div
        className="content-line-2"
        onClick={() => navigate("/user/addProduct")}
      >
        <Row gutter={22}>
          <Col className="gutter-row" span={4}>
            <div>
              <h4>OPPO Find N2 Flip</h4>
              <h5>Sự lựa chọn hoàn hảo</h5>
            </div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div>
              <h4>Mở bán Realme C55</h4>
              <h5>Chụp chuyên sâu - Nhớ siêu lâu</h5>
            </div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div>
              <h4>Apple Iphone 14 Pro Max</h4>
              <h5>Giá chỉ từ 25.590.000 đ</h5>
            </div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div>
              <h4>Xiaomi 13 seri</h4>
              <h5>Pin cực trâu</h5>
            </div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div>
              <h4>Samsung Galaxy S23 Series</h4>
              <h5>Cảm hứng từ thiên nhiên</h5>
            </div>
          </Col>
        </Row>
      </div>

      <div className="content-line-3">
        <img
          src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/04/18/taba8-chuyenmuc.jpg"
          alt=""
        />
      </div>

      <div className="content-line-5">
        <h3 className="text-3">Sản phẩm nổi bật</h3>
      </div>

      <div className="content-line-4">{getListProduct()}</div>

      <div className="content-anh">
        <img
          src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/04/11/tv-xiaomi.png"
          alt="anh"
          width={"1200px"}
        />
      </div>

      <div className="content-line-6">
        <h3 className="text-3">TIN CÔNG NGHỆ</h3>
      </div>

      <div className="content-line-7">
        <Row gutter={22}>
          <Col className="gutter-row-2" span={7}>
            <div className="line-1">
              <img
                src="https://cdn1.hoanghamobile.com/tin-tuc/wp-content/uploads/2023/04/z4242009841867_3418197952ad7aacb409a02468104bfc-218x150.jpg"
                alt="anh-1"
                className="anh1"
              />
              <h4>Nên xóa bộ nhớ cache iPhone của mình để không hối hận</h4>
            </div>
          </Col>
          <Col className="gutter-row-2" span={7}>
            <div className="line-1">
              <img
                src="https://cdn1.hoanghamobile.com/tin-tuc/wp-content/uploads/2023/04/lam-sach-tai-nghe-218x150.jpg"
                alt="anh-1"
                className="anh1"
              />
              <h4>
                Hướng dẫn làm sạch tai nghe AirPods đúng cách để tăng tuổi thọ
                cho thiết bị
              </h4>
            </div>
          </Col>
          <Col className="gutter-row-2" span={7}>
            <div className="line-1">
              <img
                src="https://cdn1.hoanghamobile.com/tin-tuc/wp-content/uploads/2023/04/Xiaomi-Pad-6-1-218x150.jpg"
                alt="anh-1"
                className="anh1"
              />
              <h4>
                Bạn đã biết dùng ChatGPT chưa? Đừng bỏ lỡ cách sử dụng AI
                chatbot đang được bàn tán
              </h4>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default Trangchu;
