import { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';

interface TodoFilterProps {
  todos: Todo[];
  onFilterChange: (filteredTodos: Todo[]) => void;
}

export enum FilterOptions {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  todos,
  onFilterChange,
}) => {
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.ALL);
  const [query, setQuery] = useState('');

  const filterTodos = () => {
    let filteredTodos = todos.filter(todo => {
      switch (filter) {
        case FilterOptions.ACTIVE:
          return !todo.completed;
        case FilterOptions.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    });

    if (query) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    onFilterChange(filteredTodos);
  };

  useEffect(() => {
    filterTodos();
  }, [filter, query, todos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={event => setFilter(event.target.value as FilterOptions)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
