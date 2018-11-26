export class Loan {
  userName?: String;
  loanName?: string;
  loanAmount?: number;
  loanPayment?: number; // the minimum loan payment
  interest?: number;
  paymentDay?: number;
  paid?: number;
  loanDescription?: string;
  loanPaidAmt: number; // the amount paid into the loan
  loanBalance: number; // the amount left on the loan
}
