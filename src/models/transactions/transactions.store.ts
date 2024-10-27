import { atom } from 'nanostores';
import { Transaction } from './transactions.model';

const initialTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');

export const transactionsStore = atom<Transaction[]>(initialTransactions);

export const setTransactions = (transactions: Transaction[]) => {
    transactionsStore.set(transactions);
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

export const addTransaction = (transaction) => {
    const currentTransactions = transactionsStore.get();
    const updatedTransactions = [...currentTransactions, transaction];
    setTransactions(updatedTransactions); 
};

export const deleteTransaction = (id) => {
    const currentTransactions = transactionsStore.get();
    const updatedTransactions = currentTransactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions); 
};
