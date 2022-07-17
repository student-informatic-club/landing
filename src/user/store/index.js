import create from 'zustand';

const Store = create((set, get) => ({
    account: {username: 'user1', password: 'user1'},
    status: false,
    remember: false
}))

export default Store;