import { getDefaultNormalizer } from "@testing-library/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Authcontext";

export const NewOrder = () => {
  const [data,setData]=useState([])
  const [form, setForm] = useState({});

  // Get data of only this user. store it in redux
  // GET /orders?owner_name=john will give you all order of user john
  //  on submit click create a new order, new order has status `Not Accepted`
    const { user } = useContext(AuthContext);
    console.log("==>",user);

    useEffect(()=>{
  getData()
    },[])
const getData= () =>{
   axios.get(`http://localhost:5000/orders?owner_name=${user.username}`).then((res) => {
     console.log("getet", res.data);
     setData(res.data);
   });
}

  const handlechange = (e) => {
    let { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  console.log(form);
  const handleAdd = () => {
    setData(...data, form);
    getData();
  };

  return (
    <div>
      <div className="form">
        <input className="new-problem" type="text" name="problem" placeholder="Enter problem" onChange={(e) => handlechange(e)} />
        {/* This input is readonly, it's coming from redux */}
        <input className="owner-name" type="text" name="owner_name" value={user.username} placeholder="yourname" readOnly />
        <input className="brand" type="text" name="brand" placeholder="Enter brand name" onChange={(e) => handlechange(e)} />
        {/* Create new problem, show it in below form immediately */}
        <button onClick={handleAdd}  className="submit">
          submit
        </button>
      </div>

      <div className="pastOrders">
        {/* this button filters the data below. */}
        {/* it's just a toggle of redux state something like `showUnfinished`  */}
        <button className="filter">
          {/* Text should change like:   Show {showUnfinished ? "all" : "Only unfinished"} */}
          showUnfinished
        </button>

        {/* Here create a div for every oreder, filter them before based on `showUnfinished` */}
        <div className="past-orders">
          {data.map((item, key) => {
            return (
              <div key={item.id}>
                <span className="id">{item.id}</span>. <span className="problem">{item.problem}</span>{" "}
                <span className="cost">
                  {/* if status is not accepted then keep it empty otherwise show cost like $1234 */}
                  {item.status === "not accepted" ? "" : item.cost}
                </span>
                <p className="status">Status:{item.status} </p>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
