import React, { useState, useEffect } from "react";
import { Input, Dropdown, Menu } from "antd";
import { getProduct } from "../api/axios";
import { Link } from "react-router-dom";

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  let menuHeight = 0;
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
    menuHeight = filteredResults > 0 ? "000px" : "0px";
  }, [searchValue, filteredResults]);

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

  const menuStyle = {
    height: "100px",
    overflowY: "auto",
  };
  const menu = (
    <Menu style={menuStyle}>
      {filteredResults.map((result, index) => (
        <Link to={`/prod/${result.productId}`}>
          <Menu.Item key={index}>{result.productName}</Menu.Item>
        </Link>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} className="" trigger={["click"]}>
      <Input
        placeholder="Nhập từ khóa tìm kiếm"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </Dropdown>
  );
};

export default SearchComponent;
