import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllBooksPublicThunk, getNewestBookThunk } from "../../../redux/action/book";
import { Pagination } from "antd";
import anime from "animejs";
import "./styles.scss";
import Card from "../../../utils/components/card";
import publicationImage from "../../../assets/images/publications-image.png";

const Main = () => {
  const dispatch = useDispatch();

  const [newestBookList, setNewestBookList] = useState();
  const [dataReceived, setDataReceived] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [page, setPage] = useState(1);

  //Text animation
  useEffect(() => {
    var textWrapper = document.querySelector(".ml6 .letters");
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml6 .letter",
        translateY: ["-1.5em", 0],
        translateZ: 0,
        duration: 1500,
        delay: (el, i) => 50 * i,
      })
      .add({
        targets: ".ml6",
        opacity: 0,
        duration: 2000,
        easing: "easeOutExpo",
        delay: 1000,
      });
  }, []);

  //fetch newest books
  useEffect(() => {
    dispatch(getNewestBookThunk()).then((res) => {
      setNewestBookList(res.payload);
    });
  }, []);

  //fetch all books by page
  useEffect(() => {
    dispatch(getAllBooksPublicThunk(page)).then((res) => {
      setDataReceived(res.payload.response);
      setIsReceived(true);
    });
  }, [isReceived]);

  const handlePageChange = (e) => {
    setPage(e);
    setIsReceived(false);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row w-full h-full">
        <img src={publicationImage} alt="" className="w-[40%] min-h-full h-full" />
        <div className="w-full h-full flex flex-col ml-5 self-center">
          <h1 className="ml6">
            <span className="text-wrapper">
              <p className="letters text-red-600 tracking-widest">Published</p>
            </span>
          </h1>
          <div className="grid grid-cols-4 gap-10 w-full mt-5">
            {newestBookList?.map((book) => {
              return (
                <Card
                  id={book.id}
                  key={book.id}
                  link={book.image_id != null && book.image_id.length != 0 ? `${import.meta.env.VITE_BACKEND_API}/api/image/${book.image_id[0]}` : ""}
                  title={book.title}
                  sellingPrice={book.sellingPrice}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full mx-5 mb-5">
        <h1 className="text-5xl font-bold h-auto mb-5 mt-4 text-sky-800">Our Product</h1>
        <div className="w-auto h-auto ml-5 flex flex-col self-center mt-5">
          <div className="grid grid-cols-4 gap-10 w-full">
            {dataReceived?.data.map((book) => {
              return (
                <Card
                  id={book.id}
                  key={book.id}
                  link={book.image_id != null && book.image_id.length != 0 ? `${import.meta.env.VITE_BACKEND_API}/api/image/${book.image_id[0]}` : ""}
                  title={book.title}
                  sellingPrice={book.sellingPrice}
                />
              );
            })}
          </div>
          {dataReceived && dataReceived?.totalPages > 1 ? (
            <Pagination
              defaultCurrent={1}
              total={dataReceived?.total || 0}
              current={page}
              pageSize={dataReceived?.pageSize || 12}
              onChange={handlePageChange}
              className="self-end mt-10"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Main;
