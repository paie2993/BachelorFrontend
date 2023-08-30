import { Grid, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import React, { useEffect } from 'react'
import './text.css'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import TreeViewAddingDefinitions from './TreeViewAddingDefinitions'

const url = "http://localhost:5000"
const add_word_to_user_dictionary_url = 'http://localhost:5000/user/dictionary/add'

const TextPresentation = (props) => {

    return (
        <Paper className="display-line-break" sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Typography align='justify'>
                {props.text}
            </Typography>
        </Paper>
    )
}



// on the left, the complete text
// on the right, the unknown words
export default function TextPage() {

    const location = useLocation()
    const title = location.state.title

    const definitions_url = `${url}/text/definitions/${title}`
    const text_content_url = `${url}/texts/content/${title}`

    const [text, setText] = useState('')
    const [wordsPosDefinitions, setWordsPosDefinitions] = useState([])

    useEffect(() => {
        fetch(text_content_url)
            .then(data => data.text())
            .then(data => setText(data))
    }, [text_content_url])

    useEffect(() => {
        fetch(definitions_url)
            .then(data => data.json())
            .then(data => setWordsPosDefinitions(data))
    }, [definitions_url])

    function onWordActionClick(word) {
        const url = `${add_word_to_user_dictionary_url}/${word}`
        fetch(url).then(_ => {
            const index = wordsPosDefinitions.findIndex((element) => element.word === word)
            const wordsPosDefinitionsCopy = wordsPosDefinitions.slice()
            wordsPosDefinitionsCopy.splice(index, 1)
            setWordsPosDefinitions(wordsPosDefinitionsCopy)
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextPresentation text={text} />
            </Grid>
            <Grid item xs={6}>
                <TreeViewAddingDefinitions 
                wordsPosDefinitions={wordsPosDefinitions} 
                onWordActionClick={onWordActionClick}
                />
            </Grid>
        </Grid>
    )
}