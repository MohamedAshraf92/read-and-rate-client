import React from "react";
import Tabs from "antd/lib/tabs";
import MainNavbar from "../../components/mainNavbar/mainNavbar";
import AdminCategories from "../../components/adminCategories/adminCategories";

import "./adminPanel.css";

const AdminPanel = () => {
  const { TabPane } = Tabs;

  return (
    <div>
      <MainNavbar />
      <div className="main-container">
        <div className="admin-panel">
          <h1 className="component-title">Admin Control Panel</h1>
          <Tabs type="card">
            <TabPane tab="Categories" key="3">
              <AdminCategories />
            </TabPane>
            <TabPane tab="Authors" key="2">
              Authors Componant
            </TabPane>
            <TabPane tab="Books" key="1">
              Books Componant
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
