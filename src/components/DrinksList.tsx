import {
    useContext,
    useState,
} from "react"

import {
    Button,
    IconButton,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Toolbar,
    Typography,
} from "@material-ui/core"

import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined"
import ClearAllIcon from "@material-ui/icons/ClearAll"

import clsx from "clsx"

import { Link } from "react-router-dom"
import { PomillenContext } from "../pomillen/contexts"
import useStyles from "../theme/styles"


const DrinksList: React.FC = () => {
    const classes = useStyles()
    const pomillenDrinks = useContext(PomillenContext)

    const [editMode, setEditMode] = useState(false)

    function localDeleteAllDrinks() {
        pomillenDrinks.deleteAllDrinks()
        setEditMode(false)
    }

    const NoDrinksMessage = () => (
        <Button color="secondary" fullWidth component={Link} to="/add" className={classes.message}>
            Lägg till dricka
        </Button>
    )

    function formatTime(d: Date): string {
        const hours = d.getHours().toString().padStart(2, "0")
        const mins = d.getMinutes().toString().padStart(2, "0")

        return `${hours}.${mins}`
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
                            <TableCell>
                                {formatTime(new Date(d.timestamp))}
                            </TableCell>
                            <TableCell align="right">
                                {d.volumeCl.toFixed(0)}&nbsp;cl
                            </TableCell>
                            <TableCell align="right">
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
        <Paper>
            {
                pomillenDrinks.drinks.length === 0
                    ? <NoDrinksMessage />
                    : <>
                        <Toolbar variant="dense">
                            <Typography variant="h6" className={classes.title}>Drickalista</Typography>
                            <Button color="secondary" onClick={() => setEditMode(!editMode)}>
                                {editMode ? "Klar" : "Redigera"}
                            </Button>
                        </Toolbar>

                        <DrinksTable />
                    </>
            }
        </Paper>
    )
}

export default DrinksList
