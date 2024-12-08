import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

function Todo() {

    //add new task

    let [todos, setTodos] = useState([{task: "sample task", id: uuidv4(), isDone: false}]);
    let [newTodo, setNewTodo] = useState("")

    let addNewTask = () => {
        setTodos((preTodo) => {
            return [...preTodo, {task: newTodo, id: uuidv4(), isDone: false}]
        });
        setNewTodo("")
    }

    let updateTodoValue = (event) => {
        console.log(event.target.value)
        setNewTodo(event.target.value);
    }

    //delte task

    let deleteTask = (id) => {
      setTodos((preTodo) => {
        return [...preTodo.filter((todo)=> todo.id != id)]
      })
    }

    //edit todo

    let [editId, setEditId] = useState(null)
    let [editValue, setEditValue] = useState("")

    let editTodo = (id, task) => {
      setEditId(id)
      setEditValue(task)
    }

    let saveEdit = (id) => {
      setTodos((preTodo) => 
        preTodo.map((todo) =>
          todo.id == id ? 
          { ...todo, task: editValue} : todo
        )
      )
      setEditId(null)
      setEditValue("")
    }

    //mark as done

    let MarkAsDone = (id) => {
      setTodos((preTodo) =>
        preTodo.map((todo) =>
          todo.id == id ? 
          {...todo, isDone: true} : todo
        )
      )
    }

    return (
      <>
      <h2>TODO</h2>
      <input type="text"  placeholder="add new task" value={newTodo} onChange={updateTodoValue}/>
      &nbsp;
      <button onClick={addNewTask}>Add</button>
      <br />
      <hr />
      <h4>Task</h4>
      {/* {console.log(todos[0].task)} */}
      <ul style={{listStyleType: "none",
        paddingLeft: "0"
      }}>
        {
            todos.map((todo) => (
                <li key={todo.id}> 
                  {
                    editId === todo.id ? (
                      <input type="text" value={editValue} 
                      onChange={(event) => setEditValue(event.target.value)} />
                    ) : (
                       <span style={todo.isDone ? {textDecoration: "line-through"} : {}}>{todo.task}</span>
                    )
                  }
                   &nbsp;
                   {
                  <button onClick={() => MarkAsDone(todo.id)}>Done</button>
                  }

                  &nbsp; 
                    {
                      editId === todo.id ? (
                        <button onClick={() => saveEdit(todo.id)}>Save edit</button>
                      ) : (
                        <button onClick={() => editTodo(todo.id, todo.task)}>Update</button>
                      )
                    }
                    <button onClick={() => deleteTask(todo.id)}>delete</button>
                </li>
            ))
        }

      </ul>
      </>
    )
  }
  
  export default Todo