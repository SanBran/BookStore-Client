import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BooksTableList.module.css";
import { deleteBooksById } from "../../redux/actions/actions.js";

//import styles from "./Book.module.css";
import { StatusOnlineIcon } from "@heroicons/react/outline";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";

import icoDel from "../../assets/icons/delete.png";
import icoEdit from "../../assets/icons/edit.png";
import icoVer from "../../assets/icons/view.png";

import { getTableBooks } from "../../redux/actions/actions.js";

const ListBooks = () => {
  try {
    const dispatch = useDispatch();
    const listBooksAdm = useSelector((state) => state.tableAdminBooks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [deleteItemTitle, setDeleteItemtitle] = useState(null);
    const [message, setMessage] = useState("");

    // useEffect(() => {
    //   dispatch(getTableBooks());
    //   console.log("no esta logeado");
    // }, []);
    // console.log("listBooksAdm***", listBooksAdm);

    const openModal = (id_delete, title_delete) => {
      console.log("openModal", id_delete);
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
        }
      } catch (error) {
        console.log("Error deleting item:", error.message);
      }
    };

    return (
      <>
        <Card>
          <Link to="/admin/createBook">
            <button className={`${styles.confirmButton} ${styles.modalButton}`}>
              Add New Book
            </button>
          </Link>
        </Card>

        <div>
          <Card>
            <Table className={`mt-5 ${styles.tableContainer}`}>
              <TableHead>
                <TableRow className={styles.tableHeader}>
                  <TableHeaderCell className={styles.secondColumn}>
                    TITLE
                  </TableHeaderCell>
                  {/* <TableHeaderCell className={styles.secondColumn}>
                    AUTHOR
                  </TableHeaderCell> */}
                  <TableHeaderCell className={styles.secondColumn}>
                    GENDER
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.thirdColumn}>
                    STATUS
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.thirdColumn}>
                    Action
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody className={styles.tableBody}>
                {listBooksAdm?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <p className={`${styles.boldText}`}>{item.title}</p>
                      {item.author}
                    </TableCell>

                    <TableCell>
                      <Text>{item.gender}</Text>
                    </TableCell>
                    <TableCell>
                      <Badge color="emerald">{item.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <img
                        key={item.id}
                        src={icoDel}
                        alt="Delete"
                        onClick={() => openModal(item.id, item.title)}
                        className={styles.deleteIcon}
                      />
                      <Link to={`/detail/${item.id}`}>...</Link>
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
            <h2 className={styles.centeredText}>Delete Confirmation</h2>
            <p className={`${styles.centeredText} ${styles.blueText}`}>
              Are you sure you want to delete this Book?
            </p>
            {deleteItemTitle && (
              <p className={`${styles.centeredText} ${styles.boldText}`}>
                {deleteItemTitle}
              </p>
            )}
            {deleteItemId && (
              <p className={styles.centeredText}>with ID: {deleteItemId}</p>
            )}
            <button
              className={`${styles.confirmButton} ${styles.modalButton}`}
              onClick={confirmDelete}
            >
              Confirm
            </button>
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
