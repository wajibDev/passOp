/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);
  const savePassword = () => {
    setpasswordArray([...passwordArray, {...form  , id:uuidv4()}]);
    localStorage.setItem("password", JSON.stringify(...passwordArray, {...form  , id:uuidv4()}));
    console.log([...passwordArray, form]);
  };

  const deletePassword = (id) => {
   console.log("deleting password with id",id )
   setpasswordArray(passwordArray.filter(item => item.id!==id))
   localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (



    <div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="px-2 md:px-0 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          pass
          <span className="text-green-500">OP/ &gt; </span>
        </h1>
        <p className="text-green-700 text-lg text-center ">
          your own password manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1 "
            type="text"
            name="site"
            id=""
          />
          <div className="flex w-full gap-8 ">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1 "
              type="text"
              name="username"
              id=""
            />
            <input
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="rounded-full border border-green-500 w-full p-4 py-1 "
              type="password"
              name="password"
              id=""
            />
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-600 hover:bg-green-400 rounded-full px-8 py-3 w-fit gap-2 border border-green-900"
          >
            Save Password
          </button>
        </div>
      </div>
      <div className="passwords flex flex-col justify-center items-center">
        <h2 className="font-bold text-2xl py-4">your password</h2>

        {passwordArray.length === 0 && <div>No password to show</div>}
        {passwordArray.length != 0 && (
          <table className="table-auto w-full rounded-md overflow-hidden ">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2">sites</th>
                <th className="py-2">username</th>
                <th className="py-2">password</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2 border border-white text-center w-32 ">
                      <a href={item.site} target="_blank">
                        {item.site}
                      </a>
                    </td>
                    <td className="py-2 border border-white text-center w-32 ">
                      {item.username}
                    </td>
                    <td className="py-2 border border-white text-center w-32 ">
                      {item.password}
                    </td>
                    <td className="py-2 border border-white text-center w-32 ">
                      <button onClick={()=>{deletePassword(id)}} className="bg-green-400 rounded-full px-2 hover:bg-white border border-green-900"> Delete </button>
                    </td>
                  </tr>
                ); 
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
