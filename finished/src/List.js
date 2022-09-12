import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import React, { useState } from 'react'

export const List = () => {
  const todoItems = [
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

  const [todos, updateTodos] = useState(todoItems)

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    // console.log(result)
    const items = Array.from(todos)
    const [reorderedItem] = items.splice(result.source.index,  1)
    items.splice(result.destination.index, 0, reorderedItem)

    updateTodos(items)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map(({id, name }, index) => {
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