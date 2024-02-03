import React, { useEffect,useState } from 'react';
import TabListGeneral from './TabList/TabListGeneral';
import BooksTableList from '../../Components/BooksTableList/BooksTableList'
import UsersTableList from '../../Components/UsersTableList/UsersTableList'
import CreateBook from '../../Components/CreateBook/CreateBook';
import styles from './AdminDashboar.module.css'
import logo from '../../sources/logoCompleto.png'
import {
  Card,
 
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,

} from "@tremor/react";
import { useDispatch } from 'react-redux';
import { getAllPayments, getUsers, getTableBooks,getTableUsers,getBooksDeleted,getUsersDeleted  } from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("general");
    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };

  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  useEffect(() => {
    dispatch(getAllPayments());
    dispatch(getUsers());
    dispatch(getTableBooks());
    dispatch(getTableUsers());   
    dispatch(getBooksDeleted());
    dispatch(getUsersDeleted());
 
  }, [dispatch]);

  return (
 <>
        
    <Card className="mt-1 h-screen w-screen">
      <TabGroup>
        <TabList className={`mt-10 ${styles.tabsContainer}`}>
    <img onClick={()=> navigate('/') } className={styles.logoCompleto} src={logo} alt="" />
          <Tab 
          className={`${ activeTab === "general" ? styles.activeTab : styles.tab}`}
          onClick={() => handleTabChange("general")}
          >General</Tab>
          <Tab
          className={`${ activeTab === "books" ? styles.activeTab : styles.tab}`}
          onClick={() => handleTabChange("books")}          
          >Books</Tab>
          <Tab
          className={`${ activeTab === "users" ? styles.activeTab : styles.tab}`}
          onClick={() => handleTabChange("users")}
          >Users</Tab>
        </TabList>
        <TabPanels>
          <TabListGeneral />
          <TabPanel>
            <div className="mt-8">
              <BooksTableList />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-8">
              <UsersTableList />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-8">
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
    </>
  );
}

export default AdminDashboard;
