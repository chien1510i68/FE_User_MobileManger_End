import React, { useEffect, useState } from "react";
import { Button, Input, Table, message } from "antd";
import Header from "../../components/layout/layoutPage/header";
import Footer from "../../components/layout/layoutPage/footer";
import Cookies from "js-cookie";
import { getOrderByEmail } from "../../api/axios";
import { Link } from "react-router-dom";

function KiemTraDonHang() {
  const [listOrder, setListOrder] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  
  const handleGetInfor = () => {
    const dataUser = JSON.parse(Cookies.get("dataUser"));
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (!jwt) {
      setIsLogin(false);
      console.log("Khong co ma token");
    } else {
      setIsLogin(true);
    }
    // console.log(dataUser.data.email);
    getOrderByEmail({ email: dataUser.data.email }).then((res) => {
      // console.log( res.data.data.listItem );
      setListOrder(res.data.data.listItem);
    });
    console.log(listOrder);
  };
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      //   align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      //   align: "center",
    },
    {
      title: "Tổng thanh toán",
      dataIndex: "totalValueOrder",
      align: "center",
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",

      align: "center",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderCreationDate",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "statusId",
      render: (statusId) => {
        if (statusId == 1) {
          return "Đang xử lí";
        }
        if (statusId == 2) {
          return "Đã xác nhận";
        }
        if (statusId == 3) {
          return "Đang giao";
        }
        if (statusId == 4) {
          return "Đã giao";
        }
        if (statusId == 5) {
          return "Đã hủy";
        }
        if (statusId == 6) {
          return "Đã thanh toán";
        }
        if (statusId == 7) {
          return "Đã hoàn trả";
        }
      },
    },
  ];
  useEffect(() => {
    handleGetInfor();
  }, []);
  return (
    <>
      {isLogin == true && (
        <div>
          <Header />
          {/* <Button onClick={handleGetInfor}>Click me</Button> */}
          <div className="kiem-tra-don-hang">
            <h2 className="my-[50px] text-[28px] text-center">
              Danh sách đơn hàng của bạn
            </h2>

            <Table
              // rowSelection={rowSelection}
              className="mx-[40px]"
              columns={columns}
              dataSource={listOrder}
              pagination={{
                defaultCurrent: 1,

                // showSizeChanger: true,
              }}
            />
          </div>
          <Footer />
        </div>
      )}
      {isLogin == false && (
        <>
          <Header />
          <h2 className="text-center">
            Bạn cần
            <Link to={"/login"} className="text-[#00c6ed]"> đăng nhập </Link>
            trước khi kiểm tra đơn hàng
          </h2>
          <Footer />
        </>
      )}
    </>
  );
}

export default KiemTraDonHang;
