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
import { getAllPayments, getUsers, getTableBooks,getTableUsers,getBooksDeleted  } from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  useEffect(() => {
    dispatch(getAllPayments());
    dispatch(getUsers());
    dispatch(getTableBooks());
    dispatch(getTableUsers());   
    dispatch(getBooksDeleted());
 
  }, [dispatch]);

  return (
 <>
        
    <Card className="mt-1 h-screen w-screen">
    <img onClick={()=> navigate('/') } className={styles.logoCompleto} src={logo} alt="" />
      <TabGroup>
        <TabList className="mt-10">
          <Tab>General</Tab>
          <Tab>Books</Tab>
          <Tab>Users</Tab>
          <Tab>Pays</Tab>
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
