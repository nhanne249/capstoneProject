// import { useState } from "react";
// import axios from "axios";
import "./styles.scss";
import Card from "../../utils/components/card";

const Test = () => {
    // const [selectedFile, setSelectedFile] = useState(null);

    // const handleUpload = async () => {
    //     const formData = new FormData();
    //     formData.append("image", selectedFile);
    //     try {
    //         const response = await axios.post("https://api.imgbb.com/1/upload?key=34ce1fd2a1d3613cd0db7c18dc29c1a5", formData, {
    //             headers: {},
    //         });
    //         console.log(response.data.data.url);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };
    // return (
    //     <div>
    //         <div>hello</div>

    //         <div className="p-10">
    //             <input type="file" onChange={(value) => setSelectedFile(value.target.files[0])} />
    //             <button onClick={handleUpload}>Upload Ảnh</button>
    //         </div>
    //     </div>
    // );

    return (
        <div className="grid grid-cols-4">
            <Card link="https://i.ibb.co/9sSCtwQ/truyenkieu1.jpg" title="Ông lão đánh cá và con cá vàng" sellingPrice={"200000"} />
            <Card link="https://i.ibb.co/9sSCtwQ/truyenkieu1.jpg" title="Truyện Kiều" sellingPrice={"200000"} />
            <Card link="https://i.ibb.co/9sSCtwQ/truyenkieu1.jpg" title="Truyện Kiều" sellingPrice={"200000"} />
            <Card link="https://i.ibb.co/9sSCtwQ/truyenkieu1.jpg" title="Truyện Kiều" sellingPrice={"200000"} />
        </div>
    );
};
export default Test;
