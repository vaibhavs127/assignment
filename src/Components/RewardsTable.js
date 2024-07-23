import React, { useEffect, useState } from 'react'

const RewardsTable = (props) => {
  //useState used for set the data year wise
  const [yearData, setYearData] = useState([])

  //Function will calculate total points for individual user and return the total points
  const calculateTotal = () => {
    const totalRewards = props?.monthlyRewards.reduce((acc, points) => acc + points.amount, 0)
    return totalRewards
  }

  //Function will create new array for display data year wise
  const getYearData = () => {
    let array = []
    props?.monthlyRewards.forEach((res) => {
      //it will find if year present or not in array
      let years = array.find((item) => item.year === res.year)

      //if year is not present it will push the new year and empty transaction array
      if (!years) {
        years = {
          year: res.year,
          transaction: [],
        }
        array.push(years)
        setYearData(array)
      }

      //if year present then in transaction array all data will push
      years.transaction.push({
        monthName: res?.monthName,
        amount: res?.amount,
        points: res?.points
      })

    })
    setYearData(array)
  }

  useEffect(() => {
    //call this function when its dependency array change
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
        {/**Display year with rowSpan */}
        {yearData?.map((res) => (
          <>
            {/**Display transaction data for every year */}
            {res?.transaction?.map((reward, i) => (
              <tr key={`${res.year}-${i}`}>
                {/**below condition used to display year only once at start of each year list */}
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
