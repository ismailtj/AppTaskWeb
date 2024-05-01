import React from "react";
import TaskList from "../components/dashboard/TaskList";

import SecureContent from "../components/auth/SecureContent";

export const Dashboard = () => {
  return (
    <SecureContent>
      <div className="px-2">
        <TaskList />
      </div>
    </SecureContent>
  );
};
