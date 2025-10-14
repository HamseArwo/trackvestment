import React, { useState } from "react";
interface SalaryRow {
  id: number;
  Year: string;
  Salary: number;
  Contributions?: number;
  Limit?: number;
}
interface ContributionsRow {
  id: number;
  Year: string;
  Contributions: number;
  Limit: number;
  Salary?: number;
}
type TableRow = SalaryRow | ContributionsRow;
interface TableProps {
  tableType: 0 | 1;
}

function Table({ tableType }: TableProps) {
  // Step 1: The table data
  //
  //
  //
  let columns: string[];
  let rowsFormat: TableRow[];
  if (tableType === 0) {
    columns = ["Year", "Salary"];
    rowsFormat = [
      { id: 1, Year: "John", Salary: 25 },
      { id: 2, Year: "Mary", Salary: 30 },
    ];
  } else {
    columns = ["Year", "Contributions", "Limit"];
    rowsFormat = [
      { id: 1, Year: "John", Contributions: 25, Limit: 100 },
      { id: 2, Year: "Mary", Contributions: 30, Limit: 150 },
    ];
  }

  const [rows, setRows] = useState<TableRow[]>(rowsFormat);

  // Step 2: Keep track of which row is being edited
  const [editRowId, setEditRowId] = useState<number | null>(null);

  // Step 3: Temporary data while editing
  const [editFormData, setEditFormData] = useState<Partial<TableRow>>({});

  // Step 4: Handle edit click
  const handleEditClick = (row: TableRow) => {
    setEditRowId(row.id);
    if (tableType === 0) {
      setEditFormData({ Year: row.Year, Salary: row.Salary });
    } else if (tableType === 1) {
      setEditFormData({
        Year: row.Year,
        Contributions: row.Contributions,
        Limit: row.Limit,
      });
    }
  };

  // Step 5: Handle input change while editing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Step 6: Save the edited data
  const handleSave = (id: number) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, ...editFormData } : row,
    );
    setRows(updatedRows);
    setEditRowId(null);
  };

  // Step 7: Delete a row
  const handleDelete = (id: number) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  // Step 8: Add a new row
  const handleAddRow = () => {
    if (tableType === 0) {
      const newRow = {
        id: Date.now(),
        Year: "New Person",
        Salary: 0,
      };
      setRows([...rows, newRow]);
    } else {
      const newRow = {
        id: Date.now(),
        Year: "New Person",
        Contributions: 0,
        Limit: 0,
      };
      setRows([...rows, newRow]);
    }
  };

  return (
    <div>
      <section className="table-section">
        <h1>Your Contributions</h1>

        <table border={1} cellPadding="10">
          <thead>
            <tr>
              {columns.map((column) => (
                <th> {column}</th>
              ))}

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {editRowId === row.id ? (
                  <>
                    {columns.map((column) => (
                      <td className="input-cell">
                        <input
                          name={column}
                          value={editFormData[column as keyof TableRow]}
                          onChange={handleChange}
                        />
                      </td>
                    ))}

                    <td>
                      <button onClick={() => handleSave(row.id)}>Save</button>
                      <button onClick={() => setEditRowId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    {columns.map((column) => (
                      <td className="input-cell">
                        {row[column as keyof TableRow]}
                      </td>
                    ))}

                    <td>
                      <button onClick={() => handleEditClick(row)}>Edit</button>
                      <button onClick={() => handleDelete(row.id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleAddRow}>Add Row</button>
      </section>
    </div>
  );
}

export default Table;
