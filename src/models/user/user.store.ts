import { atom } from 'nanostores';

export const authStore = atom({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
});

if (process.env.NODE_ENV === 'development') {
    (window as any).authStore = authStore;
}

export const login = (userData) => {
    authStore.set({ isAuthenticated: true, user: userData, transactions: JSON.parse(localStorage.getItem('transactions') || '[]') });
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
};

export const logout = () => {
    authStore.set({ isAuthenticated: false, user: null, transactions: JSON.parse(localStorage.getItem('transactions') || '[]') });
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
};