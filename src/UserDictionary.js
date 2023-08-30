import { Paper } from "@mui/material"
import { useEffect, useState } from "react"
import './index.css'
import TreeViewRemovingDefinitions from "./TreeViewRemovingDefinitions"
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const dictionary_url = 'http://localhost:5000/user/dictionary'
const remove_word_from_user_dictionary_url = 'http://localhost:5000/user/dictionary/remove'

function sortLexicographically(dictionary) {
    console.log(dictionary)
    return dictionary?.sort((a, b) => {
        const first = a['word'].toUpperCase()
        const second = b['word'].toUpperCase()
        if (first < second) {
            return -1
        } else {
            return 1
        }
    }) ?? 0
}

function filterByText(text, dictionary) {
    if (text === '') {
        return dictionary
    } else {
        return dictionary.filter((wordWithDefinitions) => wordWithDefinitions.word.includes(text))
    }
}

export default function UserDictionary() {

    const [userDictionary, setUserDictionary] = useState([])
    const [filtered, setFiltered] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        fetch(dictionary_url)
            .then(data => data.json())
            .then(data => {
                const sortedDictionary = sortLexicographically(data)
                setUserDictionary(sortedDictionary)
                setFiltered(sortedDictionary)
            })
    }, [])

    useEffect(() => {
        const filteredDictionary = filterByText(query, userDictionary)
        setFiltered(filteredDictionary)
    }, [query])

    useEffect(() => {
        const filteredDictionary = filterByText(query, userDictionary)
        setFiltered(filteredDictionary)
    }, [userDictionary])

    function onWordActionClick(word) {
        const url = `${remove_word_from_user_dictionary_url}/${word}`
        fetch(url).then(_ => {
            const index = userDictionary.findIndex((element) => element.word === word)
            const userDictionaryCopy = userDictionary.slice()
            userDictionaryCopy.splice(index, 1)
            setUserDictionary(userDictionaryCopy)
        })
    }

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
                    My Dictionary
                </Typography>
                <TextField
                    id="search-by-text"
                    label="Search"
                    variant="standard"
                    onChange={(event) => setQuery(event.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <TreeViewRemovingDefinitions
                wordsPosDefinitions={filtered}
                onWordActionClick={onWordActionClick} />
        </Paper>
    )
}