import React, { useState } from "react";
import { Row, Col, Tabs, Divider, Checkbox, Form, Select, Button } from "antd";
import "./Admin.css";
import IngestionForm from "../components/IngestionForm";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

function onChange(checkedValues) {
  console.log("checked = ", checkedValues);
}
const options = [
  { label: "FaceBook", value: "facebook" },
  { label: "Twitter", value: "twitter" },
  { label: "YouTube", value: "youtube" },
  { label: "Reddit", value: "reddit" },
];

const Admin = () => {
  const [form] = Form.useForm();
  const [showProceedButton, setShowProceedButton] = useState(false);
  const [showSecondaryStep, setShowSecondaryStep] = useState(false);
  const [showTertiaryStep, setShowTertiaryStep] = useState(false);
  const [sources, setSources] = useState([]);

  const onSelectSource = (checkedValues) => {
    setSources(checkedValues);
    console.log(showProceedButton);
    if (checkedValues.length) {
      if (showProceedButton === false) {
        setShowProceedButton(true);
      } else {
        setShowSecondaryStep(false);
        setShowTertiaryStep(false);
      }
    } else {
      setShowProceedButton(false);
    }
  };
  const setupForm = () => {
    setShowSecondaryStep(true);
    sources.forEach((source) => {
      if (source == "youtube") {
        form.setFieldsValue({ youtubePage: "TylerMcginnis" });
      } else {
        form.setFieldsValue({
          [`${source}Username`]: ["Unicef", "AlpuraCheese"],
        });
      }
    });
  };

  return (
    <Tabs className="primary-tab" defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Manage Sources" key="1">
        <Row gutter="16">
          <Col span="8">
            <h4>Select Sources</h4>
            <Divider />
            <Checkbox.Group options={options} onChange={onSelectSource} />
            {showProceedButton && <Button onClick={setupForm}>Proceed</Button>}
          </Col>
          <Col span="12">
            {showSecondaryStep && (
              <>
                <h4>Configure Sources</h4>
                <Divider />
                <Form form={form} onFinish={() => setShowTertiaryStep(true)}>
                  <Tabs
                    className="secondary-tab"
                    defaultActiveKey="1"
                    onChange={callback}
                    tabPosition="bottom"
                  >
                    {sources.length &&
                      sources.map((source) => (
                        <TabPane tab={source} key={source}>
                          {source} <br />
                          <IngestionForm type={source} />
                          <Form.Item style={{ float: "left" }}>
                            <Button type="primary" htmlType="submit">
                              Proceed For Ingestion
                            </Button>
                          </Form.Item>
                        </TabPane>
                      ))}
                  </Tabs>
                </Form>
              </>
            )}
          </Col>
          <Col span="4" style={{ display: "flex", alignItems: "center" }}>
            {showTertiaryStep && (
              <Button type="primary" htmlType="submit">
                Start Ingestion
              </Button>
            )}
          </Col>
        </Row>
      </TabPane>
      <TabPane tab="Manage Team" key="2">
        Empty
      </TabPane>
    </Tabs>
  );
};

export default Admin;
