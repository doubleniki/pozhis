import React, { FunctionComponent } from 'react';
import { Task } from "@components/tasks/Task";
import { TaskFromDB } from "../../types/db";

interface TasksListProps {
  tasks: TaskFromDB[];
}

export const TasksList: FunctionComponent<TasksListProps> = ({ tasks }) => {
  return (
    <ul>
      {tasks.map(({ id, task }) => (
        <Task task={task} key={id} />
      ))}
    </ul>
  )
}
