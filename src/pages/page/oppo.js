import React from "react";
import { Row, Col, Pagination } from "antd";
import { Link } from "react-router-dom";
import "./style.css";
import Header from "../../components/layout/layoutPage/header";
import Footer from "../../components/layout/layoutPage/footer";
import { getProduct } from "../../api/axios";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

function Oppo() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [condition, setCondition] = useState({
    page: page,
    size: 7,
    manufacturer: "Oppo",
  });
  const onChangePagination = (value) => {
    console.log(value);
    setCondition({
      page: value - 1,
      size: 7,
      manufacturer: "Oppo",
    });
  };
  const listProduct = () => {
    getProduct(condition).then((res) => {
      setData(res.data.data.listItem);
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
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="content-iphone-line">
        <h2 className="text-[22px] text-center mt-2 font-[500]">
          Danh sách sản phẩm Oppo
        </h2>
      </div>

      <div className="content-line-4">{getListProduct()}</div>
      <Footer />
    </div>
  );
}

export default Oppo;
