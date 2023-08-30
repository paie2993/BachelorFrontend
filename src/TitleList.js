import * as React from 'react';
import { ListItemText, ListItem, ListItemButton } from '@mui/material';
import List from '@mui/material/List'
import ClassIcon from '@mui/icons-material/Class';
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const url = "http://localhost:5000"
const text_names = `${url}/texts/names`

const Item = (title) => {
  return (
    <Link to={`/texts/content/${title}`} key={title} state={{ title: title }}>
      <ListItem>
        <ListItemButton>
          <ClassIcon />
          <ListItemText sx={{ p: 1 }} primary={title} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}



const TitlesList = () => {

  const [titles, setTitles] = useState([])

  useEffect(() => {
    fetch(text_names)
      .then(data => data.json())
      .then(data => setTitles(data))
  }, [])

  return (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <List>
        {titles.map((title) =>
          Item(title))
        }
      </List>
    </Paper>
  );
}

export default TitlesList



