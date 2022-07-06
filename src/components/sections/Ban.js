import React from "react";
import Slide from "../elements/Slider";

const Ban = () => {
  const options = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const Bans = [
    { title: "Ban Kỹ Thuật", theme: "#A149FA" },
    { title: "Ban Truyền Thông", theme: "#3B44F6" },
    { title: "Ban Hỗ Trợ", theme: "#3EC70B" },
    { title: "Ban Học Tập", theme: "#F7EC09" },
  ];
  return (
    <div className="container">
      <Slide
        children={Bans}
        option={options}
        // {...options}
        style={{ textAlign: "left", marginBottom: "30px", marginLeft: "0" }}
        label="Các Ban Trong SIC"
      />
    </div>
  );
};

export default Ban;
