const navLinks = [
    {name: 'Trang Chủ', status: true, href: '#'},
    {name: 'Về Chúng Tôi', status: false, href: '#'},
    {name: 'Bài Viết', status: false, href: '#'},
    {name: 'Sự Kiện', status: false, dropdown: [
        {name: 'Sự Kiện Đã Tổ Chức', status: false, href: '/evented'},
        {name: 'Sự Kiện Sắp Tới', status: false, href: '/new-events'}
    ]}
]

export default navLinks