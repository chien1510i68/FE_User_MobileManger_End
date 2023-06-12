import React from "react";
import { Row, Carousel, Col, Checkbox, Radio, Pagination } from "antd";
import "./style.css";
import Footer from "../../components/layout/layoutPage/footer";
import Header from "../../components/layout/layoutPage/header";

import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { getProduct } from "../../api/axiosClient";

function DienThoai() {
  const [data, setData] = useState([]);

  const [manufacturer, setManufacturer] = useState("");
  const [price, setPrice] = useState("0,100000000");
  const [color, setColor] = useState("");
  const [page, setPage] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);

  const [isHandleConditionCalled, setIsHandleConditionCalled] = useState(false);
  const onChangePagination = (value) => {
    console.log(value);
    setCondition({
      page: value - 1,
      size: 10,
    });
  };
  const [condition, setCondition] = useState({
    page: 0,
    size: 10,
  });
  const listProduct = () => {
    getProduct(condition).then((res) => {
      console.log(res);
      if (res.data.success) {
        setData(res.data.data.listItem);
        console.log("Tong so ban ghi la : ", res.data.data.total);
        setTotalProduct(res.data.data.total);
      } else {
        setData([]);
      }
    });
  };

  function onValueChange(e) {
    setManufacturer(e.currentTarget.value);
    const newCondition = { ...condition, manufacturer: e.currentTarget.value };
    setCondition(newCondition);
  }

  function onPriceChange(e) {
    setPrice(e.currentTarget.value);
    var priceSplit = e.currentTarget.value.split(",");
    const newCondition = {
      ...condition,
      priceFrom: priceSplit[0],
      priceTo: priceSplit[1],
    };
    setCondition(newCondition);
  }

  function onColorChange(e) {
    setColor(e.currentTarget.value);
    const newCondition = { ...condition, color: e.currentTarget.value };
    setCondition(newCondition);
  }

  function getListProduct() {
    const productList = data?.map((item) => (
      <div className="w-[25%]  md:my-[20px] lg:my-[20px] relative ">
        <div className="mx-[20px] shadow-md hover:scale-[1.2] hover:transition-transform py-[10px] box-content">
          <p className="font-[600] text-[#fff] text-[18px] px-[10px] w-[50px] py-[10px] rounded-[50%] bg-red-600  absolute right-[40px] ">
            {item.percenPromotion}%
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
        ;
      </div>
    );
  }

  useEffect(() => {
    listProduct();
    getListProduct();
  }, [condition, page]);

  // const handleCondition = () => {
  //   const productName = Cookies.get("data");
  //   console.log(productName);

  //   setCondition({
  //     ...condition,
  //     productName: productName,
  //   });
  // };

  const handleCondition = () => {
    const productName = Cookies.get("data");
    console.log(productName);

    setCondition((prevCondition) => ({
      ...prevCondition,
      productName: productName,
    }));
    Cookies.clear();
  };
  return (
    <div>
      <Header />{" "}
      <div className="">
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
      <div className="w-full lg:flex md:grid mx-[30px] justify-between">
        <div className="lg:w-[25%]">
          <div>
            <div>
              <h3 className="dt-text-1">Hãng sản xuất {manufacturer}</h3>
              <Row className="dt-line-1">
                <Col span={9}>
                  <Radio
                    name="manufacturer"
                    checked={manufacturer === ""}
                    onClick={onValueChange}
                    value=""
                  >
                    Tất cả
                  </Radio>
                </Col>
                <Col span={9}>
                  <Radio
                    name="manufacturer"
                    checked={manufacturer === "Apple"}
                    onClick={onValueChange}
                    value="Apple"
                  >
                    Apple
                  </Radio>
                </Col>
              </Row>

              <Row className="dt-line-1">
                <Col span={9}>
                  <Radio
                    name="manufacturer"
                    checked={manufacturer === "SamSung"}
                    onClick={onValueChange}
                    value="SamSung"
                  >
                    Samsung
                  </Radio>
                </Col>
                <Col span={9}>
                  <Radio
                    name="manufacturer"
                    checked={manufacturer === "Oppo"}
                    onClick={onValueChange}
                    value="Oppo"
                  >
                    Oppo
                  </Radio>
                </Col>
              </Row>

              <Row className="dt-line-1">
                <Col span={9}>
                  <Radio
                    name="manufacturer"
                    checked={manufacturer === "Realme"}
                    onClick={onValueChange}
                    className="dt-text-2"
                    value="Realme"
                  >
                    Realme
                  </Radio>
                </Col>
                <Col span={9}>
                  <Radio
                    name="manufacturer"
                    checked={manufacturer === "Redme"}
                    onClick={onValueChange}
                    className="dt-text-2"
                    value="Redme"
                  >
                    Redmi
                  </Radio>
                </Col>
              </Row>
            </div>

            <div>
              <h3 className="dt-text-1">Mức giá {price}</h3>
              <Row className="dt-line-1">
                <Col span={12}>
                  <Radio
                    name="price"
                    checked={price === "0,100000000"}
                    onClick={onPriceChange}
                    value="0,100000000"
                  >
                    Tất cả
                  </Radio>
                </Col>
              </Row>

              <Row className="dt-line-1">
                <Col span={12}>
                  <Radio
                    name="price"
                    checked={price === "0,2000000"}
                    onClick={onPriceChange}
                    value="0,2000000"
                  >
                    Dưới 2 triệu
                  </Radio>
                </Col>
              </Row>

              <Row className="dt-line-1">
                <Col span={12}>
                  <Radio
                    className="dt-text-2"
                    checked={price === "2000000,7000000"}
                    onClick={onPriceChange}
                    name="price"
                    value="2000000,7000000"
                  >
                    Từ 2 - 7 triệu
                  </Radio>
                </Col>
              </Row>

              <Row className="dt-line-1">
                <Col span={12}>
                  <Radio
                    className="dt-text-2"
                    name="price"
                    checked={price === "7000000,13000000"}
                    onClick={onPriceChange}
                    value="7000000,13000000"
                  >
                    Từ 7 - 13 triệu
                  </Radio>
                </Col>
              </Row>

              <Row className="dt-line-1">
                <Col span={12}>
                  <Radio
                    className="dt-text-2"
                    name="price"
                    checked={price === "13000000,100000000"}
                    onClick={onPriceChange}
                    value="13000000,100000000"
                  >
                    Trên 13 triệu
                  </Radio>
                </Col>
              </Row>
            </div>
          </div>

          <div>
            <h3 className="dt-text-1">Màu sắc {color}</h3>
            <Row className="dt-line-1">
              <Col span={9}>
                <Radio
                  name="color"
                  checked={color === ""}
                  onClick={onColorChange}
                  value=""
                >
                  Tất cả
                </Radio>
              </Col>
              <Col span={9}>
                <Radio
                  name="color"
                  checked={color === "Red"}
                  onClick={onColorChange}
                  value="Red"
                >
                  Đỏ
                </Radio>
              </Col>
            </Row>
            <Row className="dt-line-1">
              <Col span={9}>
                <Radio
                  className="dt-text-2"
                  name="color"
                  checked={color === "Black"}
                  onClick={onColorChange}
                  value="Black"
                >
                  Đen
                </Radio>
              </Col>
              <Col span={9}>
                <Radio
                  className="dt-text-2"
                  name="color"
                  checked={color === "White"}
                  onClick={onColorChange}
                  value="White"
                >
                  Trắng
                </Radio>
              </Col>
            </Row>
            <Row className="dt-line-1">
              <Col span={9}>
                <Radio
                  className="dt-text-2"
                  name="color"
                  checked={color === "Gold"}
                  onClick={onColorChange}
                  value="Gold"
                >
                  Vàng
                </Radio>
              </Col>
              <Col span={9}>
                <Radio
                  className="dt-text-2"
                  name="color"
                  checked={color === "Green"}
                  onClick={onColorChange}
                  value="Green"
                >
                  Xanh lá
                </Radio>
              </Col>
            </Row>
          </div>
        </div>

        <div className="lg:w-[70%] md:w-full mx-auto">{getListProduct()}</div>
        {/* <div className="lg:w-[70%] md:w-full mx-auto">{listProduct()}</div> */}
      </div>
      <Footer />
    </div>
  );
}

export default DienThoai;
