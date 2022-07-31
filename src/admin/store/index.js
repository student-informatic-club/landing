import create from 'zustand';

const Store = create((set, get) => ({
    account: {username: 'admin', password: 'admin'},
    status: false,
    remember: false,
    activeSideBarAdmin: 'Dashboard'
}))

export const sideBar = create((set, get) => ({
    admin: [
        {name: 'Dashboard', href: '/admin/Dashboard', status: true},
        {name: 'Quản Trị Viên', href: '/admin/Quan-tri-vien', status: false},
        {name: 'Bài Viết/Sự Kiện', href: '/admin/Blog-Event', status: false},
        // {name: 'Sự Kiện', href: '/admin/Event', status: false},
    ]
}))

export const AdminDashboard = create((set, get) => ({
    dashboard: [
        {name: 'Quản Lý Phòng Máy', status: true, id: 1},
        {name: 'Quản Lý CTV', status: false, id: 2},
        {name: 'Quản Lý Sự Kiện', status: false, id: 3},
        {name: 'Quản Lý Bài Viết', status: false, id: 4},
    ],
    currentTab: 1
}))

export default Store