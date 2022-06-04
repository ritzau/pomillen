import {
    useContext,
    useState,
} from "react"


import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import ClearAllIcon from '@mui/icons-material/ClearAll'

import { useNavigate } from "react-router-dom"

import clsx from "clsx"

import { Link } from "react-router-dom"
import { PomillenContext } from "../pomillen/contexts"
import useStyles from "../theme/styles"


const DrinksList: React.FC = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const pomillenDrinks = useContext(PomillenContext)

    const [editMode, setEditMode] = useState(false)

    function localDeleteAllDrinks() {
        pomillenDrinks.deleteAllDrinks()
        setEditMode(false)
    }

    const NoDrinksMessage = () => (
        <Box display="flex" justifyContent="center">
            <Button color="primary" variant="contained" component={Link} to="/add">
                Lägg till dricka
            </Button>
        </Box>
    )

    function formatTime(d: Date): string {
        const hours = d.getHours().toString().padStart(2, "0")
        const mins = d.getMinutes().toString().padStart(2, "0")

        return `${hours}.${mins}`
    }

    function edit(id: number) {
        if (editMode) navigate(`/edit/${id}`)
    }

    const DrinksTable = () => (
        <TableContainer className={classes.containedTable}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tid</TableCell>
                        <TableCell align="right">Cl</TableCell>
                        <TableCell align="right">%</TableCell>
                        <TableCell align="right">
                            <IconButton
                                onClick={localDeleteAllDrinks}
                                className={clsx(classes.listIconButton, editMode || classes.hidden)}
                            >
                                <ClearAllIcon color="error" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pomillenDrinks.drinks.map((d, i) => (
                        <TableRow key={d.timestamp}>
                            <TableCell onClick={() => edit(i)}>
                                {formatTime(new Date(d.timestamp))}
                            </TableCell>
                            <TableCell align="right" onClick={() => edit(i)}>
                                {d.volumeCl.toFixed(0)}&nbsp;cl
                            </TableCell>
                            <TableCell align="right" onClick={() => edit(i)}>
                                {d.alcoholPercent.toFixed(d.alcoholPercent < 10 ? 1 : 0)}&nbsp;%
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    size="small"
                                    onClick={() => pomillenDrinks.deleteDrink(i)}
                                    className={clsx(classes.listIconButton, editMode || classes.hidden)}
                                >
                                    <DeleteForeverOutlinedIcon color="error" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    return (
        <>
            {
                pomillenDrinks.drinks.length === 0
                    ? <NoDrinksMessage />
                    : <>
                        <Toolbar variant="dense">
                            <Typography variant="h6" className={classes.title}>Drickalista</Typography>
                            <Button onClick={() => setEditMode(!editMode)}>
                                {editMode ? "Klar" : "Redigera"}
                            </Button>
                        </Toolbar>

                        <DrinksTable />
                    </>
            }
        </>
    )
}

export default DrinksList
