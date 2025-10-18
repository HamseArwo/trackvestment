import React, { useEffect, useState } from "react";
interface SalaryRow {
  id: number;
  year: number;
  amount: number;
  account_id?: number;
  user_id?: number;
}
interface ContributionsRow {
  id: number;
  year: number;
  amount: number;
  account_id: number;
  user_id: number;
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
interface grantRow {
  year: number;
  grantEarned: number;
}
type TableRow = SalaryRow | ContributionsRow;
interface TableProps {
  tableType: 0 | 1;
  parentId: number;
  account_type_id: number;
}

function Table({ tableType, parentId, account_type_id }: TableProps) {
  const [recall, setRecall] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);

  //
  //
  useEffect(() => {
    const rowsList: TableRow[] = [];
    const limitList: limitRow[] = [];
    const cumulativeList: cumulativeRow[] = [];
    const grantList: grantRow[] = [];
    let ignore = false;
    let total = 0;
    const fetchData = async () => {
      try {
        if (tableType == 0) {
          const response = await fetch(`http://localhost:8080/salary`, {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const salaryData = await response.json();
          for (const row of salaryData.salaries) {
            const fetchedRow: SalaryRow = {
              id: row.id,
              account_id: row.account_id,
              user_id: row.user_id,
              year: row.year,
              amount: row.amount,
            };
            total += fetchedRow.amount;
            rowsList.push(fetchedRow);
          }
          setRows(rowsList);
        } else if (tableType == 1) {
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
              total += fetchedRow.amount;
              rowsList.push(fetchedRow);
            }
            setRows(rowsList);
            setBalance(total);
            if (account_type_id === 1 || account_type_id === 3) {
              if (account_type_id == 1) {
                const response = await fetch(
                  `http://localhost:8080/accounts/limit`,
                  {
                    credentials: "include",
                  },
                );

                const data = await response.json();
                for (const row of data.ContributionLimit) {
                  const fetchedLimit: limitRow = {
                    year: row.year,
                    limit: row.amount,
                  };
                  limitList.push(fetchedLimit);
                }
                setLimit(limitList);
              } else if (account_type_id == 3) {
                const response = await fetch(
                  `http://localhost:8080/accounts/rrsplimit`,
                  {
                    credentials: "include",
                  },
                );

                const data = await response.json();
                for (const row of data.RrspLimit) {
                  const fetchedLimit: limitRow = {
                    year: row.year,
                    limit: row.amount,
                  };
                  limitList.push(fetchedLimit);
                }
                setLimit(limitList);
              }
              const response = await fetch(
                `http://localhost:8080/accounts/culumative/${parentId}/${account_type_id}`,
                {
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
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
            } else if (account_type_id == 2) {
              const response = await fetch(
                `http://localhost:8080/accounts/culumative/${parentId}/${account_type_id}`,
                {
                  method: "GET",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );
              const grantData = await response.json();
              for (const row of grantData.GrantCumulative) {
                const fetchedGrant: grantRow = {
                  year: row.year,
                  grantEarned: row.grant_earned,
                };
                grantList.push(fetchedGrant);
              }
              setGrant(grantList);
            }
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
  if (account_type_id === 1 || account_type_id === 3) {
    columns = [
      "year",
      "amount",
      "Yearly Limit",
      "Left Over Room",
      "Over The Limit",
      "Action",
    ];
  } else if (account_type_id === 2) {
    columns = ["year", "amount", "Grant Earned", "Action"];
  } else {
    columns = ["year", "amount", "Action"];
  }

  const [rows, setRows] = useState<TableRow[]>([]);
  const [limits, setLimit] = useState<limitRow[]>([]);
  const [cumulative, setCumulative] = useState<cumulativeRow[]>([]);
  const [grants, setGrant] = useState<grantRow[]>([]);

  const [editRowId, setEditRowId] = useState<number | null>(null);

  const [editFormData, setEditFormData] = useState<Partial<TableRow>>({});

  const handleEditClick = (row: TableRow) => {
    setEditRowId(row.id);
    if (tableType === 0) {
      setEditFormData({ year: Number(row.year), amount: row.amount });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: Number(value) });
  };

  const handleSave = async (id: number) => {
    if (tableType == 1) {
      try {
        await fetch(`http://localhost:8080/accounts/contribution/${parentId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(editFormData),
        });
      } catch (error) {
        console.error(error);
      }
    } else if (tableType == 0) {
      try {
        await fetch(`http://localhost:8080/salary`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(editFormData),
        });
      } catch (error) {
        console.error(error);
      }
    }

    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, ...editFormData } : row,
    );
    setRows(updatedRows);
    setEditRowId(null);
    setRecall(!recall);
  };

  console.log(rows);
  return (
    <section className="table-section">
      {tableType == 1 && <h1>Your Contributions</h1>}
      {tableType == 0 && <h1>Your Salary History</h1>}
      <div className="table-div">
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
                    {grants.map((grant) => {
                      if (grant.year == row.year) {
                        return <td>{grant.grantEarned}</td>;
                      }
                    })}

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
                      <button
                        className="cancel-btn"
                        onClick={() => setEditRowId(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{row.year}</td>
                    <td>{row.amount}</td>
                    {grants.map((grant) => {
                      if (grant.year == row.year) {
                        return <td>{grant.grantEarned}</td>;
                      }
                    })}
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
      </div>
      {tableType == 1 ? (
        <>
          <h2> Total Contributions: ${balance}</h2>
          {account_type_id == 2 && <h2> Remaining Room: ${50000 - balance}</h2>}
          {account_type_id == 2 && balance > 50000 && (
            <h2>You are over your contribution limit by ${balance - 50000}</h2>
          )}
        </>
      ) : (
        <h2> Total Salary : ${balance}</h2>
      )}
    </section>
  );
}

export default Table;
