import { Card } from "antd";

const CardCustom = (value) => {
  return (
    <Card
      hoverable
      className={value.cardClassName}
      cover={<img alt="Giai tich 1" src={value.imgLink} />}
    >
      <p className={value.contentClassName}>{value.content}</p>
    </Card>
  );
};

export default CardCustom;
