import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CustomerRewars from '../Components/CustomerRewars';
import "../assets/css/style.css"

const Home = (props) => {
  const [data,setData] = useState({
    customerData:[],
    filterData:[],
    searchData:"",
    errorMsg:""
  })

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
        .catch((error) => reject(error.message))

    })
    newdata.then((res) => {
      setData({
        ...data,
        customerData:res,
        filterData:res
      })
    }).catch((err) => setData({
        ...data,
        errorMsg:err,
      }))
  }

  const handleSearch = (value) => {
    const filterd = data?.customerData?.filter((customer) => customer.customer.toLowerCase().includes(value.toLowerCase()))
    setData({
        ...data,
        searchData:value,        
        filterData:filterd,
      })
    
  }

  return (
    <>
      <div className='home'>
        <h1>Customer Rewards</h1>
        <input type='text' placeholder='Search customer name' value={data.searchData} onChange={(e) => {
          handleSearch(e?.target?.value)
        }} className='searchBox' />
        {data.errorMsg ? <h4 className='error'>{data.errorMsg}</h4>
          :
          <div>
            {data?.filterData?.length > 0 ? data.filterData.map((res) => (
              <CustomerRewars key={res.customer} customerData={res} />
            )) : <h3>No Data Found</h3>}
          </div>
        }
      </div>

    </>
  )
}


export default Home
