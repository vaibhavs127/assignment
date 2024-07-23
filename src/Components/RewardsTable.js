import React, { useEffect, useState } from 'react'

const RewardsTable = (props) => {
  const [yearData, setYearData] = useState([])
  const calculateTotal = () => {
    const totalRewards = props?.monthlyRewards.reduce((acc, points) => acc + points.amount, 0)
    return totalRewards
  }

  const getYearData = () => {
    let array = []
    props?.monthlyRewards.forEach((res) => {
      let years = array.find((item) => item.year === res.year)

      if (!years) {
        years = {
          year: res.year,
          transaction: [],
        }
        array.push(years)
        setYearData(array)
      }

      years.transaction.push({
        monthName: res?.monthName,
        amount: res?.amount,
        points: res?.points
      })

    })
    setYearData(array)
  }

  useEffect(() => {
    getYearData()
  }, [props?.monthlyRewards])

  return (
    <>
      <h3>Total: {calculateTotal()}</h3>
      <table className='centerTable'>
        <tr>
          <th>Year</th>
          <th>Months</th>
          <th>Amount</th>
          <th>Points</th>
        </tr>
        {yearData?.map((res) => (
          <>
            {res?.transaction?.map((reward, i) => (
              <tr key={`${res.year}-${i}`}>
                {i === 0 && (
                  <td rowSpan={res?.transaction.length}>{res.year}</td>
                )}
                <td>{reward?.monthName}</td>
                <td>{reward?.amount}</td>
                <td>{reward?.points}</td>
              </tr>
            ))}

          </>
        ))}
      </table>
    </>
  )
}

export default RewardsTable
