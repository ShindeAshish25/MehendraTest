import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2'

function createData(ID, Date, Branch, Type, Amount, Bank, Requested, Status, Action) {
    return { ID, Date, Branch, Type, Amount, Bank, Requested, Status, Action };
}

const rows = [
    createData(124235, '19/04/2023', 'Thane', 'Full', '547890', 'CMV HDFC 1223562', 'Sharad Varma', 'Pending'),
    createData(563233, '20/06/2023', 'Navi Mumbai', 'Full', '246732', 'UYT SCB 632786433', 'Pramod Mehata', 'Approved'),
    createData(213352, '22/07/2023', 'Mumbai', 'Short', '553672', 'OIT HDFC 6732647333', 'Vikas Singh', 'rejected'),
    createData(565223, '19/08/2023', 'Kurla', 'Full', '197146', 'YTF SBI 654426545', 'Shard Shivastav', 'Approved'),
    createData(754833, '11/04/2023', 'Vile parle', 'Full', '242178', 'PHS SBI 46465416', 'Vikas Mehata', 'Approved'),
    createData(367323, '15/03/2023', 'Lower Parel', 'Short', '643211', 'PDS HDFC 96233321', 'Shard kapoor', 'rejected'),
    createData(748333, '17/08/2023', 'Andheri', 'Full', '842789', 'GBG HDFC 3548225', 'Pramod Mahtur', 'Approved'),
    createData(367324, '12/09/2023', 'Byculla', 'Full', '642843', 'MGB SCB 8984252', 'Vikas Shethi', 'Approved'),
];

function AdminPanel() {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [branch, setBranch] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);
    const [data, setData] = useState(rows);

    // const date = new Date('2017-4-28');
    // const start = new Date(fromDate);
    // const end = new Date(toDate);

    // if (date > start && date < end) {
    //     console.log('in between');
    // } else {
    //     console.log('outside');
    // }
    console.log(data);

    const handleDateChange = (date, type) => {
        if (type === 'from') {
            console.log(date);
            setFromDate(dateFormater(date.$d));
        } else {
            if (fromDate && date < fromDate) {
                return;
            }
            setToDate(dateFormater(date.$d));
        }
    };

    const handleBranchChange = (e) => {
        setBranch(e.target.value);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    
        const isDateInRange = (dateToCheck, startDate, endDate) => {
            const checkDate = new Date(dateToCheck);
            const start = new Date(startDate);
            const end = new Date(endDate);

            return checkDate >= start && checkDate <= end;
        };
        const currentDate = new Date();
        const startDate = '2020-08-01'; // Replace with your start date
        const endDate = '2020-08-31';   // Replace with your end date

        const result = isDateInRange(currentDate, startDate, endDate);


    const handleDelete = (id) => {
        const updatedRows = filteredRows.filter((row) => row.ID !== id);
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'

                )
                setFilteredRows(updatedRows);
            }
        })
    };

    const dateFormater = (day) => {
		let date
		if (day == null) {
			date = new Date('');
            return null;
		} else {
			date = new Date(day)
		}
		let month = date.getMonth()
		month++;

		if (month < 10) {
			month = '0' + month;
		}
		let dayy = date.getDate()

		if (dayy < 10) {
			dayy = '0' + dayy
		}
		return date.getFullYear() + '-' + month + '-' + dayy
	}

    useEffect(() => {
        const filtered = rows.filter((row) => {
            const fromDateMatch = !fromDate || dateFormater(row.Date) >= fromDate ;
            const toDateMatch = !toDate || dateFormater(row.Date) <= toDate
            const branchMatch = !branch || row.Branch.toLowerCase() === branch.toLowerCase();
            const typeMatch = !type || row.Type.toLowerCase() === type.toLowerCase();
            const statusMatch = !status || row.Status.toLowerCase() === status.toLowerCase();

            return fromDateMatch && toDateMatch && branchMatch && typeMatch && statusMatch;
        });

        setFilteredRows(filtered);
    }, [fromDate, toDate, branch, type, status]);

    return (
        <>
            <div className='main'>
            <h3 className='text-center'>Admin panel to view the data of transactions paid by the customer.</h3>

                <div className='filer-container my-5'>
                    <div className='row'>
                        <div className='col-auto'>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker label="Form"
                                            value={fromDate}
                                            onChange={(date) => handleDateChange(date, 'from')}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className='col-auto'>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="To"
                                            value={toDate}
                                            onChange={(date) => handleDateChange(date, 'to')}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className='col-auto'>
                            <div>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Branch</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={branch}
                                        onChange={handleBranchChange}
                                        label="Branch"
                                    >
                                        <MenuItem value="">
                                            <em>All</em>
                                        </MenuItem>
                                        <MenuItem value={'Thane'}>Thane</MenuItem>
                                        <MenuItem value={'Navi mumbai'}>Mavi mumbai</MenuItem>
                                        <MenuItem value={'Mumbai'}>Mumbai</MenuItem>
                                        <MenuItem value={'Kurla'}>Kurla</MenuItem>
                                        <MenuItem value={'Vile parle'}>Vile parle</MenuItem>
                                        <MenuItem value={'Lower parel'}>Lower parel</MenuItem>
                                        <MenuItem value={'Andheri'}>Andheri</MenuItem>
                                        <MenuItem value={'Byculla'}>Byculla</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className='col-auto'>
                            <div>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={type}
                                        onChange={handleTypeChange}
                                        label="Type"
                                    >
                                        <MenuItem value="">
                                            <em>All</em>
                                        </MenuItem>
                                        <MenuItem value={'Full'}>Full</MenuItem>
                                        <MenuItem value={'Short'}>Short</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className='col-auto'>
                            <div>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={status}
                                        onChange={handleStatusChange}
                                        label="Status"
                                    >
                                        <MenuItem value="">
                                            <em>All</em>
                                        </MenuItem>
                                        <MenuItem value={'pending'}>Pending</MenuItem>
                                        <MenuItem value={'approved'}>Approved</MenuItem>
                                        <MenuItem value={'rejected'}>Rejected</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">

                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Branch</TableCell>
                                <TableCell align="left">Type</TableCell>
                                <TableCell align="left">Amount (In Rupees)</TableCell>
                                <TableCell align="left">Bank</TableCell>
                                <TableCell align="left">Requested By (Employee Code )</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.ID}
                                    </TableCell>
                                    <TableCell align="left">{row.Date}</TableCell>
                                    <TableCell align="left">{row.Branch}</TableCell>
                                    <TableCell align="left">{row.Type}</TableCell>
                                    <TableCell align="left">{row.Amount}</TableCell>
                                    <TableCell align="left">{row.Bank}</TableCell>
                                    <TableCell align="left">{row.Requested}</TableCell>
                                    <TableCell align="left">{row.Status}</TableCell>
                                    <TableCell align="left">
                                        <Grid item xs={8}>
                                            <HighlightOffIcon className='currsore-pointer' onClick={() => handleDelete(row.ID)} />
                                        </Grid>
                                    </TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
export default AdminPanel;
