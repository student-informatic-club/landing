const navLinks = [
    {name: 'Trang Chủ', status: true},
    {name: 'Ban', status: false, dropdown: [
        {name: 'Ban Chủ Nhiệm', status: false},
        {name: 'Ban Kỹ Thuật', status: false},
        {name: 'Ban Hỗ Trợ', status: false},
        {name: 'Ban Truyền Thông', status: false},
        {name: 'Ban Khác', status: false, dropdown: [
            {name: 'Ban Học Tập', status: false},
            {name: 'Ban Văn Thể', status: false}
        ]},
    ]},
    {name: 'Sự Kiện', status: false, dropdown: [
        {name: 'Sự Kiện Đã Tổ Chức', status: false},
        {name: 'Sự Kiện Sắp Tới', status: false}
    ]}
]

export default navLinks