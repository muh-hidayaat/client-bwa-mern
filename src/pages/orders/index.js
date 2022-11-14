import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, setPage } from '../../redux/orders/actions';
import { fetchListEvents } from '../../redux/lists/actions';
import { Container } from 'react-bootstrap';

//Pakai filter tanggal

// import { formatDate } from '../../utils/formatDate';
// import { fetchOrders, setPage, setDate } from '../../redux/orders/actions';
// import { Col, Container, Row } from 'react-bootstrap';
// import DateRange from '../../components/InputDate';
// import SearchInput from '../../components/SearchInput';

function OrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders);

  // let [isShowed, setIsShowed] = React.useState(false);

  useEffect(() => {
    return () => {
      if (!user.token) return navigate('/login');
    };
  });

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch, orders.page, orders.date]);

  useEffect(() => {
    dispatch(fetchListEvents());
  }, [dispatch]);

  // const displayDate = `${
  //   orders.date?.startDate ? formatDate(orders.date?.startDate) : ''
  // }${orders.date?.endDate ? ' - ' + formatDate(orders.date.endDate) : ''}`;

  return (
    <Container className="mt-3">
      <Button action={() => navigate('/orders/create')}>Tambah</Button>
      <BreadCrumb textSecond={'Orders'} />
      {/* <Row>
        <Col
          className="cursor-pointer position-relative"
          onClick={() => setIsShowed(true)}
        >
          <SearchInput disabled query={displayDate} />
          {isShowed ? (
            <DateRange
              date={orders.date}
              setIsShowed={() => setIsShowed(!isShowed)}
              onChangeDate={(ranges) => dispatch(setDate(ranges.selection))}
            />
          ) : (
            ''
          )}
        </Col>
        <Col></Col>
        <Col></Col>
      </Row> */}

      <Table
        status={orders.status}
        thead={[
          'Nama',
          'Email',
          'Judul',
          'Tanggal Event',
          'Tanggal Order',
          'Tempat',
        ]}
        data={orders.data}
        tbody={['name', 'email', 'title', 'date', 'orderDate', 'venueName']}
        pages={orders.pages}
        actionNotDisplay
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
      />
    </Container>
  );
}

export default OrderPage;
