import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CustomerRewars from '../Components/CustomerRewars';
import "../assets/css/style.css"

const Home = (props) => {
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  const [searchData, setSearchata] = useState("")
  const [filterData, setFilterata] = useState([])

  useEffect(() => {

    getDataFormLocalJsonApi()

  }, [])

  const getDataFormLocalJsonApi = () => {
    let newdata = new Promise((resolve, reject) => {

      axios.get("/Customer.json")
        .then((ele) => {
          if (ele?.status === 200) {
            resolve(ele.data)
          }
          else {
            reject("No Records Found")
          }
        })
        .catch((err) => reject(err.message))

    })
    newdata.then((res) => {
      setData(res)
      setFilterata(res)
    }).catch((err) => setError(err))
  }

  const handleSearch = (value) => {
    const filterd = data?.filter((ele) => ele?.customer?.toLowerCase().includes(value?.toLowerCase()))
    console.log(filterd);
    setFilterata(filterd)
  }

  return (
    <>
      <div className='home'>
        <h1>Customer Rewards</h1>
        <input type='text' placeholder='Search customer name' value={searchData} onChange={(e) => {
          setSearchata(e?.target?.value)
          handleSearch(e?.target?.value)
        }} className='searchBox' />
        {error ? <h4 className='error'>{error}</h4>
          :
          <div>
            {filterData?.length > 0 ? filterData?.map((res) => (
              <CustomerRewars key={res.customer} customerData={res} />
            )) : <h3>No Data Found</h3>}
          </div>
        }
      </div>

    </>
  )
}

export default Home