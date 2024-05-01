import React, { useEffect, useState } from "react";
import { Task } from "./Task";
import axios from "axios";
import { Box, Fab, Modal } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { ModalStyle } from "../../functions/utiles";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [TaskList, setTaskList] = useState();
  const [open, setOpen] = React.useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [TaskID, setTaskID] = useState("");
  const [TaskDone, setTaskDone] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddTask = async () => {
    if (TaskID.length > 0) {
      try {
        const x = await axios
          .put(
            "http://localhost:8080/task/" + TaskID,
            { title: taskTitle, user: assignedUser, done: TaskDone },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then(() => {
            setAssignedUser("");
            setTaskTitle("");
            setTaskID("");
            setTaskDone(false);
            handleClose();
          });
        getTasks();
      } catch (error) {
        console.log("edit : ", error);
      }
    } else if (TaskID.length <= 0) {
      await axios
        .post(
          "http://localhost:8080/task",
          { title: taskTitle, user: assignedUser },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .catch(console.log("error"))
        .then(() => {
          getTasks();
          setAssignedUser("");
          setTaskTitle("");
          handleClose();
        });
    }
  };

  const openEditForm = (task) => {
    setTaskTitle(task.title);
    setAssignedUser(task.user);
    setTaskID(task._id);
    setTaskDone(task.done);
    handleOpen();
  };

  const getTasks = async () => {
    try {
      const tasks = await axios.get("http://localhost:8080/task", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setTaskList(tasks.data.taskList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-5 ">
      {TaskList?.map((task, key) => (
        <Task
          task={task}
          key={key}
          getTasks={getTasks}
          openEditForm={openEditForm}
        />
      ))}
      <Fab
        onClick={handleOpen}
        className="fixed right-10 bottom-10"
        style={{
          position: "fixed",
        }}
        color="primary"
        aria-label="add"
      >
        <FaPlus />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <TaskForm
            taskTitle={taskTitle}
            assignedUser={assignedUser}
            setTaskTitle={setTaskTitle}
            handleAddTask={handleAddTask}
            setAssignedUser={setAssignedUser}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default TaskList;
