import React, { useEffect, useState } from "react";
interface SalaryRow {
  id: number;
  year: number;
  Salary: number;
  amount?: number;
  account_id?: number;
  user_id?: number;
}
interface ContributionsRow {
  id: number;
  year: number;
  amount: number;
  account_id: number;
  user_id: number;
  Salary?: number;
  limit?: number;
}
interface limitRow {
  year: number;
  limit: number;
}
interface cumulativeRow {
  year: number;
  amount: number;
  overContribution: number;
}
type TableRow = SalaryRow | ContributionsRow;
interface TableProps {
  tableType: 0 | 1;
  parentId: number;
  account_type_id: number;
}

function Table({ tableType, parentId, account_type_id }: TableProps) {
  const [recall, setRecall] = useState<boolean>(false);

  //
  //
  useEffect(() => {
    const rowsList: TableRow[] = [];
    const limitList: limitRow[] = [];
    const cumulativeList: cumulativeRow[] = [];
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
              account_id: row.account_id,
              user_id: row.user_id,
              year: row.year,
              amount: row.amount,
            };
            rowsList.push(fetchedRow);
          }
          setRows(rowsList);
          if (account_type_id === 1) {
            let response = await fetch(`http://localhost:8080/accounts/limit`, {
              credentials: "include",
            });

            const data = await response.json();
            for (const row of data.ContributionLimit) {
              const fetchedLimit: limitRow = {
                year: row.year,
                limit: row.amount,
              };
              limitList.push(fetchedLimit);
            }
            setLimit(limitList);
            response = await fetch(
              `http://localhost:8080/accounts/culumative/${parentId}/${account_type_id}`,
              {
                credentials: "include",
              },
            );
            const cumulativeData = await response.json();
            for (const row of cumulativeData.CumulativeContributions) {
              const fetchedCumulative: cumulativeRow = {
                year: row.year,
                amount: row.amount,
                overContribution: row.over_contribution_amount,
              };
              cumulativeList.push(fetchedCumulative);
            }
            console.log(cumulativeList);
            setCumulative(cumulativeList);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    return () => {
      ignore = !ignore;
    };
  }, [recall]);

  let columns: string[];
  // let rowsFormat: TableRow[];
  if (tableType === 0) {
    columns = ["Year", "Salary"];
  } else {
    columns = [
      "year",
      "amount",
      "Yearly Limit",
      "Left Over Room",
      "Over The Limit",
      "Action",
    ];
  }

  const [rows, setRows] = useState<TableRow[]>([]);
  const [limits, setLimit] = useState<limitRow[]>([]);
  const [cumulative, setCumulative] = useState<cumulativeRow[]>([]);

  // Step 2: Keep track of which row is being edited
  const [editRowId, setEditRowId] = useState<number | null>(null);

  // Step 3: Temporary data while editing
  const [editFormData, setEditFormData] = useState<Partial<TableRow>>({});

  // Step 4: Handle edit click
  const handleEditClick = (row: TableRow) => {
    setEditRowId(row.id);
    if (tableType === 0) {
      setEditFormData({ year: Number(row.year), Salary: row.Salary });
    } else if (tableType === 1) {
      setEditFormData({
        id: row.id,
        year: Number(row.year),
        amount: row.amount,
        account_id: row.account_id,
        user_id: row.user_id,
      });
    }
  };

  // Step 5: Handle input change while editing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: Number(value) });
  };

  // Step 6: Save the edited data
  const handleSave = async (id: number) => {
    await fetch(`http://localhost:8080/accounts/contribution/${parentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(editFormData),
    });

    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, ...editFormData } : row,
    );
    setRows(updatedRows);
    setEditRowId(null);
    setRecall(!recall);
  };

  console.log(cumulative);
  return (
    <div>
      <section className="table-section">
        <h1>Your Contributions</h1>

        <table border={1} cellPadding="10">
          <thead>
            <tr>
              {columns.map((column) => (
                <th> {column.toUpperCase()}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {editRowId === row.id ? (
                  <>
                    <td>{row.year}</td>
                    <td className="input-cell">
                      <input
                        className="input-cell"
                        type="number"
                        name="amount"
                        value={editFormData.amount}
                        onChange={handleChange}
                      />
                    </td>
                    {limits.map((limit) => {
                      if (limit.year == row.year) {
                        return <td>{limit.limit}</td>;
                      }
                    })}
                    {cumulative.map((cumulative) => {
                      if (cumulative.year == row.year) {
                        return (
                          <>
                            <td>{cumulative.amount}</td>
                            <td>{cumulative.overContribution}</td>
                          </>
                        );
                      }
                    })}
                    <td>
                      <button onClick={() => handleSave(row.id)}>Save</button>
                      <button onClick={() => setEditRowId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{row.year}</td>
                    <td>{row.amount}</td>
                    {limits.map((limit) => {
                      if (limit.year == row.year) {
                        return <td>{limit.limit}</td>;
                      }
                    })}
                    {cumulative.map((cumulative) => {
                      if (cumulative.year == row.year) {
                        return (
                          <>
                            <td>{cumulative.amount}</td>
                            <td>{cumulative.overContribution}</td>
                          </>
                        );
                      }
                    })}

                    <td>
                      <button onClick={() => handleEditClick(row)}>Edit</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Table;
