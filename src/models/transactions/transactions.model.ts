export class Transaction {
  id: string;
  amount: number;
  date: Date;
  description: string;
  type: 'income' | 'expense';
  category: string;
  
  constructor(
    id: string,
    amount: number,
    date: Date,
    description: string,
    type: 'income' | 'expense',
    category: string
  ) {
    this.id = id;
    this.amount = amount;
    this.date = date;
    this.description = description;
    this.type = type;
    this.category = category;
  }
}

