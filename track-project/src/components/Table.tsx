import React, { useEffect, useState } from "react";
interface SalaryRow {
  id: number;
  Year: string;
  Salary: number;
  Contributions?: number;
  accountId?: number;
}
interface ContributionsRow {
  id: number;
  Year: string;
  Contributions: number;
  accountId: number;
  Salary?: number;
}
type TableRow = SalaryRow | ContributionsRow;
interface TableProps {
  tableType: 0 | 1;
  parentId: number;
}

function Table({ tableType, parentId }: TableProps) {
  const rowsList: TableRow[] = [];
  //
  //
  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/accounts/contribution/${parentId}`,
          {
            credentials: "include",
          },
        );
        if (!ignore) {
          const data = await response.json();
          // console.log(data.Contributions[0]);
          for (const row of data.Contributions) {
            const fetchedRow: ContributionsRow = {
              id: row.id,
              accountId: row.account_id,
              Year: row.year,
              Contributions: row.amount,
            };
            rowsList.push(fetchedRow);
          }
          setRows(rowsList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    return () => {
      ignore = !ignore;
    };
  }, []);

  let columns: string[];
  // let rowsFormat: TableRow[];
  if (tableType === 0) {
    columns = ["Year", "Salary"];
  } else {
    columns = ["Year", "Contributions"];
  }

  const [rows, setRows] = useState<TableRow[]>([]);

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
        accountId: parentId,
        Year: "New Person",
        Contributions: 0,
      };
      setRows([...rows, newRow]);
    }
  };
  console.log(rows, rows.length);
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
