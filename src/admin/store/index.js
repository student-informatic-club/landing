import create from 'zustand';

const Store = create((set, get) => ({
    account: {username: 'admin', password: 'admin'},
    status: false,
    remember: false
}))

export default Store;