import React from "react";
import { Select, Form, Input } from "antd";

const IngestionForm = ({ type }) => {
  if (type != "youtube")
    return (
      <Form.Item
        label="Username"
        name={`${type}Username`}
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
        >
          <Select.Option key="Unicef">Unicef</Select.Option>
          <Select.Option key="AlpuraCheese">AlpuraCheese</Select.Option>
        </Select>
      </Form.Item>
    );
  else
    return (
      <Form.Item
        label="Page"
        name={`${type}Page`}
        rules={[{ required: true, message: "Please input Page Name" }]}
      >
        <Input />
      </Form.Item>
    );
};

export default IngestionForm;
