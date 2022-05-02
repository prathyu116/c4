import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

export const Login = () => {
  const [form, setForm] = useState({});
  const { handleAuth, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlechange = (e) => {
    let { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  console.log(form);
  const postForm = () => {
    axios
      .get("http://localhost:5000/users", form)
      .then(function (response) {
        var data = response.data.find((item) => {
          return item.username === form.username && item.pass === form.password;
        });

        if (data.role === "client") {
          setUser(data)
          handleAuth(true);
          navigate("/neworder");
        } else if (data.role === "admin") {
                    setUser(data);

          handleAuth(true);

          navigate("/orders");
        }
      })
      .catch(function (error) {
        alert("user not found");
        console.log(error);
      });
  };

  return (
    <div>
      <input className="username" type="text" name="username" placeholder="Enter Username" onChange={(e) => handlechange(e)} />
      <input className="password" type="password" name="password" placeholder="Enter password" onChange={(e) => handlechange(e)} />
      {/* On this button click make network req to find user with same username and password */}
      {/* get his role, if role is `admin` take him to `/orders` page otherwise take him to `/neworder` */}
      <button onClick={postForm} className="submit">
        Login
      </button>
    </div>
  );
};
