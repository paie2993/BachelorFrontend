import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton, Paper } from '@mui/material';
import { Add } from '@mui/icons-material';
import Box from '@mui/material/Box';
import buildSinglePosDefinitionsPairList from './DefinitionsTreeItems';

const SingleWordPosDefinitions = (props) => {
    const wordPosDefinitions = props.wordPosDefinitions
    const word = wordPosDefinitions["word"]
    const posDefinitions = wordPosDefinitions["posDefinitions"]
    const onWordActionClick = props.onWordActionClick
    return (
        <Box sx={{
            p: 0.5,
            height: 'auto',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
        }}>
            <IconButton onClick={() => onWordActionClick(word)}>
                <Add />
            </IconButton>
            <TreeItem nodeId={word} label={word} sx={{
                p: 1,
                flexGrow: 1
            }}>
                {buildSinglePosDefinitionsPairList(word, posDefinitions)}
            </TreeItem>
        </Box>
    )
}

export default function ModifiableDefinitionsTreeView(props) {
    const wordsPosDefinitions = props.wordsPosDefinitions
    const onWordActionClick = props.onWordActionClick
    return (
        <Paper className="display-line-break" sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpanded={['root']}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ flexGrow: 1, overflowY: 'auto' }}
            >
                {wordsPosDefinitions?.map((wordPosDefinitions) => {
                    return <SingleWordPosDefinitions key={wordPosDefinitions.word}
                        wordPosDefinitions={wordPosDefinitions}
                        onWordActionClick={onWordActionClick} />
                }) ?? <div />}
            </TreeView>
        </Paper>
    )
}