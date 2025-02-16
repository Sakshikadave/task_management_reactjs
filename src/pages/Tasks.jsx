import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios, { AxiosError } from "axios";
import {  useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const initialValues = {
  taskName: "",
  description: "",
  dueDate: "",
};

const swalalert = withReactContent(Swal);

const Tasks = ({ role }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setIsEditMode(false);
    setSelectedData(null);
    formik.setValues(initialValues);
    setShow(true);
  };

  const handleShowEdit = (data) => {
    setSelectedData(data);
    setIsEditMode(true);
    setShow(true);
  };

  useEffect(() => {
    getData();
    if (isEditMode && selectedData) {
      formik.setValues({
        taskName: selectedData.taskName,
        description: selectedData.description,
        dueDate: selectedData.dueDate,
      });
    }
  }, [isEditMode, selectedData]);

  // Get
  const getData = () => {
    axios
      .get("http://localhost:3001/tasks", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log("api response", response.data);
        if (response.status === 200 || response.status === 201) {
          setData(response.data);
        }
      })
      .catch(function (error) {
        if (error instanceof AxiosError && error.response?.data?.message)
          toast.error(error.response.data.message);
        else if (error.response?.data?.error) {
          toast.error(error.response.data.error);
        } else toast.error("Failed to connect to server");
      });
  };

  // Delete
  const deleteTalk = (data) => {
    swalalert
      .fire({
        title: "Delete Confirmation!",
        text: `Are You Sure That You Want To Delete ${data.title} ?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        buttonsStyling: true,
      })
      .then(function (swalObject) {
        if (swalObject.isConfirmed) {
          axios
            .delete(`http://localhost:3001/tasks/${data.id}`, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then(function (response) {
              console.log("api response", response.data);
              if (response.status === 200 || response.status === 201) {
                swalalert.fire("Deleted!", "Task has been deleted.", "success");
                getData();
              }
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
        } else {
          swalalert.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  // update
  const handleUpdate = (values) => {
    axios
      .put(`http://localhost:3001/tasks/${values.id}`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        formik.resetForm();
        getData();
        toast.success("Task Updated successfully");
        handleClose();
      })
      .catch(function (error) {
        if (error.response?.data?.message)
          toast.error(error.response.data.message);
        else if (error.response?.data?.error) {
          toast.error(error.response.data.error);
        } else toast.error("Failed to connect to server");
      });
  };

  const formik = useFormik({
    initialValues: isEditMode ? selectedData : initialValues,
    validationSchema: Yup.object({
      taskName: Yup.string().required("Enter a Task Name"),
      description: Yup.string().required("Enter a Task Description"),
      dueDate: Yup.string().required("Enter a Tast Due Date"),
    }),
    onSubmit: (values, action) => {
      if (isEditMode) {
        handleUpdate({ ...values, id: selectedData.id });
      } else {
        axios
          .post("http://localhost:3001/tasks", values, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(function (response) {
            if (response.status === 200 || response.status === 201) {
              toast.success("Data Added successfully");
              formik.resetForm();
              handleClose();
              getData();
            }
          })
          .catch(function (error) {
            if (error.response?.data?.message)
              toast.error(error.response.data.message);
            else if (error.response?.data?.error) {
              toast.error(error.response.data.error);
            } else toast.error("Failed to connect to server");
          });
      }
    },
  });

  return (
    <>
      {console.log(formik.values.errors)}
      <div className="container mt-5">
        <div className="d-flex position-relative mb-3 justify-content-center ">
          <h5 className="m-auto text-center">Previous Tasks</h5>
          <Button variant="contained" color="info" onClick={handleShow}>
            Add Task
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {isEditMode ? "Edit Task Details" : "Add Task Details"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-outline mb-2">
                  <TextField
                    name="taskName"
                    margin="dense"
                    type="text"
                    placeholder="Task Name"
                    variant="outlined"
                    label="Task Name"
                    value={formik.values.taskName}
                    onChange={formik.handleChange}
                    fullWidth
                    required
                  ></TextField>
                  {formik.errors.taskName ? (
                    <p className="text-danger">{formik.errors.taskName}</p>
                  ) : null}
                </div>
                <div className="form-outline mb-2">
                  <TextField
                    name="description"
                    margin="dense"
                    type="text"
                    placeholder="Desciption"
                    variant="outlined"
                    label="Task Desciption"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    fullWidth
                    required
                  ></TextField>
                  {formik.errors.description ? (
                    <p className="text-danger">{formik.errors.description}</p>
                  ) : null}
                </div>
                <div className="form-group mb-2">
                  <TextField
                    name="dueDate"
                    margin="dense"
                    type="date"
                    variant="outlined"
                    label="Due Date"
                    value={formik.values.dueDate}
                    onChange={formik.handleChange}
                    InputProps={{
                      inputProps: {
                        min: new Date().toISOString().substring(0, 10),
                      },
                    }}
                    fullWidth
                    required
                    style={{ margin: "8px 0" }}
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                  {formik.errors.dueDate ? (
                    <p className="text-danger">{formik.errors.dueDate}</p>
                  ) : null}
                </div>
                <div className="pt-1 mb-2 ">
                  <Button variant="contained" type="submit">
                    {isEditMode ? "Update" : "Add"}
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
        <div className="container" style={{ overflow: "scroll" }}>
          <table className="table table-striped border">
            <thead>
              <tr>
                <th scope="col">Sr. No</th>
                <th scope="col">Task Name</th>
                <th scope="col">Description</th>
                <th scope="col">Due Date</th>

                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.taskName}</td>
                    <td>{item.description}</td>
                    <td>{item.dueDate}</td>

                    <td>
                      <button className="btn btn-success text-white">
                        <AiFillEdit onClick={() => handleShowEdit(item)} />
                      </button>
                    </td>
                    <td>
                      <div className="btn btn-danger text-white">
                        <AiFillDelete onClick={() => deleteTalk(item)} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tasks;
