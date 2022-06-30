import { SiGmail } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
const textMainBase = {
    title: <h3>BECOME OUR TEAMMATE</h3>,
    dayEnd: '30',
    monthEnd: '07',
    yearEnd: '2022',
    messageTitle: 'Mong muốn của bạn khi vào CLB'
}
const infoContact = [
  {
    href: "mailto:sic@gmail.com",
    icon: <SiGmail className="contact__icon"></SiGmail>,
    data: "sic@gmail.com",
  },
  {
    href: "tel:0123456789",
    icon: <FaPhoneAlt className="contact__icon"></FaPhoneAlt>,
    data: "0123456789",
  },
  {
    href: "https://goo.gl/maps/B6F5v82rMN1ViEF88",
    icon: <MdLocationOn className="contact__icon"></MdLocationOn>,
    data: "175 Tây Sơn Đống Đa",
  },
];
const signUpQues = [
  // câu hỏi thông tin basic
  {
    func: "basic info",
    ques: [
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
    ],
  },
  // câu hỏi lựa chọn đáp án
  {
    func: "choose",
    quesTitle: "Bạn muốn đăng kí vào (những) ban nào?",
    quesName: "answer",
    ans: [
      "Ban truyền thông",
      "Ban học tập",
      "Ban kỹ thuật",
      "Ban hỗ trợ",
      "Ban văn thể",
    ],
  },
];
export { signUpQues, infoContact, textMainBase };
