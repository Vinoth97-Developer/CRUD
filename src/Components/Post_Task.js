import React, { useState, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { TbClipboardText } from "react-icons/tb";
import "react-datepicker/dist/react-datepicker.css";
import "./Task.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbBellRinging } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import Avatar from "../Components/pic/avatar.png";

function PostTask() {
  const [show, setShow] = useState(false);
  const [taskMsg, setTaskMsg] = useState("Follow Up");
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState("");
  const [user, setUser] = useState("");
  const [del, setDel] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [id, setId] = useState("");
  const [update, SetUpdate] = useState("");
  const count = apiData.map((data) => data.id);
  const newval = count.length;
  const [edit, setEdit] = useState(true);
  const updateData = {
    user: user,
    date: taskDate,
    time: taskTime,
    task: taskMsg,
  };
  // URLS
  const API_URL = "https://63a95ef4594f75dc1db3c52f.mockapi.io/Task/";
  const USER_URL = "https://63a95ef4594f75dc1db3c52f.mockapi.io/users";

  // save
  let handleSave = () => {
    setShow(false);
    postData();
    setTaskMsg("Follow Up");
    setTaskTime("");
    setUser("");
    alert("Saved Successfully");
    console.log("saved User" + apiData);
    window.location.reload(false);
  };
  // cancel

  let handleCancel = () => {
    setShow(false);
    setEdit(true);
  };

  // Update

  let handleEdit = async () => {
    setShow(true);
    await axios.get(API_URL + `${id}`).then((res) => SetUpdate(res.data));
    setTaskMsg(update.task);
    setTaskTime(update.time);
    setUser(update.user);
    setTaskDate(update.date);
    setEdit(false);
  };
  let handleData = async () => {
    await axios
      .put(API_URL + `${id}`, updateData)
      .then((res) => alert("Updated Successfully"));
    setEdit(true);
    window.location.reload(false);
  };

  // Post Data
  let postData = async () => {
    await axios
      .post(API_URL, {
        user: user,
        date: taskDate,
        time: taskTime,
        task: taskMsg,
      })
      .then((res) => console.log(res.data));
  };
  useEffect(() => {
    // data
    axios.get(API_URL).then((res) => setApiData(res.data));
    // user
    axios.get(USER_URL).then((res) => setUserList(res.data));
  }, []);

  // Delete
  const handleDelete = async () => {
    await axios.delete(API_URL + `${id}`).then(alert("deleted"));
    setEdit(true);
    window.location.reload(false);
  };

  return (
    <>
      <div className="main_container">
        <div className="task_container">
          {/* Head */}
          <div className="task_header">
            <p>
              TASKS <span>{newval}</span>
            </p>
            <div className="add_btn" onClick={() => setShow(true)}>
              <BsPlusLg />
            </div>
          </div>
          {/* Body */}
          <div className={show ? "task_main_true" : "task_main_false"}>
            <div className="task_body">
              <label htmlFor="desc">
                <p> Task Descripition</p>
                <input
                  type={"text"}
                  id="desc"
                  className="dec"
                  placeholder="Task Description"
                  onChange={(e) => setTaskMsg(e.target.value)}
                  value={taskMsg}
                />
                <TbClipboardText className="task_icon" />
              </label>
              <div className="input_grid">
                <label htmlFor="date">
                  <p>Date</p>

                  <input
                    type={"date"}
                    id="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                  />
                </label>

                <label htmlFor="time">
                  <p>Time</p>
                  <input
                    type={"time"}
                    id="time"
                    value={taskTime}
                    onChange={(e) => setTaskTime(e.target.value)}
                  />
                </label>
              </div>

              <label htmlFor="user">
                <p>Assign User</p>
                <select
                  id="user"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                >
                  {userList.map((data) => (
                    <option value={data.name}>{data.name}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="task_footer">
              <div className={del ? ".delete_false" : "delete_true"}>
                <RiDeleteBin5Line className="delete" onClick={handleDelete} />
              </div>
              <div>
                <button className="cancel_btn" onClick={handleCancel}>
                  Cancel
                </button>
                {edit ? (
                  <button className="save_btn" onClick={handleSave}>
                    Save
                  </button>
                ) : (
                  <button className="save_btn" onClick={handleData}>
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* resuls */}

        <>
          {apiData.map((data) => (
            <div className="resut">
              <div className="profile">
                <div className="img_div">
                  <img src={Avatar} alt="notfound" />
                </div>

                <div>
                  <p className="name" value={data.task}>
                    {data.task}
                  </p>
                  <p className="ts_date" value={data.date}>
                    {data.date}
                  </p>
                </div>
              </div>
              <div className="icons_set">
                <div
                  className="edit_icon_true"
                  onClick={(e) => {
                    handleEdit();
                    setId(data.id);
                    setDel(true);
                  }}
                >
                  <MdOutlineModeEditOutline />
                </div>
                <div className="bell_icon">
                  <div>
                    <TbBellRinging />
                  </div>
                  <div>
                    <TiTick />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
        <p className="note">* Api server is slow you have to click edit icon multiple times for updating values</p>
      </div>
    </>
  );
}

export default PostTask;
