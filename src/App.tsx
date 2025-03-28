/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

//#region imports
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';

import { useState } from 'react';
import classNames from 'classnames';

import { Todo } from './types/Todo';
import { ErrorMessages } from './types/errorMessage';

import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/Main/TodoList';
import { TodoFilter } from './components/TodoFilter';
//#endregion imports

function getActiveTaskCount(todos: Todo[]) {
  return todos.filter(todo => todo.completed === false).length;
}

export const App = () => {
  const [todoList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages | null>(null);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todoList && <TodoList todoList={todoList} />}
        {/* Hide the footer if there are no todos */}
        <footer
          className={classNames('todoapp__footer', {
            hidden: todoList?.length === 0,
          })}
          data-cy="Footer"
        >
          <span className="todo-count" data-cy="TodosCounter">
            {getActiveTaskCount(todoList) + ' items left'}
          </span>
          <TodoFilter />
          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        removeError={() => setErrorMessage(null)}
      />
    </div>
  );
};
