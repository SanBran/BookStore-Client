import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UsersTableList.module.css";
import { deleteUserById } from "../../redux/actions/actions.js";


//import styles from "./Book.module.css";
import { StatusOnlineIcon } from "@heroicons/react/outline";
import {
  Card,
  Button,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Metric,
  Subtitle,
  Bold,
  Italic,
} from "@tremor/react";

import icoDel from "../../assets/icons/bin_icon.svg";
import icoEdit from "../../assets/icons/edit2_icon.svg";

import { getTableUsers,restoreUserById  ,getUsersDeleted } from "../../redux/actions/actions.js";

const Listusers = () => {
    try {
        const dispatch = useDispatch();
        const listUsersAdm = useSelector((state) => state.tableAdminUsers.findusers);
        const listUsersAdmTotal = useSelector((state) => state.tableAdminUsers.totalUsers);
        const listUsersDeleted = useSelector((state) => state.tableUsersDeleted);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [deleteItemId, setDeleteItemId] = useState(null);
        const [deleteItemTitle, setDeleteItemtitle] = useState(null);
        const [message, setMessage] = useState("");
        const [open, setOpen] = useState(false)
        const [idModal, setidModal] = useState(null);
        const [messageText, setMessageText] = useState("");
        const [activeTab, setActiveTab] = useState("activos");
      console.log("listUsersDeleted",listUsersDeleted);
        const handleTabChange = (tab) => {
          setActiveTab(tab);
        };
        const filteredList =
          activeTab === "activos"
            ? listUsersAdm?.filter((item) => !item.deletedAt)
            : listUsersDeleted?.filter((item) => item.deletedAt);

            const openModal = (id_delete, title_delete, modalId) => {
              console.log("openModal", id_delete);
              if(modalId === "1"){
                setMessageText("Are you sure you want to delete this User?")
              }else{
                setMessageText("Are you sure you want to Restore this User?")
              }
              setidModal(modalId);
              setDeleteItemId(id_delete);
              setDeleteItemtitle(title_delete);
              setIsModalOpen(true);
            };
        
            const closeModal = () => {
              console.log("Cerrar -Modal");
              setIsModalOpen(false);
            };
        
            const confirmDelete = async () => {
              try {
                if (deleteItemId) {
                  // Llama a la acción deleteBooksById con el ID del elemento a eliminar
                  const deleteItem = await dispatch(deleteUserById(deleteItemId));
                  console.log("deleteItem", deleteItem);
                  // Aquí puedes realizar cualquier acción adicional después de la eliminación
                  setMessage(deleteItem);
                  setIsModalOpen(false);
                  dispatch(getTableUsers());
                  dispatch(getUsersDeleted());
                }
              } catch (error) {
                console.log("Error deleting item:", error.message);
              }
            };
        
            const confirmRestore = async () =>{
              try {
                if (deleteItemId) {
                  // Llama a la acción deleteBooksById con el ID del elemento a eliminar
                  const deleteItem = await dispatch(restoreUserById(deleteItemId));
                  console.log("confirmRestore", deleteItem);
                  // Aquí puedes realizar cualquier acción adicional después de la eliminación
                  setMessage(deleteItem);
                  setIsModalOpen(false);
                  dispatch(getTableUsers());
                  dispatch(getUsersDeleted());
                }
              } catch (error) {
                console.log("Error restore item:", error.message);
              }
            }
        
            function formatDate(dateString) {
              const options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              };
        
              const formattedDate = new Date(dateString).toLocaleString(
                "en-US",
                options
              );
              return formattedDate;
            }
        return (
            <>
          
        <div>
          <Card>
            <div className={styles.tabs}>
            <div
                  className={`${styles.tab} ${
                    activeTab === "activos" && styles.activeTab
                  }`}
                  onClick={() => handleTabChange("activos")}
                >
                  Activos
                </div>
                <div
                  className={`${styles.tab} ${
                    activeTab === "borrados" && styles.activeTab
                  }`}
                  onClick={() => handleTabChange("borrados")}
                >
                  Borrados
                </div>
            </div>

            <Table className={`mt-5 ${styles.tableContainer}`}>
              <TableHead>
                <TableRow
                  className={
                    activeTab === "activos"
                      ? styles.tableHeader
                      : styles.tableHeaderDeleted
                  }
                >
                  <TableHeaderCell className={styles.secondColumn}>
                    <Text color="white"> USER</Text>
                  </TableHeaderCell>
                  <TableHeaderCell>
                    <Text color="white"> EMAIL</Text>
                  </TableHeaderCell>
                  <TableHeaderCell>
                    <Text color="white"> STATUS</Text>
                  </TableHeaderCell>
                  <TableHeaderCell>
                    <Text color="white"> ACTIONS</Text>
                  </TableHeaderCell>
                  <TableHeaderCell>
                    <Text color="white"> EVENTS</Text>
                  </TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody className={styles.tableBody}>
                {filteredList?.map((item) => (
                  // Renderizar cada fila de acuerdo a la pestaña activa
                  <TableRow className={styles.tableRow} key={item.id}>
                    <TableCell className={styles.TableCell}>
                      <p className={`${styles.boldText}`}>{item.name}</p>
                      
                    </TableCell>
                    <TableCell className={styles.TableCell}>
                      <Text>{item.email}</Text>
                    </TableCell>
                    <TableCell className={styles.TableCell}>
                      {item.deletedAt === null ? (
                        <span
                          className={`${styles.statusBadge} ${styles.activeStatus}`}
                        >
                          Active
                        </span>
                      ) : (
                        <span
                          className={`${styles.statusBadge} ${styles.deletedStatus}`}
                        >
                          Blocked
                        </span>
                      )}
                    </TableCell>
                    <TableCell className={styles.TableCell}>
                      {/* <p>
                        <Link to={`/detail/${item.id}`}>
                          <img
                            key={item.id}
                            src={icoVer}
                            alt="ver"
                            onClick={() => openModal(item.id, item.title)}
                            className={styles.icon}
                            text="Ver"
                          />{" "}
                          Ver{" "}
                        </Link>
                      </p> */}
                      <p>
                        {activeTab === "activos" ? (
                          <>
                            <img
                              key={item.id}
                              src={icoDel}
                              alt="Delete"
                              onClick={() => openModal(item.id, item.name,"1")}
                              className={styles.icon}
                            />
                            Delete
                          </>
                        ) : (
                          <>
                            <img
                              key={item.id}
                              src={icoEdit}
                              alt="Restaurar"
                              onClick={() => openModal(item.id, item.name ,"2")}
                              className={styles.icon}
                            />
                            Restaurar
                          </>
                        )}
                      </p>
                    </TableCell>
                    <TableCell className={styles.TableCell}>
                      <Text>
                        {" "}
                        <Bold>Creado</Bold>
                        <Italic> {formatDate(item.createdAt)}</Italic>
                      </Text>
                      <Text>
                        {item.deletedAt && (
                          <>
                            <span className={styles.bold}>
                              <Bold>eliminado</Bold>
                            </span>
                            <span className={styles.italic}>
                              {formatDate(item.deletedAt)}
                            </span>
                          </>
                        )}
                      </Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* //////////////////////////////////////////////////////////////// */}
        <div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay}
          >
            <h2 className={styles.centeredText}>.::Confirmation::.</h2>
            <p className={`${styles.centeredText} ${styles.blueText}`}>
              {messageText}
            </p>
            {deleteItemTitle && (
              <p className={`${styles.centeredText} ${styles.boldText}`}>
                {deleteItemTitle}
              </p>
            )}
            {deleteItemId && (
              <p className={styles.centeredText}>with ID: {deleteItemId}</p>
            )}
            <div className={styles.buttonsContainer}>

            {idModal === "1" ? (
                <button
                  className={`${styles.confirmButton} ${styles.modalButton}`}
                  onClick={confirmDelete}
                >
                  Confirm
                </button>
              ) : (
                <button
                  className={`${styles.confirmButton} ${styles.modalButton}`}
                  onClick={confirmRestore}
                >
                  Confirm
                </button>
              )}
              <button
                className={`${styles.cancelButton} ${styles.modalButton}`}
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </Modal>
        </div>
      </>
    );
  } catch (error) {
    console.log("error-->", error.message);
  }
};
export default Listusers;