import React, { useEffect } from "react";
import {
  Dropdown,
  Input,
  Select,
  message,
  notification,
  Space,
  Menu,
} from "antd";
import {
  CarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { useState } from "react";
// import { getProduct } from "";
import { getProduct } from "../../../api/axios";
import Cookies from "js-cookie";
import { DownOutlined } from "@ant-design/icons";
import "./header.css";
function Header(props) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const [condition, setCondition] = useState({
    page: 0,
    size: 20,
  });

  const [item, setItem] = useState([]);
  const [userName, setUserName] = useState("Đăng nhập");

  const clearJWT = () => {
    const jwt = JSON.parse(Cookies.get("dataUser")).data.jwt;
    console.log("Ma token hien tai la : ", jwt);
    //  setUserName("Login")
    setUserName("Đăng nhập");
    console.log("username : ", userName);
    if (jwt) {
      // Cookies.set("jwt", JSON.stringify(""));
      // Cookies.remove("jwt");
      Cookies.set("dataUser", JSON.stringify(""));

      notification.success({
        message: "Tài khoản đã được đăng xuất khỏi trái đất",
      });
      setUserName("");
    } else {
      message.info("Không có mã JWT");
    }
  };

  useEffect(() => {
    const a = JSON.parse(Cookies.get("dataUser"));
    if (a) {
      setUserName(a.data.username);
    }
  }, []);

  useEffect(() => {
    getProduct({
      page: 0,
      size: 20,
      productName: searchValue,
    })
      .then((res) => {
        if (res.data.success) {
          setSearchResults(res.data.data.listItem);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchValue]);

  const handleSearch = (value) => {
    const results = searchResults.filter((result) =>
      result.productName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredResults(results);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setSearchValue("");
      setFilteredResults([]);
    }
  };

  const menu = (
    <Menu className="h-[100px] overflow-y-auto">
      {filteredResults.map((result, index) => (
        <Menu.Item key={index}>
          <Link to={`/prod/${result.productId}`}>{result.productName}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  const items = [
    {
      label: <Link to={"/login"}>Đăng nhập</Link>,
      key: "0",
    },
    {
      label: (
        <Link to={"/login"} onClick={() => clearJWT()}>
          Đăng xuất
        </Link>
      ),
      key: "1",
    },
  ];

  return (
    <div className="header">
      <div className="header-line">
        <h3 className="header-text-one">
          Chào mừng đến với thế giới smartphone với muôn ngàn ưu đãi
        </h3>
      </div>
      <div className="header-line-1 justify-around">
        <div className="logo">
          <Link to={"/"}>
            <img
              src="https://scontent.xx.fbcdn.net/v/t1.15752-9/344287970_1865581070472074_2327929001103548366_n.png?stp=dst-png_p206x206&_nc_cat=107&ccb=1-7&_nc_sid=aee45a&_nc_ohc=13sgCU1zkEcAX_EXbYo&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQxR6rHOFlTCYj1H-xNpugz6pBfeVoBEJOD8scV5pw-BQ&oe=647C9A4F"
              alt="Logo"
              className="Lo-go"
            />
          </Link>
        </div>
        <h2 className="header-text">Smart</h2>
        <h2 className="header-text-1">phone</h2>

        <div className="w-[35%] ml-3">
          <Dropdown overlay={menu} trigger={["click"]} className="">
            <Input
              placeholder="Nhập từ khóa tìm kiếm"
              value={searchValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </Dropdown>
        </div>

        <Link to={"/kiem-tra-don-hang"}>
          <putton className={"putton-one"}>
            <CarOutlined className={"icon"} />
            Kiểm tra đơn hàng
          </putton>
        </Link>
        <Link to={"/gio-hang"}>
          <ShoppingCartOutlined className="icon-1 mr-2 block" />
        </Link>
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <div className="relative grid">
                <Link to={"/login"}></Link>
                <UserOutlined className="icon-2 absolute top-[-15px] left-[-50%] translate-x-[50%]" />
                <h2 className="text-center pt-4">{userName}</h2>
              </div>
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className="header-menu">
        <Link to="/dien-thoai">
          <h3 className="text-header" activeHeading>
            ĐIỆN THOẠI
          </h3>
        </Link>
        <Link to="/iphone">
          <h3 className="text-header" activeHeading>
            IPHONE
          </h3>
        </Link>
        <Link to="/sam-sung">
          <h3 className="text-header" activeHeading>
            SAMSUNG
          </h3>
        </Link>
        <Link to="/oppo">
          <h3 className="text-header" activeHeading>
            OPPO
          </h3>
        </Link>
        <Link to="/realme">
          <h3 className="text-header" activeHeading>
            REALME
          </h3>
        </Link>
        <Link to="/redmi">
          <h3 className="text-header" activeHeading>
            REDMI
          </h3>
        </Link>
      </div>
    </div>
  );
}

export default Header;
