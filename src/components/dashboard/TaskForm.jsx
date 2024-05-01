import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCrown, FaSave } from "react-icons/fa";
import SecureContent from "../auth/SecureContent";

const TaskForm = ({
  taskTitle,
  assignedUser,
  setTaskTitle,
  handleAddTask,
  setAssignedUser,
}) => {
  const [UsersList, setUsersList] = useState();

  const getUsers = async () => {
    const usrs = await axios.get("http://localhost:8080/user", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    setUsersList(usrs.data.userList);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SecureContent>
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <form onSubmit={handleAddTask}>
          <div className="mb-4">
            <TextField
              label="Task Title"
              variant="outlined"
              fullWidth
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <FormControl fullWidth>
              <InputLabel id="assigned-user-label">Assigned User</InputLabel>
              <Select
                labelId="assigned-user-label"
                id="assigned-user-select"
                value={assignedUser}
                onChange={(e) => setAssignedUser(e.target.value)}
                label="Assigned User"
              >
                {UsersList?.map((user, index) => (
                  <MenuItem key={index} value={user._id}>
                    {user.username}{" "}
                    {user.admin ? (
                      <FaCrown className="ml-2" color="gold" />
                    ) : (
                      ""
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            className="float-right"
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            disabled={taskTitle.length <= 0 || assignedUser.length <= 0}
          >
            <FaSave />
          </Button>
        </form>
      </div>
    </SecureContent>
  );
};

export default TaskForm;
