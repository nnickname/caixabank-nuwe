import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Transaction } from '../../../models/transactions/transactions.model';

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

const NotificationModal: React.FC<NotificationModalProps> = ({ open, onClose, transactions }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Transacciones Recientes</DialogTitle>
      <DialogContent>
        <List>
          {transactions.map((transaction) => (
            <ListItem key={transaction.id}>
              <ListItemText
                primary={transaction.description}
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" color="text.primary">
                      {new Date(transaction.date).toLocaleDateString('en-US')}
                    </Typography>
                    {" — "}€{transaction.amount.toFixed(2)}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
