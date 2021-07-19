import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function monthDosCifras() {
    let month = new Date().getMonth()
    return month < 10 ? '0' + `${month + 1}` : month

}

const elementos = [1,2,4,5,6,10,50,24,25,100]

function handelFilter (e) {
    for (var i = 0; i < elementos.length; i++) {
        if (e == elementos[i]) {
            return elementos[i]
        }
    }
}

export default function Detalles(props) {
    const classes = useStyles();


    console.log("que es esto", props)


    function precio_unitario(row) {

        const precio_init = row.__EMPTY_1
        const match1 = row.__EMPTY.match(/(\d+)/g).filter((e) => e==handelFilter(e)).length > 0 ? row.__EMPTY.match(/(\d+)/g).filter((e) => e==handelFilter(e)) : ['1']
        const match_unidad = parseFloat(match1)
        const precio_1 = (precio_init) / (match_unidad === 5||6||1||10||24||25||50||100 ? match_unidad : 1)
        const precio_iva = (precio_1 + (0.21 * precio_1))
        const precio_final = parseFloat(`${precio_iva + ((props.porcentaje / 100) * precio_iva)}`).toFixed(2)

        // console.log(precio_init, "precio_int")
        // console.log(match1, "match1")
        // console.log(row.__EMPTY.match(/(\d+)/g).filter((e) => e == handelFilter(e)), "probando")
        // console.log(row.__EMPTY.match(/x(\d+)/g), "con coma")
        // console.log(match_unidad, "match_unidad")
        // console.log(precio_1, "precio_1")
        // console.log(precio_iva, "precio_iva")
        // console.log(precio_final, "precio_final")


        return precio_final
    }


    function precio_bulto(row) {
        const precio_1 = row.__EMPTY_1
        const precio_iva = (precio_1 + (0.21 * precio_1))
        const precio_final = parseFloat(`${precio_iva + ((props.porcentaje / 100) * precio_iva)}`).toFixed(2)

        return precio_final
    }


    if (props.Results_Array) {

        return (

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Codigo</StyledTableCell>
                            <StyledTableCell align="right">Nombre Producto</StyledTableCell>
                            <StyledTableCell align="right">Precio por Bulto</StyledTableCell>
                            <StyledTableCell align="right">Precio Unitario</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.Results_Array.map((row) => (
                            <StyledTableRow key={row[`PRECIOS AL ${new Date().getDate()}/${monthDosCifras()}/${new Date().getFullYear()}`]}>
                                <StyledTableCell component="th" scope="row">
                                    {row[`PRECIOS AL ${new Date().getDate()}/${monthDosCifras()}/${new Date().getFullYear()}`]}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.__EMPTY}</StyledTableCell>
                                <StyledTableCell align="right">{precio_bulto(row)}</StyledTableCell>
                                <StyledTableCell align="right">{precio_unitario(row)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        )

    } else {
        return (
            <div>
                <h1>
                    Todavia no cargaste el Archivo
                </h1>
            </div>
        )

    }

}