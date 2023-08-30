import { TreeItem } from "@mui/lab"

function formatDefinition(index, definition) {
    return `${index}. ${definition}`
}

const SingleDefinition = (props) => {
    const index = props.index
    const definition = props.definition
    const formattedLabel = formatDefinition(index, definition)
    return <TreeItem nodeId={definition} label={formattedLabel} />
}

function buildDefinitionsTreeItemList(definitions) {
    return (
        definitions?.map((definition, index) => <SingleDefinition key={definition} index={index + 1} definition={definition} />)
        ?? <div />
    )
}

const SinglePosDefinitionsPair = (props) => {

    const word = props.word // string
    const pos = props.pos // string
    const definitions = props.definitions // list

    return (
        <TreeItem nodeId={word.concat(pos)} label={pos}>
            {buildDefinitionsTreeItemList(definitions)}
        </TreeItem>
    )
}

export default function buildSinglePosDefinitionsPairList(word, posDefinitionsPairs) {
    return (
        posDefinitionsPairs?.map((posDefinitionsPair) => {
            const pos = posDefinitionsPair.pos
            const definitions = posDefinitionsPair.definitions
            return <SinglePosDefinitionsPair key={pos} word={word} pos={pos} definitions={definitions} />
        })
        ?? <div />
    )
}