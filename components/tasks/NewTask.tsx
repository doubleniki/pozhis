import React, { FunctionComponent } from 'react';
import { DB_TODOS_NAME, DB_TODOS_STORE_NAME } from "@constants/db";

interface NewTaskProps {
  onAdd: () => void;
  db: IDBDatabase | null;
}

const NewTask: FunctionComponent<NewTaskProps> = ({ onAdd, db }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const task = event.currentTarget.task.value;

    if (db) {
      const request = db.transaction(DB_TODOS_NAME, "readwrite").objectStore(DB_TODOS_STORE_NAME).add({ task });
      request.onsuccess = () => {
        onAdd();
        formRef.current?.reset();
      }
      request.onerror = (event) => {
        console.error(event);
      }
    }
  }

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <input name="task" />
    </form>
  );
};

export default NewTask;
