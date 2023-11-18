
import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaList } from "react-icons/fa";
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import { SiApacheairflow } from "react-icons/si";
import { GiAbstract050 } from "react-icons/gi";
import "react-pro-sidebar/dist/css/styles.css";
import './Sidebar.css'
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import ListPage from "../../pages/Admin/ListPage/ListPage";

const Sidebar = () => {
  //menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)
  //custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  }

  const [active, setActive] = useState(true)
  const [active1, setActive1] = useState(false)
  const handleOnClick = () => {
    setActive(!active);
    setActive1(!active1);
  }

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* Icon change using menucollapse state */}
              <p style={{ marginLeft: "26px" }}>{menuCollapse ? <GiAbstract050 /> : <SiApacheairflow />}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle />
              ) : (
                <FiArrowLeftCircle />
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={active} icon={<FaList />} onClick={handleOnClick}
              >Danh sách
                <Link to={'/adminlist'} element={<ListPage />} />
              </MenuItem>

              <MenuItem icon={<BarChartRoundedIcon />} active={active1} onClick={handleOnClick}
              >Thống kê
                <Link to={'/dashboard'} element={<Dashboard />} />
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Đăng xuất</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
        <section>
          <Routes>
            <Route path="adminlist" element={<ListPage />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </section>
      </div>
    </>
  );
}
export default Sidebar;