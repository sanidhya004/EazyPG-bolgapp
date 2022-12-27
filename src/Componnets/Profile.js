import "./profile.css";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDocs, collection,deleteDoc,doc,updateDoc } from "@firebase/firestore";
import { db } from "../firbase-config";
import "./Homepage.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Alert, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';

export const Profile = () => {
  const [postsList, setPostList] = useState([
    { title: "title", post: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

    `, id: 1 ,email:'sanidhya626@gmail.com'},
    { title: "nolan", post: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

    `, id: 2 ,email:'sanidhya62@gmail.com'},
  ]);
  const [searchid, setSearchid] = useState([]);
  const [search, setSearch] = useState("");
  const[d,setDelete]=useState('');
  const [read, setRead] = useState(false);
  const postCollectionRef = collection(db, "Posts");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  });

  const deletePost=async()=>{

    const postDoc= doc(db,'Posts',d)
     await deleteDoc(postDoc)
  }
  const handelRedirect = () => {
    setRead(true);
  };
  const handlesearch = (event) => {
    setSearch(event.target.value);
  };
  const handlPostOutput = () => {
    return postsList.map((item) => {
      if (search.length == 0 && item.email==localStorage.getItem('email')) {
        return (
          <div className="card">
            <div className="poster"></div>
            <div className="writing">
              <div className="title">
                <h1>{item.title}</h1>
                <p>{item.post}</p>
              </div>
              <div className="like">
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}> <ModeEditOutlineRoundedIcon/>Edit</div>
             
              <IconButton aria-label="delete" size="large" onMouseEnter={()=>{setDelete(item.id)}} onClick={deletePost}>
                    <DeleteIcon />
                  </IconButton>
                  
              </div>
            </div>
          </div>
        );
      } else {
        if (item.title.includes(search) && item.email==localStorage.getItem('email')) {
          return (
            <div className="card">
              <div className="poster"></div>
              <div className="writing">
                <div className="title">
                  <h1>{item.title}</h1>
                  <p>{item.post}</p>
                </div>
                <div className="like">
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}> <ModeEditOutlineRoundedIcon/>Edit</div>
                  <IconButton aria-label="delete" size="large" onMouseEnter={()=>{setDelete(item.id)}} onClick={deletePost}>
                    <DeleteIcon />
                  </IconButton>
                  
                </div>
              </div>
            </div>
          );
        }
      }
    });
  };
  const processSearch = () => {
    handlPostOutput();
  };
  return (
    <>
      <div className="profile">
        <div className="side">
          <div className="profileimage">
            <Avatar
              alt={localStorage.getItem("name")}
              src={localStorage.getItem("photo")}
              sx={{ width: 150, height: 150 }}
            />
          </div>
        </div>
        <div className="show">
          <div>
            <h1>Welcome</h1>
            <h3 style={{ color: "grey" }}>{localStorage.getItem("name")}</h3>
          </div>
          <div>
            <div className="content">
              <div className="search">
                <TextField
                  id="standard-search"
                  label="Search Titles"
                  type="search"
                  variant="standard"
                  InputLabelProps={{
                    style: { color: "grey", fontSize: 20 },
                  }}
                  sx={{ input: { color: "white", fontSize: 20 } }}
                  onChange={handlesearch}
                />{" "}
                <div className="center">
                  <SearchIcon fontSize="large" onClick={processSearch} />
                </div>
              </div>

              {handlPostOutput()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
