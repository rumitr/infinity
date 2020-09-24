import React from "react";
import PostAnalytic from "../components/PostAnalytic";
import CommentsCount from "../components/CommentsCount";
import DailyComments from "../components/DailyComments";
import { Row, Col, Select } from "antd";

const Marketeer = () => {
  return (
    <div>
      <Select
        style={{ width: "40%", marginBottom: "20px" }}
        defaultActiveFirstOption
      >
        <Select.Option key="1">User 1</Select.Option>
      </Select>
      <div>
        <Row gutter="16">
          <Col span="12">
            <PostAnalytic />
          </Col>
          <Col span="12">
            <CommentsCount />
          </Col>
        </Row>
        <Row gutter="16">
          <Col span="12">
            <DailyComments />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Marketeer;
