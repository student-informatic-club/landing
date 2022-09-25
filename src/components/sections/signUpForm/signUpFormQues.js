import { SiGmail } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
const textMainBase = {
  // Định dạng mẫu: 2022-12-24T00:00:00, input dạng chuỗi 2 kí tự 2=>02
    title: <h3>BECOME OUR TEAMMATE</h3>,
    dayEnd: '10',
    monthEnd: '10',
    yearEnd: '2022',
    messageTitle: 'Mong muốn của bạn khi vào CLB'
}
const infoContact = [
  {
    href: "mailto:clbtinhocsinhvien@gmail.com",
    icon: <SiGmail className="contact__icon"></SiGmail>,
    data: "clbtinhocsinhvien@gmail.com",
  },
  // {
    //   href: "tel:0123456789",
    //   icon: <FaPhoneAlt className="contact__icon"></FaPhoneAlt>,
    //   data: "0123456789",
    // },
    {
      href: "https://goo.gl/maps/verubmkQeMuV1EDo8",
      icon: <MdLocationOn className="contact__icon"></MdLocationOn>,
      data: "Phòng 204 Thư viện đại học Thủy Lợi, 175 P. Tây Sơn, Trung Liệt, Đống Đa, Hà Nội",
    },
  ];
  const basicQues = [
  {
    quesName: "masv",
    quesTitle: "Mã sinh viên",
    quesExample: "21********",
  },
  {
    quesName: "fullName",
    quesTitle: "Họ và tên",
    quesExample: "Nguyễn Văn A",
  },
  {
    quesName: "phone",
    quesTitle: "Số điện thoại",
    quesExample: "0123456789",
  },
  {
    quesName: "email",
    quesTitle: "Email",
    quesExample: "example@gmail.com",
  },
  {
    quesName: "class",
    quesTitle: "Lớp",
    quesExample: "63CNTT01",
  },
];

const chooseQues = {
  quesTitle: "Sau khi vào CLB bạn muốn đăng kí vào (những) ban nào?",
  quesName: "answer",
  ans: ["Ban truyền thông", "Ban học tập", "Ban kỹ thuật", "Ban hỗ trợ"],
};
export { infoContact, textMainBase, basicQues, chooseQues };
