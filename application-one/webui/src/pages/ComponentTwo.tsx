import React from "react";
import { PageContainer } from "../components/layout/PageContainer";
import ContentSection from "../components/layout/ContentSection";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import { Visibility } from "@mui/icons-material";


const rows = [
    {name: '19 Hope st', account: '0001', controlRoom: 'Some control room number 1', bureau: 'Some bureau number 1'},
    {name: '20 John st', account: '0001', controlRoom: 'Some control room number 1', bureau: 'Some bureau number 1'},
    {name: '41 Jill st', account: '0001', controlRoom: 'Some control room number 1', bureau: 'Some bureau number 2'},
    {name: '52 Mark st', account: '0001', controlRoom: 'Some control room number 2', bureau: 'Some bureau number 2'},
    {name: '63 Mitch st', account: '0001', controlRoom: 'Some control room number 2', bureau: 'Some bureau number 2'},
    {name: '74 Bob st', account: '0001', controlRoom: 'Some control room number 3', bureau: 'Some bureau number 2'},
    {name: '85 Bill st', account: '0001', controlRoom: 'Some control room number 3', bureau: 'Some bureau number 2'},
    {name: '96 Jane st', account: '0001', controlRoom: 'Some control room number 3', bureau: 'Some bureau number 3'},
    {name: '107 Barry st', account: '0001', controlRoom: 'Some control room number 3', bureau: 'Some bureau number 3'},
    {name: '118 Barney st', account: '0001', controlRoom: 'Some control room number 3', bureau: 'Some bureau number 3'},
]

const ComponentTwo = () => {
    return (
        <PageContainer title={'Route two'}>
                <ContentSection title={'Dummy data two'}>
                    <TextField placeholder={'Search'} size={'small'} style={{ width: '300px'}}/>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size={'small'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Account</TableCell>
                                    <TableCell>Control room</TableCell>
                                    <TableCell>Bureau</TableCell>
                                    <TableCell align={'right'}/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component={'th'} scope={'row'}>{row.name}</TableCell>
                                        <TableCell >{row.account}</TableCell>
                                        <TableCell>{row.controlRoom}</TableCell>
                                        <TableCell>{row.bureau}</TableCell>
                                        <TableCell align={'right'}><Visibility/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component={'div'}
                            count={rows.length}
                            rowsPerPage={10}
                            page={0}
                            onPageChange={() => {}}
                            onRowsPerPageChange={() => {}}
                        />
                    </TableContainer>
                </ContentSection>
        </PageContainer>
    )
}

export default ComponentTwo;