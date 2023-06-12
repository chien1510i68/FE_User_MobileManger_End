import React, { useEffect, useState } from "react";
import "./styleCart.css";
// import { Table } from 'antd';
import {
  deleteProduct,
  findPromotion,
  getProductByIds,
} from "../../../api/axios";
import {
  DeleteOutlined,
  EditOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Space,
  Table,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function FirstContent({ next }) {
  const listProduct = JSON.parse(localStorage.getItem("itemReqList"));
  // if(listProduct!=nu)
  let itemQuantity = listProduct.map((value) => value.quantity);
  let itemPrice = listProduct.map((value) => value.totalPrice);
  // let itemQuantity = [];
  const [product, setproduct] = useState([]);
  const [quantity, setQuantity] = useState(itemQuantity);
  // const [salePrice , setSalePrice] = useState(itemPrice)
  const [salePrice, setSalePrice] = useState([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [reload, setReload] = useState(0);
  const [token, setToken] = useState(false);

  const handleGetPromotion = async (promotion, productId, price, quantity) => {
    let totalValue = 0;
    await findPromotion({ id: promotion })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (price * quantity > res.data.minimumPurchaseAmount) {
            totalValue =
              price * quantity -
              (price * quantity * res.data.promotionPercentage) / 100;
          } else if (price * quantity < res.data.minimumPurchaseAmount) {
            totalValue = price * quantity;
          }
          // } else if(res.s){
          // }
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          totalValue = price * quantity;
        }
        // console.log(error);
      });

    const listItem = JSON.parse(localStorage.getItem("itemReqList"));
    const itemProduct = listItem.findIndex((i) => i.id === productId);
    let obj = listItem[itemProduct];
    obj = {
      ...obj,
      totalPrice: totalValue,
    };
    listItem[itemProduct] = obj;

    localStorage.setItem("itemReqList", JSON.stringify(listItem));

    return totalValue;
  };

  const columns = [
    {
      title: "Ảnh ",
      dataIndex: "image",
      render: (e, record, index) => {
        return (
          <>
            <img
              className="max-w-[60px] max-h-[60px]"
              src={record.image}
              alt=""
            />
          </>
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      //   align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (e, record, index) => (
        <>
          {console.log(record)}
          <InputNumber
            onChange={(value) => {
              onChangeQuantity(record.productId, value);
            }}
            min={1}
            // disabled= {true}
            // max={10}
            keyboard={true}
            defaultValue={quantity[index]}
          />
        </>
      ),
      align: "center",
    },
    {
      title: "Nhà sản xuất",
      dataIndex: "manufacturer",
      align: "center",
    },
    {
      title: "Giá sau khuyến mãi",
      dataIndex: "promotionID",
      align: "center",
      render: (e, record, index) => {
        const itemReqList = JSON.parse(localStorage.getItem("itemReqList"));
        let priceSale = 0;
        console.log("itemReqList :", itemReqList);
        itemReqList.forEach((item) => {
          if (item.id == record.productId) {
            priceSale = item.salePrice * item.quantity;
          }
        });

        console.log("priceSale : ", priceSale);
        return (
          <>
            <span>{priceSale}</span>
          </>
        );
      },
    },

    {
      title: "Xóa lựa chọn",
      align: "center",
      render: (e, record, index) => (
        <Space size={10} key={index}>
          <Popconfirm
            onConfirm={() => handleDelete(record.productId)}
            title={"Bạn có muốn xóa sản phẩm "}
            okButtonProps={<Button className="bg-[#000]">OK</Button>}
          >
            <Button
              className="flex justify-center items-center text-md shadow-md"
              icon={<DeleteOutlined />}
            ></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onChangeQuantity = (id, value) => {
    const listItem = JSON.parse(localStorage.getItem("itemReqList"));
    const itemProduct = listItem.findIndex((i) => i.id === id);
    let obj = listItem[itemProduct];
    obj.quantity = value;
    localStorage.setItem("itemReqList", JSON.stringify(listItem));

    handleGetPromotion(obj.promotion, obj.id, obj.price, value).then(
      (totalValue) => {
        const updatedSalePrice = [...salePrice];
        updatedSalePrice[itemProduct] = totalValue;
        setSalePrice(updatedSalePrice);
      }
    );
  };

  const handleGetAllProduct = () => {
    const arr = JSON.parse(localStorage.getItem("itemReqList"));
    // let itemReqList = localStorage.getItem("itemReqList");
    console.log(arr);
    const arrId = [];
    if (arr != null) {
      arr.forEach((item) => {
        arrId.push(item.id);
      });

      console.log(arrId);
      getProductByIds(arrId).then((res) => {
        console.log(res.data.data.listItem);
        setproduct(res.data.data.listItem);
      });
    } else {
    }
  };
  const handleDelete = (productId) => {
    const listProduct = JSON.parse(localStorage.getItem("itemReqList"));
    // console.log(listProduct);
    const itemProduct = listProduct.findIndex((item) => item.id === productId);
    if (itemProduct !== -1) {
      listProduct.splice(itemProduct, 1);
    }
    // console.log(listProduct);
    localStorage.setItem("itemReqList", JSON.stringify(listProduct));
    handleGetAllProduct();
  };

  useEffect(() => {
    handleGetAllProduct();
    // onChangeQuantity();
  }, [quantity]);
  useEffect(() => {
    // Cập nhật giá sau khuyến mãi ban đầu khi component được tải
    const initialSalePrices = product.map((item) => item.totalPrice);
    setSalePrice(initialSalePrices);
  }, [product]);
  useEffect(() => {
    const data = JSON.parse(Cookies.get("dataUser"));
    console.log("Du lieu nhan tu cookies: ", data);
  });

  return (
    <>
      {/* <Button onClick={onClick}>Click me</Button> */}

      <Table
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={product}
        pagination={{
          onChange: (page, size) => {
            setPageSize(size);
            setPageCurrent(page);
          },
          defaultCurrent: 1,
          pageSize: pageSize,
          current: pageCurrent,
          // showSizeChanger: true,
        }}
      />
      {product.length > 0 && (
        <Button onClick={next} className="mx-auto block">
          Tiếp theo
        </Button>
      )}
      {product.length == 0 && (
        <h2 className="text-center">
          Giỏ hàng của bạn chưa có sản phẩm nào
          <Link to={"/dien-thoai"} className="text-[#2c93c5]">
            {" "}
            quay về trang chủ
          </Link>
        </h2>
      )}
    </>
  );
}

export default FirstContent;
