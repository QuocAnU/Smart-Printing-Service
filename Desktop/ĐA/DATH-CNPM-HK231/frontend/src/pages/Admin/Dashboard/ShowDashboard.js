 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

import './ShowDashboard.css'
import bookIcon from '../../../assets/image/bookIcon.png';
import userIcon from '../../../assets/image/userIcon.png';
import borrowIcon from '../../../assets/image/borrowIcon.png';
import axios from "axios";
import React, { useEffect, useState } from "react";

function ShowDashboard() {

    const [books, setBooks] = useState([]);
    const displayedBooks = books.slice(1, 7);

    useEffect(() => {
        axios.get('http://localhost:3001/books')
            .then(res => {
                console.log(res.data);
                setBooks(res.data)
            })
            .catch(err => {
            });
    }, []);

    const dataUser = [
        {
            id:1,
            name:'Lê Hoàng Anh Vũ',
            borrows: 24,
            returns: 20 
        },
        {
            id:2,
            name:'Lê Quốc An',
            borrows: 24,
            returns: 20 
        },
        {
            id:3,
            name:'Đỗ Văn Bâng',
            borrows: 24,
            returns: 20 
        },
        {
            id:4,
            name:'Trương Đức Dũng',
            borrows: 24,
            returns: 20 
        },
        {
            id:5,
            name:'Cù Hoàng Nguyễn Sơn',
            borrows: 24,
            returns: 20 
        },
        {
            id:6,
            name:'Nguyễn Tấn Cường',
            borrows: 24,
            returns: 20 
        },
        {
            id:7,
            name:'Lê Minh Thiên',
            borrows: 24,
            returns: 20 
        }
    ]
    const dataChart = [
        {
          name: 'Tháng 6',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Tháng 7',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Tháng 8',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Tháng 9',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Tháng 10',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Tháng 11',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Tháng 12',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
     

  return (
    <main className='container-fluid'>
        <div className='row mt-3 gx-5'>
            <div className='col'>
                <div className='d-flex flex-nowrap p-3 shadow rounded border border-secondary'>
                    <div style={{width:'fit-content'}}>
                        <img src={userIcon} class="img-fluid" style={{width:'75px',height:'75px'}}/>
                    </div>
                    <div class="card-body" style={{width:'calc(100% - 90px)', textAlign:'end'}}>
                        <h5 class="text-secondary">Tổng số người dùng</h5>
                        <p class="mt-4 fw-bold">220</p>
                    </div>
                </div>
            </div>
            <div className='col'>
                <div className='d-flex flex-nowrap p-3 shadow rounded border border-secondary'>
                    <div style={{width:'fit-content'}}>
                        <img src={bookIcon} class="img-fluid" style={{width:'75px',height:'75px'}}/>
                    </div>
                    <div class="card-body" style={{width:'calc(100% - 90px)', textAlign:'end'}}>
                        <h5 class="text-secondary">Tổng số sách</h5>
                        <p class="mt-4 fw-bold">220</p>
                    </div>
                </div>
            </div>
            <div className='col'>
                <div className='d-flex flex-nowrap p-3 shadow rounded border border-secondary'>
                    <div style={{width:'fit-content'}}>
                        <img src={borrowIcon} class="img-fluid" style={{width:'75px',height:'75px'}}/>
                    </div>
                    <div class="card-body" style={{width:'calc(100% - 90px)', textAlign:'end'}}>
                        <h5 class="text-secondary">Số lượt mượn / trả</h5>
                        <p class="mt-4 fw-bold">300/280</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={dataChart}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amt" fill="#8884d8" name='Số sách trả'/>
                <Bar dataKey="uv" fill="#82ca9d" name='Số sách mượn'/>
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={dataChart}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} name='Số lượt truy cập'/>
                <Line type="monotone" dataKey="amt" stroke="#82ca9d" name='Số sách mượn'/>
                </LineChart>
            </ResponsiveContainer>

        </div>

        <div className='row mt-3 gx-5'>
            <div className='col'>
                <div className='d-flex flex-nowrap p-3 shadow rounded border border-secondary'>
                    <Table>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#EEEEEE', textAlign: 'center', padding: '5px' }}>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Tên</TableCell>
                                <TableCell align="center">Số sách mượn</TableCell>
                                <TableCell align="center">Số sách trả</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataUser.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell style={{ padding: '5px' }} align="center">{user.id}</TableCell>
                                    <TableCell style={{ padding: '5px', width: '230px' }} align="center">{user.name}</TableCell>
                                    <TableCell style={{ padding: '5px' }} align="center">{user.borrows}</TableCell>
                                    <TableCell style={{ padding: '5px' }} align="center">{user.returns}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className='col'>
                <div className='d-flex flex-nowrap p-3 shadow rounded border border-secondary'>
                    <Table>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#EEEEEE', textAlign: 'center', padding: '5px' }}>
                                <TableCell align="center">ISBN</TableCell>
                                <TableCell align="center">Tiêu đề</TableCell>
                                <TableCell align="center">Lượt mượn</TableCell>
                                <TableCell align="center">Lượt trả</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedBooks.map((book) => (
                                <TableRow key={book.id}>
                                    <TableCell style={{ padding: '5px' }} align="center">{book.ISBN}</TableCell>
                                    <TableCell style={{ padding: '5px', width: '230px' }} align="center">{book.title}</TableCell>
                                    <TableCell style={{ padding: '5px' }} align="center">100</TableCell>
                                    <TableCell style={{ padding: '5px' }} align="center">90</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    </main>
  )
}

export default ShowDashboard