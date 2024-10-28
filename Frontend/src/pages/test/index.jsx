// import { useState } from "react";
// import { Upload, Button } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import axios from "axios";
// import "./styles.scss";

// const Test = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const beforeSend = (file) => {
//     console.log(file);
//   };
//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append("image", selectedFile);
//     try {
//       const response = await axios.post(
//         "https://api.imgbb.com/1/upload?expiration=600&key=34ce1fd2a1d3613cd0db7c18dc29c1a5",
//         formData,
//         {
//           headers: {},
//         }
//       );
//       console.log(response);
//     } catch (e) {
//       console.error(e);
//     }
//   };
//   return (
//     <div>
//       <div>hello</div>

//       <Upload
//         action={
//           "https://api.imgbb.com/1/upload?key=34ce1fd2a1d3613cd0db7c18dc29c1a5"
//         }
//         beforeUpload={beforeSend}
//       >
//         <Button icon={<UploadOutlined />}>Click to Upload</Button>
//       </Upload>

//       <div className="p-10">
//         <input
//           type="file"
//           onChange={(value) => setSelectedFile(value.target.files[0])}
//         />
//         <button onClick={handleUpload}>Upload Ảnh</button>
//       </div>
//     </div>
//   );
// };
// export default Test;


import React, {useEffect, useState} from 'react'
import { getAllBooksThunk } from '../../redux/action/book'
import { useDispatch } from 'react-redux';
import CardCustom from '../../utils/components/card';

const Test = () => {
  const dispatch = useDispatch();
  const [books, setBooks] = useState();
  const [dataReceived, setDataReceived] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllBooksThunk(page))
    .then((res) => {
      setBooks(res.payload.response.data)
      setDataReceived(res.payload.response) // metadata
      setIsReceived(true); 
    })
  }, [isReceived])



  return (
    <div>
        {books && books.map((book) => {
          return (
            <CardCustom key={book.id} className="h-[200px] w-40 overflow-hidden" imgLink={book.image[0]} title={book.title}/>
          );
        })}
    </div>
  )
}

export default Test

