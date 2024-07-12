import React, { useState } from 'react';
import { useTable, useFilters } from 'react-table';
import classnames from 'classnames';

const TableComponent = ({ columns, data }) => {
  const [editMode, setEditMode] = useState({});
  const [flaggedRows, setFlaggedRows] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters
  );

  const toggleEditMode = (columnId) => {
    setEditMode((prev) => ({ ...prev, [columnId]: !prev[columnId] }));
  };

  const flagRow = (rowIndex) => {
    setFlaggedRows((prev) => ({ ...prev, [rowIndex]: !prev[rowIndex] }));
  };

  const handleRowSelect = (rowIndex) => {
    setSelectedRows((prev) => {
      const newSelection = [...prev];
      const index = newSelection.indexOf(rowIndex);
      if (index > -1) {
        newSelection.splice(index, 1);
      } else {
        newSelection.push(rowIndex);
      }
      return newSelection;
    });
  };

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
                <div>
                  {column.canFilter ? column.render('Filter') : null}
                </div>
                <button onClick={() => toggleEditMode(column.id)}>
                  {editMode[column.id] ? 'Disable Edit' : 'Enable Edit'}
                </button>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className={classnames({
                flagged: flaggedRows[i],
                selected: selectedRows.includes(i),
              })}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(i)}
                  onChange={() => handleRowSelect(i)}
                />
              </td>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>
                  {editMode[cell.column.id] ? (
                    <input
                      value={cell.value}
                      onChange={(e) => {
                        const newData = [...data];
                        newData[i][cell.column.id] = e.target.value;
                        setData(newData);
                      }}
                    />
                  ) : (
                    cell.render('Cell')
                  )}
                </td>
              ))}
              <td>
                <button onClick={() => flagRow(i)}>Flag</button>
                <button
                  onClick={() => {
                    const newData = [...data];
                    newData.splice(i, 1);
                    setData(newData);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
