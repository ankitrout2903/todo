import { Delete, Edit, NotificationImportant } from '@mui/icons-material/';
import axios from 'axios';
import moment from 'moment';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import './task.css';

function Task({ task, id }) {
  const { dispatch } = useContext(TaskContext);
  const userToken = useContext(TokenContext);

  const handleRemove = async (e) => {
    e.preventDefault();

    try {
      await axios.get(
        '/task/removeTask',
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      dispatch({
        type: 'REMOVE_TASK',
        id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReminder = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        '/task/reminder',
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkDone = (e) => {
    if (task.completed) toast.success('Task marked as incomplete');
    else toast.success('Task marked as complete');

    dispatch({
      type: 'MARK_DONE',
      id,
    });
  };

  return (
    <div className="bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3 px-2">
      <div className="mark-done">
        <input
          type="checkbox"
          className="checkbox h-4 w-4"
          onChange={handleMarkDone}
          checked={task.completed}
        />
      </div>
      <div className="task-info text-slate-900 text-sm w-10/12">
        <h4 className="task-title text-lg capitalize">{task.title}</h4>
        <p className="task-description">{task.description}</p>
        <div className="flex justify-between">
          <div className="italic opacity-60">
            {task?.createdAt ? (
              <p>{moment(task.createdAt).fromNow()}</p>
            ) : (
              <p>just now</p>
            )}
          </div>
          <div className="italic opacity-60">
            {task?.dueDate ? (
              <p>
                Due: {moment(task.dueDate).format('MMMM DD YYYY, h:mm:ss a')}
              </p>
            ) : (
              <p>No due date</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="remove-task text-sm text-white">
          <Edit
            style={{ fontSize: 30, cursor: 'pointer' }}
            size="large"
            onClick={handleReminder}
            className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1"
          />
        </div>
        <div className="remove-task text-sm text-white">
          <NotificationImportant
            style={{ fontSize: 30, cursor: 'pointer' }}
            size="large"
            onClick={handleReminder}
            className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1"
          />
        </div>
        <div className="remove-task text-sm text-white">
          <Delete
            style={{ fontSize: 30, cursor: 'pointer' }}
            size="large"
            onClick={handleRemove}
            className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1"
          />
        </div>
      </div>
    </div>
  );
}

export default Task;
