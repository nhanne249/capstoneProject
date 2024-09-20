import "./styles.scss";
import CardCustom from "../../utils/components/card";

const Main = () => {
  return (
    <div className="">
      <CardCustom
        imgLink="https://lib.hcmut.edu.vn/uploads/noidung/giao-trinh-giai-tich-1-0-830.jpg"
        content="Giai tich 1"
        cardClassName="w-40 bg-transparent border-none"
        contentClassName="font-sans text-base font-medium text-gray-600"
      />
      <h1>This is the home page</h1>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum fugit, voluptatum iusto mollitia sed accusantium nobis pariatur totam magni porro, quae debitis! Recusandae, nulla tempora nobis asperiores quia nisi temporibus.</p>
    </div>
  );
};

export default Main;
