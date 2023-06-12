import { Button, Checkbox, Form, Input, Mentions, Radio } from "antd";
import React, { useState } from "react";
import "./styleCart.css";
import TextArea from "antd/es/input/TextArea";

function SecondContent({ prev, next }) {
  const [value, setValue] = useState(null);
  const onFinish = (values) => {
    setValue(values);
    localStorage.setItem("informationCustomer", JSON.stringify(values));
    
    next();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="second-content">
      <h4 className="second-text">
        Bạn cần nhập đầy đủ các trường thông tin có dấu *
      </h4>

      {/*  */}

      <Form
        name="basic"
        className="mx-[200px] block mt-[100px] w-[80%]"
        layout="vertical"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        // initialValues={}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="block "
          label="Họ tên khách hàng "
          name="name"
          // rules={[{ required: true, message: "Please input your nameCustom!" }]}
        >
          <Input className=" w-[100%] py-2 my-[5px]" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          // rules={[
            // { required: true, message: "Please input your phone number!" },
          // ]}
        >
          <Input className=" w-[100%] py-2 my-[5px]" />
        </Form.Item>

        {/* <Form.Item
          label="Email"
          name="email"
          // rules={[{ required: true, message: "Please input your address!" }]}
        > */}
          {/* <Input className=" w-[100%] py-2 my-[5px]" />
        </Form.Item> */}
        <Form.Item
          label="Địa chỉ nhận hàng"
          name="addr"
          // rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input className=" w-[100%] py-2 my-[5px]" />
        </Form.Item>

        <Form.Item
          label="Ghi chú"
          name="note"
          rules={[
            { required: false, message: "Please input your memoryStick!" },
          ]}
        >
          <TextArea rows={4} placeholder="" maxLength={366} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
          <Button
            type="primary"
            // htmlType="submit"
            className="bg-[#d95050] ml-[20px]"
            onClick={prev}
          >
            Quay lại
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#348f43] ml-[20px]"
          >
            Tiếp tục
          </Button>
        </Form.Item>
      </Form>
      {/* <div className="second-line">
        <h5>Hình thức nhận hàng</h5>
        <div className="second-line-2">
          <putton className="second-putton">
            <Radio>Nhận hàng tại nhà</Radio>
          </putton>
          <putton className="second-putton">
            <Radio>Nhận hàng tại cửa hàng</Radio>
          </putton>
        </div>
        
        <Checkbox>
          Yêu cầu xuất hoá đơn (Vui lòng điền email để nhận hoá đơn VAT)
        </Checkbox>
      </div> */}
    </div>
  );
}

export default SecondContent;
