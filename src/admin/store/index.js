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
        {name: 'Bài Viết', href: '/admin/Blog', status: false},
        {name: 'Sự Kiện', href: '/admin/Event', status: false},
    ]
}))

export default Store