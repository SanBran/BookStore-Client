import React, { useEffect } from 'react';
import TabListGeneral from './TabList/TabListGeneral';
import BooksTableList from '../../Components/BooksTableList/BooksTableList'
import UsersTableList from '../../Components/UsersTableList/UsersTableList'

import {
  Card,
  Metric,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from "@tremor/react";
import { useDispatch } from 'react-redux';
import {getAllPayments, getUsers ,getTableBooks,getTableUsers}  from "../../redux/actions/actions.js";
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllPayments());
    dispatch(getUsers());
    dispatch(getTableBooks());
    dispatch(getTableUsers());   
 
  }, [dispatch]);

  return (
 <>
        
    <Card className="mt-1 h-screen w-screen">
    <img onClick={()=> navigate('/') } className={styles.logoCompleto} src={logo} alt="" />
      <TabGroup>
        <TabList className="mt-10">
          <Tab>General</Tab>
          <Tab>Libros</Tab>
          <Tab>Usuarios</Tab>
          <Tab>Pagos</Tab>
        </TabList>
        <TabPanels>
          <TabListGeneral />
          <TabPanel>
            <div className="mt-8">
              <button className='p-2 bg-orange-400 cursor-pointer rounded-md' onClick={()=> {navigate('/admin/createBook')}} >Upload new book</button>
              <h1>libros</h1>
              <BooksTableList />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-8">
              <h1>usuarios</h1>
              <UsersTableList />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-8">
              <h1>usuarios</h1>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
    </>
  )
}

export default AdminDashboard