import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Table, Spinner } from 'react-bootstrap';
import SButton from '../../components/Button';
import SBreadCrumb from '../../components/Breadcrumb';
import SNavbar from '../../components/Navbar';
import axios from 'axios';
import { config } from '../../configs';

// import axios from 'axios';
// import { config } from '../../configs';
export default function CategoriesPage() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCategoriesAPI = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${config.api_host_dev}/cms/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsLoading(false);
        setData(res.data.data);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    getCategoriesAPI();
  }, []);

  if (!token) return <Navigate to="/signin" replace={true} />;

  return (
    <>
      <SNavbar />
      <Container className="mt-3">
        <SBreadCrumb textSecound="Categories" />

        <SButton action={() => navigate('/categories/create')}>Tambah</SButton>

        <Table className="mt-3" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={data.length + 1} style={{ textAlign: 'center' }}>
                  <div className="flex items-center justify-center">
                    <Spinner animation="grow" variant="light" />
                  </div>
                </td>
              </tr>
            ) : (
              data.map((data, index) => (
                <tr key={index}>
                  <td>{(index += 1)}</td>
                  <td>{data.name}</td>
                  <td>Otto</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
    // <>
    //   <SNavbar />
    //   <Container className="mt-3">
    //     <SBreadCrumb textSecond="Categories" />

    //     <SButton action={() => navigate('/categories/create')}>Tambah</SButton>

    //     <Table className="mt-3" striped bordered hover variant="dark">
    //       <thead>
    //         <tr>
    //           <th>No</th>
    //           <th>Name</th>
    //           <th>Action</th>
    //           <th>Username</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <td>1</td>
    //           <td>Mark</td>
    //           <td>0tto</td>
    //           <td>@mdo</td>
    //         </tr>
    //         <tr>
    //           <td>2</td>
    //           <td>Mark2</td>
    //           <td>0tto2</td>
    //           <td>@mdo2</td>
    //         </tr>
    //       </tbody>
    //     </Table>
    //   </Container>
    // </>
  );
}