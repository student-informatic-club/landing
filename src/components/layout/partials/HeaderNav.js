const navLinks = [
    {name: 'Trang Chủ', status: true, href: '#'},
    {name: 'Các Ban', status: false, dropdown: [
        {name: 'Ban Kỹ Thuật', status: false, href: '/ban-ky-thuat'},
        {name: 'Ban Hỗ Trợ', status: false, href: '/ban-ho-tro'},
        {name: 'Ban Truyền Thông', status: false, href: '/ban-truyen-thong'},
        {name: 'Ban Khác', status: false, dropdown: [
            {name: 'Ban Học Tập', status: false, href: '/ban-hoc-tap'},
            {name: 'Ban Văn Thể', status: false, href: 'ban-van-the'}
        ]},
    ]},
    {name: 'Sự Kiện', status: false, dropdown: [
        {name: 'Sự Kiện Đã Tổ Chức', status: false, href: '/evented'},
        {name: 'Sự Kiện Sắp Tới', status: false, href: '/new-events'}
    ]}
]

export default navLinks