import React, { FunctionComponent } from 'react';

interface TaskProps {
  task: string;
}

export const Task: FunctionComponent<TaskProps> = ({ task }) => (
  <li>
    {task}
  </li>
)
