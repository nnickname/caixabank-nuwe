import { render, screen} from '@testing-library/react';
import {expect, jest, test} from '@jest/globals';
import '@testing-library/jest-dom';
import * as React from "react";
import LoginForm from '../../src/modules/auth/components/login_form';
test('renders login form', () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
