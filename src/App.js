import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import Marketeer from "./pages/Marketeer";
import Admin from "./pages/Admin";
import "antd/dist/antd.css";
import "./App.css";

export default function App() {
  const { Header, Content, Footer } = Layout;
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/marketeer">Marketeer</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/admin">Admin</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Switch>
            <Route path="/marketeer">
              <Marketeer />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Interview for InfinityCube
        </Footer>
      </Layout>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
