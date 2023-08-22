import React from "react";
import { PageContainer } from "../components/layout/PageContainer";
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
import ContentSection from "../components/layout/ContentSection";

const gotCharacters = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]
const ComponentOne = () => {
    return (
        <PageContainer title={'Route one'}>
            <ContentSection title={'Dummy data one'}>
                <TextField placeholder={'Search'} size={'small'} style={{ width: '300px'}}/>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size={'small'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>First name</TableCell>
                                <TableCell>Last name</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell align={'right'}/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gotCharacters.map((character) => (
                                <TableRow
                                    key={character.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component={'th'} scope={'row'}>{character.firstName || '-'}</TableCell>
                                    <TableCell component={'th'} scope={'row'}>{character.lastName || '-'}</TableCell>
                                    <TableCell >{character.age || '-'}</TableCell>
                                    <TableCell align={'right'}><Visibility/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component={'div'}
                        count={gotCharacters.length}
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

export default ComponentOne;