import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import React, { useState } from 'react'

export const List = () => {
  const finalSpaceCharacters = [
    {
      id: 'car-wash',
      name: '🚌 | Car wash',
    },
    {
      id: 'basketball',
      name: '🏀 | Play basketball',
    },
    {
      id: 'dog',
      name: '🦮 | Walk dog',
    },
    {
      id: 'writing',
      name: '✍️ | Write an article',
    },
    {
      id: 'movie',
      name: '🍿 | Watch a movie',
    }
  ]

  const [characters, updateCharacters] = useState(finalSpaceCharacters)

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    // console.log(result)
    const items = Array.from(characters)
    const [reorderedItem] = items.splice(result.source.index,  1)
    items.splice(result.destination.index, 0, reorderedItem)

    updateCharacters(items)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="characters">
        {(provided) => (
          <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
            {characters.map(({id, name }, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <p>{ name }</p>
                    </li>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}