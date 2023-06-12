import { CarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Button,
  Carousel,
  Image,
  notification
} from "antd";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { findProduct } from "../../api/axios";
import Footer from "../layout/layoutPage/footer";
import Header from "../layout/layoutPage/header";
import "./sanpham.css";

function DetailProduct() {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  let { id } = useParams();

  const detailProduct = () => {
    findProduct(id).then((res) => {
      setProduct(res.data);
    });
  };
  const onClick = () => {
    // if()
    // console.log(product.promotionID);
    // const salePrice =
    const obj = {
      id: product.productId,
      quantity: quantity,
      promotion: product.promotionID,
      price: product.price,
      salePrice: product.salePrice,
      // salePrice :
    };
    let itemReqList = localStorage.getItem("itemReqList");
    if (itemReqList) {
      const arr = JSON.parse(itemReqList);
      const existingItem = arr.find((item) => item.id === obj.id);

      if (existingItem) {
        // Nếu "id" đã tồn tại, tăng số lượng lên
        existingItem.quantity += obj.quantity;
      } else {
        // Nếu "id" chưa tồn tại, thêm mục mới vào mảng
        arr.push(obj);
      }
      localStorage.setItem("itemReqList", JSON.stringify(arr));
    } else {
      localStorage.setItem("itemReqList", JSON.stringify([obj]));
    }
    notification.success({ message: "Đã thêm sản phẩm vào giỏ hàng" });
    // console.log(obj);
  };

  useEffect(() => {
    detailProduct();
  }, [id]);

  console.log(product);
  return (
    <div>
      <Header />
      <div>
        <div className="reno mb-[100px] mt-[50px]">
          <div className="reno-1">
            <h3 className="text-center font-[500] text-[20px] text-zinc-900"> Sản phẩm {product["productName"]}</h3>
            <Carousel autoplay>
              <Image src={product["image"]} alt="anh-1" />
            </Carousel>
            <div className="">
              <div className="flex text-[24px] justify-center">
                <del className="mx-2 text-[#ff0000]">
                  <NumericFormat
                    value={product["salePrice"]}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                  />{" "}
                  đ
                </del>
                <del className="mx-2 ">
                  <NumericFormat
                    value={product["price"]}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                  />{" "}
                  đ
                </del>
              </div>
            </div>
          </div>
          <div>
            <h5 className="reno-2">
              Sản phẩm bán giá Hotsale với số lượng có hạn
            </h5>
            <>
              <div>
                <h2 className="font-[600] my-1">
                  RAM: {product.memoryStick}GB 
                </h2>
                <h2 className="font-[600] my-1">Camera: {product.camera}</h2>
                <h2 className="font-[600] my-1"> Màu sắc: {product.color}</h2>
                <h2 className="font-[600] my-1">
                  {" "}
                  Hãng sản xuất: {product.manufacturer}
                </h2>
                <h2 className="font-[600] my-1"> Bộ nhớ: {product.memory}</h2>
                <h2 className="font-[600] my-1">
                  {" "}
                  Hệ điều hành: {product.operatingSystem}
                </h2>
                <h2 className="font-[600] my-1">
                  {" "}
                  Thời gian bảo hành: {product.warrantyPeriod} tháng
                </h2>

                <h2></h2>
              </div>
            </>
            <putton className="reno-putton">
              <CarOutlined className="icon-reno8T" />
              MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC
            </putton>
            <h5 className="reno-3">Lựa chọn màu và xem địa chỉ còn hàng</h5>
            <div className="reno8T">
              <div className="reno-line-2"></div>
            </div>

            <div className="flex ">
              <Link
                className="bg-[#c61f1f] px-[30px] rounded-[5px] py-1 mr-5 text-[#fff]"
                to={"/gio-hang"}
                onClick={onClick}
              >
                <putton className="reno8T-putton">
                  <CarOutlined />
                  MUA NGAY
                </putton>
                <h5>Giao tận nhà (COD)</h5>
              </Link>
              {/* <div className='reno-putton-2'> */}

              <Button
                type="primary"
                onClick={onClick}
                className="py-auto h-[56px]  px-[30px] grid  bg-[#333]"
              >
                <ShoppingCartOutlined className="text-[20px]" />
                Thêm vào giỏ hàng
              </Button>

              {/* </div> */}
            </div>
          </div>
        </div>
       
      </div>
      <Footer />
    </div>
  );
}

export default DetailProduct;
