import { Paper } from "@mui/material"
import { useEffect, useState } from "react"
import './index.css'
import TreeViewAddingDefinitions from "./TreeViewAddingDefinitions"
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const dictionary_url = 'http://localhost:5000/dictionary'
const add_word_to_user_dictionary_url = 'http://localhost:5000/user/dictionary/add'

function sortLexicographically(dictionary) {
    return dictionary.sort((a, b) => {
        const first = a['word'].toUpperCase()
        const second = b['word'].toUpperCase()
        if (first < second) {
            return -1
        } else {
            return 1
        }
    })
}

function filterByText(text, dictionary) {
    return dictionary.filter((wordWithDefinitions) => wordWithDefinitions.word.includes(text))
}

function onWordActionClick(word) {
    const url = `${add_word_to_user_dictionary_url}/${word}`
    fetch(url)
}

export default function Dictionary() {

    const [dictionary, setDictionary] = useState([])
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        fetch(dictionary_url)
            .then(data => data.json())
            .then(data => {
                const sortedDictionary = sortLexicographically(data)
                setDictionary(sortedDictionary)
                setFiltered(sortedDictionary)
            })
    }, [])

    return (
        <Paper className="display-line-break" sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around'
            }}>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Dictionary
                </Typography>
                <TextField id="search-by-text" label="Search" variant="standard" onChange={(event) => setFiltered(filterByText(event.target.value, dictionary))}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <TreeViewAddingDefinitions wordsPosDefinitions={filtered} onWordActionClick={onWordActionClick}/>
        </Paper>
    )
}