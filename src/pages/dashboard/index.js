import React from 'react';
import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/Breadcrumb';
import SNavbar from '../../components/Navbar';

export default function Dashboard() {
  return (
    <>
      <SNavbar />
      <Container className="mt-3">
        <SBreadCrumb />
      </Container>
    </>
  );
}
