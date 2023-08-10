import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BooksTableList.module.css";
import { deleteBooksById,restoreUserById } from "../../redux/actions/actions.js";
import CreateBook from "../CreateBook/CreateBook";
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

import icoDel from "../../assets/icons/delete.png";
import icoEdit from "../../assets/icons/edit.png";
import icoVer from "../../assets/icons/view.png";

import { getTableBooks, getBooksDeleted } from "../../redux/actions/actions.js";

const ListBooks = () => {
  try {
    const dispatch = useDispatch();
    const listBooksAdm = useSelector((state) => state.tableAdminBooks);
    const listBooksDeleted = useSelector((state) => state.tableBooksDeleted);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [deleteItemTitle, setDeleteItemtitle] = useState(null);
    const [message, setMessage] = useState("");

    const [idModal, setidModal] = useState(null);
    const [messageText, setMessageText] = useState("");
    const [activeTab, setActiveTab] = useState("activos");

    const [open, setOpen] = useState(false)
      const handleClose = () => {
        setOpen(false)
      }


    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
    const filteredList =
      activeTab === "activos"
        ? listBooksAdm?.filter((item) => !item.deletedAt)
        : listBooksDeleted?.filter((item) => item.deletedAt);

    const openModal = (id_delete, title_delete, modalId) => {
      console.log("openModal", id_delete);
      if(modalId === "1"){
        setMessageText("Are you sure you want to delete this Book?")
      }else{
        setMessageText("Are you sure you want to Restore this Book?")
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
          const deleteItem = await dispatch(deleteBooksById(deleteItemId));
          console.log("deleteItem", deleteItem);
          // Aquí puedes realizar cualquier acción adicional después de la eliminación
          setMessage(deleteItem);
          setIsModalOpen(false);
          dispatch(getTableBooks());
          dispatch(getBooksDeleted());
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
          dispatch(getTableBooks());
          dispatch(getBooksDeleted());
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

      <CreateBook open={open} setOpen={setOpen}/>
        <Card>
          
            <button onClick={() => setOpen(true)} className={`${styles.confirmButton} ${styles.modalButton}`}>
              Add New Book
            </button>
          
        </Card>
        <div>
          <Card>
            <div className={styles.tabs}>
              <Button size="lg" color="emerald">
                <div
                  className={`${styles.tab} ${
                    activeTab === "activos" && styles.activeTab
                  }`}
                  onClick={() => handleTabChange("activos")}
                >
                  Activos
                </div>
              </Button>{" "}
              &nbsp; &nbsp; &nbsp; &nbsp;
              <Button size="lg" color="red">
                <div
                  className={`${styles.tab} ${
                    activeTab === "borrados" && styles.activeTab
                  }`}
                  onClick={() => handleTabChange("borrados")}
                >
                  Borrados{" "}
                </div>
              </Button>
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
                    <Text color="white"> TITLE</Text>
                  </TableHeaderCell>
                  <TableHeaderCell>
                    <Text color="white"> GENDER</Text>
                  </TableHeaderCell>
                  <TableHeaderCell>
                    <Text color="white"> STATUS</Text>
                  </TableHeaderCell>
                  <TableHeaderCell>
                    <Text color="white"> Action</Text>
                  </TableHeaderCell>
                  <TableHeaderCell>
                    <Text color="white"> Events</Text>
                  </TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody className={styles.tableBody}>
                {filteredList?.map((item) => (
                  // Renderizar cada fila de acuerdo a la pestaña activa
                  <TableRow key={item.id}>
                    <TableCell>
                      <p className={`${styles.boldText}`}>{item.title}</p>
                      {item.author && (
                        <ul>
                          {item.author.split(",").map((author, index) => (
                            <li key={index}>{author.trim()}</li>
                          ))}
                        </ul>
                      )}
                    </TableCell>
                    <TableCell>
                      <Text>{item.gender}</Text>
                    </TableCell>
                    <TableCell>
                      {item.status ? (
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
                    <TableCell>
                      <p>
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
                      </p>
                      <p>
                        {activeTab === "activos" ? (
                          <>
                            <img
                              key={item.id}
                              src={icoDel}
                              alt="Delete"
                              onClick={() => openModal(item.id, item.title,"1")}
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
                              onClick={() => openModal(item.id, item.title ,"2")}
                              className={styles.icon}
                            />
                            Restaurar
                          </>
                        )}
                      </p>
                    </TableCell>
                    <TableCell>
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
          </Modal>
        </div>
      </>
    );
  } catch (error) {
    console.log("error-->", error.message);
  }
};

export default ListBooks;
