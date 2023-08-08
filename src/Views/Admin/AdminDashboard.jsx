import React, { useEffect } from 'react';
import styles from './AdminDashboard.module.css'
import TabListGeneral from './TabList/TabListGeneral';
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
import { getAllPayments, getUsers } from '../../redux/actions/actions';

function AdminDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPayments());
    dispatch(getUsers());
 
  }, [dispatch]);

  return (
 <>
    <div >Dashboard</div>
    <Card>
      <TabGroup>
        <TabList className="mt-10">
          <Tab>General</Tab>
          <Tab>Libros</Tab>
          <Tab>Usuarios</Tab>
        </TabList>
        <TabPanels>
          <TabListGeneral />
           
          <TabPanel>
            <div className="mt-8">
              <h1>libros</h1>
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