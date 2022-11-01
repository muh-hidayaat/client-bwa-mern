import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import SAlert from '../../components/Alert';
import { useNavigate, Navigate } from 'react-router-dom';
import { config } from '../../configs';
import SForm from './form';

function PageSignin() {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    message: '',
    type: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${config.api_host_dev}/cms/auth/signin`,
        form
      );

      localStorage.setItem('token', res.data.data.token);
      console.log(res);
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      setAlert({
        status: true,
        message: err?.response?.data?.msg ?? 'Internal server error',
        type: 'danger',
      });
    }
  };

  if (token) return <Navigate to="/" replace={true} />;

  return (
    <Container md={12}>
      <div className="m-auto" style={{ width: '50%' }}>
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
      </div>
      <Card style={{ width: '50%' }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Form Signin</Card.Title>
          <SForm
            form={form}
            handleChange={handleChange}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}
export default PageSignin;
