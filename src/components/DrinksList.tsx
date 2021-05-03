import {
    useState
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
} from '@material-ui/core'

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import ClearAllIcon from '@material-ui/icons/ClearAll';

import clsx from 'clsx'

import useStyles from "../theme/styles";

import { Drink } from "../Drink";
import { Link } from "react-router-dom";

interface DrinksListProps {
    drinks: Drink[]
    deleteDrink: (id: number) => void
    deleteAllDrinks: () => void
}

const DrinksList: React.FC<DrinksListProps> = (props) => {
    const classes = useStyles()

    const [editMode, setEditMode] = useState(false)

    function deleteAllDrinks() {
        props.deleteAllDrinks()
        setEditMode(false)
    }

    const NoDrinksMessage = () => (
        <Button color='secondary' fullWidth component={Link} to='/add' className={classes.message}>
            Lägg till dricka
        </Button>
    )

    const DrinksTable = () => (
        <TableContainer className={classes.containedTable}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='right'>Cl</TableCell>
                        <TableCell align='right'>%</TableCell>
                        <TableCell align='right'>
                            <IconButton 
                                onClick={deleteAllDrinks}
                                className={clsx(classes.listIconButton, editMode || classes.hidden)}
                                >
                                <ClearAllIcon color='error' />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.drinks.map((d, i) => (
                        <TableRow key={d.timestamp}>
                            <TableCell align='right'>
                                {d.volumeCl.toFixed(0)}
                            </TableCell>
                            <TableCell align='right'>
                                {d.alcoholPercent.toFixed(d.alcoholPercent < 10 ? 1 : 0)}
                            </TableCell>
                            <TableCell align='right'>
                                <IconButton 
                                    size='small' 
                                    onClick={() => props.deleteDrink(i)} 
                                    className={clsx(classes.listIconButton, editMode || classes.hidden)}
                                    >
                                    <DeleteForeverOutlinedIcon color='error' />
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
                props.drinks.length === 0
                    ? <NoDrinksMessage />
                    : <>
                        <Toolbar variant='dense'>
                            <Typography variant='h6' className={classes.title}>Drickalista</Typography>
                            <Button color='secondary' onClick={() => setEditMode(!editMode)}>
                                {editMode ? 'Klar' : 'Redigera'}
                            </Button>
                        </Toolbar>

                        <DrinksTable />
                    </>
            }
        </Paper>
    )
}

export default DrinksList
