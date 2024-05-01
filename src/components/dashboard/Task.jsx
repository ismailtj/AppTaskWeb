import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import {
  FaAngleDown,
  FaCheck,
  FaPencilAlt,
  FaRegTrashAlt,
} from "react-icons/fa";
import axios from "axios";

export const Task = ({ task, getTasks, openEditForm }) => {
  const [expanded, setExpanded] = useState(false);
  const [UserTask, setUserTask] = useState();

  const handleEdit = () => {
    openEditForm(task);
  };

  const handleRemove = async () => {
    await axios.delete("http://localhost:8080/task/" + task._id, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    getTasks();
  };

  const handleDone = async () => {
    await axios.put(
      "http://localhost:8080/task/" + task._id,
      { title: task.title, done: true, user: task.user },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    getTasks();
  };

  const getUserTask = async () => {
    const user = await axios.get("http://localhost:8080/user/" + task.user, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setUserTask(user.data.user.username);
  };

  useEffect(() => {
    getUserTask();
  }, [task]);

  return (
    <Accordion
      className="mb-3 bg-red-400"
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      style={{
        backgroundColor: task.done ? "#aacde3" : "",
      }}
    >
      <AccordionSummary expandIcon={<FaAngleDown />}>
        <p className="font-bold text-lg">{task.title}</p>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col ">
        <p className="text-pretty text-left text-gray-600">
          assigned to • {UserTask}
        </p>
        <p className="text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ex
          risus. Aenean et augue neque. Nulla laoreet efficitur justo in auctor.
        </p>
        <div className="flex justify-normal gap-2 mt-3">
          <Button
            className=""
            variant="contained"
            color="error"
            onClick={handleRemove}
          >
            <FaRegTrashAlt />
          </Button>
          <Button
            className=""
            variant="contained"
            color="primary"
            onClick={handleEdit}
          >
            <FaPencilAlt />
          </Button>
          {task.done == false ? (
            <Button
              className=" mr-0 m-auto"
              style={{
                margin: "auto",
                marginRight: 0,
              }}
              variant="contained"
              color="success"
              onClick={handleDone}
            >
              <FaCheck />
            </Button>
          ) : (
            ""
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
