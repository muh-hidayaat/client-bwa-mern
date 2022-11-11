import { Route, Routes } from 'react-router-dom';

import Payments from '../pages/payments/index';
import Create from '../pages/payments/create';
import Edit from '../pages/payments/edit';

export function PaymentsRoute() {
  return (
    <Routes>
      <Route path="/" element={<Payments />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:paymentId" element={<Edit />} />
    </Routes>
  );
}
