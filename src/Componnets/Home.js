import React, { useEffect, useState } from 'react'
import {getDocs,collection} from '@firebase/firestore'
import { db } from '../firbase-config';
import './Homepage.css'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, Button } from '@mui/material';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';

import AlertDialogSlide from './AlertDialogSlide';

const Home = (props) => {
    const [postsList,setPostList]=useState([{'title':'title','post':`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

    The standard chunk of Lorem Ipsum Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32 used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,'id':1,'name':'Sanidhya'},{'title':'Nolan','post':`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

    `,'id':1,'name':'Sanidhya'}]);
    const[searchid,setSearchid]=useState([])
    const[search,setSearch]=useState('');
    const[read,setRead]=useState(false)
    const postCollectionRef= collection(db,"Posts")
    useEffect(()=>{
         const getPosts= async ()=>{ 
            const data= await getDocs(postCollectionRef)
            setPostList(data.docs.map((doc)=>({...doc.data(), id:doc.id})))
         }

         getPosts()
    })
    
    const handleStart=()=>{
        
        props.setDrawerBottom('right')
    }
    const handelRedirect=()=>{ 
         setRead(true)
        
         
    }
    const handlesearch=(event)=>{
         setSearch(event.target.value)
    }
 
    const handlPostOutput=()=>{ 
        return postsList.map((item)=>{
            var cont= item.post
            cont = cont.substr(0,300)
          if(search.length==0){
            return(<div className="card">
             <div className="poster"></div>
                <div className="writing">
                    <div className='title'>
                     <h1>{item.title}</h1>
                     <p>{cont}</p>
                    </div>
                     
                     <div className="like"><Button onMouseEnter={()=>{setSearchid(item)}}  onClick={handelRedirect}>Readmore</Button></div>
                </div>
                
       </div>)
          }
          else{
             if(item.title.includes(search)){
                return(<div className="card">
                <div className="poster"></div>
                <div className="writing">
                <div className='title'>
                   
                     <h1>{item.title}</h1>
                     <p>{cont}</p>
                </div>
                 <div className="like"><Button onMouseEnter={()=>{setSearchid(item)}}  onClick={handelRedirect}>Readmore</Button></div>
                </div>
               
           </div>)
             }
             
          }
             
        })
    }
    const processSearch=()=>{
        handlPostOutput()
    }
  return (
    <div className='main'>
      <div className="Homepage">
          <div className="hero1">
              <h1>Hey,<br/><h1>Welcome To <span style={{color:'grey'}}>Blog.com</span></h1></h1>
               <div className="button">Start Writing</div>
               
         </div>
         
      </div>
      <div className="content">
        <AlertDialogSlide check={read} setRead={setRead} id={searchid}/>
        <div className="search">
        <TextField
          id="standard-search"
          label="Search Titles"
          type="search"
          variant="standard"
          InputLabelProps={{
            style: { color: 'grey',fontSize: 20}
          }}
          sx={{ input: { color: 'white' ,fontSize:20}}}
          onChange={handlesearch}
        /> <div className='center'><SearchIcon fontSize='large' onClick={processSearch}/></div>
        </div>
     
        
             {handlPostOutput()}
       
            
             
             
        </div>
    </div>
  )
}

export default Home
