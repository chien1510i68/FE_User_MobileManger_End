import React, { useEffect, useState } from "react";
import "./styleCart.css";
import { Button, message, notification } from "antd";
import { createOrder, getProductByIds } from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function LastContent({ prev, next }) {
  const [totalValue, setTotalValue] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [payValue, setPayValue] = useState(0);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const createOrderA = () => {
    const itemReqList = JSON.parse(localStorage.getItem("itemReqList"));
    console.log("itemReqList : ", itemReqList);
    const informationCustomer = JSON.parse(
      localStorage.getItem("informationCustomer")
    );
    const email = JSON.parse(Cookies.get("dataUser")).data.email;
    console.log(itemReqList, informationCustomer);
    const data = {
      ...informationCustomer,
      statusId: 1,
      quantity: 1,
      itemReqList,
      email: email,
    };
    console.log(data);
    createOrder(data).then((res) => {
      console.log("Du lieu tra ve la ", res.data);
      // console.log(res.data.data.orderId);
      if (res.data.success === true) {
        navigate("/dien-thoai");
        notification.success({ message: "Bạn đã đặt hàng thành công" });
        localStorage.setItem("itemReqList", JSON.stringify([]));
        localStorage.setItem("OrderId", JSON.stringify(res.data.data.orderId));
      } else if (res.data.success === false) {
        // navigate("/dien-thoai");
        notification.error({ message: "Không thể tạo được đơn hàng" });
        console.log("Danh sach loi la : ", res.data.error.detailErrorList);
        res.data.error.detailErrorList.forEach((element) => {
          notification.error({message : element.message});
        });
      } else {
        res.data.error.detailErrorList.forEach((element) => {
          message.info(element.message);
        });
      }

      // message.info(res.data.error.detailErrorList.message)
      console.log(res.data);
    });
  };

  const handleGetAllProduct = () => {
    const arr = JSON.parse(localStorage.getItem("itemReqList"));

    const arrId = [];
    if (arr != null) {
      arr.forEach((item) => {
        arrId.push(item.id);
      });

      // console.log(arrId);
      getProductByIds(arrId).then((res) => {
        // console.log(res.data.data.listItem);
        setProduct(res.data.data.listItem);
        product.map((i) => console.log(i.promotionID));
        console.log(product);
      });
    }
    handlePrice();
  };
  const handlePrice = () => {
    const listItem = JSON.parse(localStorage.getItem("itemReqList"));
    console.log(listItem);
    let total = 0;
    let sale = 0;
    let pay = 0;
    listItem.map((item) => {
      total += item.quantity * item.price;
      sale += item.salePrice * item.quantity;
      pay = total - sale;
      // setTotalValue(item.quantity * item.price + totalValue);
      // console.log(totalValue);
    });

    console.log(sale);
    console.log(total);
    setSalePrice(sale);
    setTotalValue(total);
    setPayValue(pay);
  };

  useEffect(() => {
    handleGetAllProduct();
  }, []);
  return (
    <>
      {/* <Button onClick={handleTest}>Click me</Button> */}
      <div className="last-content">
        <h3>Tổng giá trị : {totalValue} </h3>
        <h3>Giảm giá : {salePrice} </h3>
        <h3>Tổng thanh toán : {totalValue - salePrice} </h3>
        <h5>
          Khi click vào thanh toán có nghĩa là bạn đã đồng ý với chính sách thoả
          thuận và bảo mật{" "}
        </h5>
      </div>
      <div className="justify-center flex mt-[100px]">
        <Button onClick={prev} className="mx-[30px]">
          Quay lại
        </Button>
        <Button onClick={createOrderA} className="">
          Xác nhận
        </Button>
      </div>
    </>
  );
}

export default LastContent;
