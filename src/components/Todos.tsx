import styles from './todos.module.css'
import { PlusCircle } from 'phosphor-react'
import clipboard from '../assets/Clipboard.svg'
import { Todo } from './Todo'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'

interface ITodo {
  id: string
  content: string;
  isComplete: boolean;
}

export function Todos() {

  const dbTodo = localStorage.getItem('itens')

  const [getTodo, setGetTodo] = useState<ITodo>()
  const [todos, setTodos] = useState<ITodo[]>(()=>{
    
    if(dbTodo != null) return [...JSON.parse(dbTodo)]

    return []
  })
  const [todosComplete, setTodosComplete] = useState<ITodo[]>(
    ()=>{
    if(todos.length>=0){
      const tasksCompleted = todos.filter(task=>task.isComplete === true)
      return tasksCompleted
    }
    return []
    }
  )
  const [textAreaValue, setTextAreaValue] = useState('')
  
  function handleInvalidTodo(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Campo obrigatório')
  }

  function handleNewTodo(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');

    setTextAreaValue(event.target.value)
    setGetTodo({
      id: uuid(),
      content: event.target.value,
      isComplete: false
    })
    
    ;

  }

  function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault()
    //@ts-ignore
    setTodos([...todos, getTodo])
   
    localStorage.setItem('itens', JSON.stringify([...todos, getTodo]))
    setTextAreaValue('')
  }



  function deleteTodo(todo: ITodo) {
    const todoWithoutDeleteOne = todos.filter(todos => todos.id !== todo.id)
    console.log(todoWithoutDeleteOne)
    setTodos([...todoWithoutDeleteOne])
    localStorage.setItem('itens', JSON.stringify([...todoWithoutDeleteOne]))

    const completedTodosDeleted = todoWithoutDeleteOne.filter(todo => todo.isComplete === true)

    setTodosComplete([...completedTodosDeleted])
   

  }

  function handleSelectTodoCompleted(event: ChangeEvent<HTMLInputElement>) {


    const checkedTodos = todos.map(todo => {

      if (todo.id === event.target.value) todo.isComplete = event.target.checked
      return todo
    })
    setTodos([...checkedTodos])
    localStorage.setItem('itens', JSON.stringify([...checkedTodos]))
    const completedTodos = checkedTodos.filter(todo => todo.isComplete === true)

    setTodosComplete([...completedTodos])

  }
  const hasTodo = textAreaValue.length === 0

  return (
    <div className={styles.todos}>
      <form>
        <textarea placeholder="Adicione uma nova tarefa"
          required={true}
          onChange={handleNewTodo}
          value={textAreaValue}
          onInvalid={handleInvalidTodo}
        />
        <button
          type="submit"
          onClick={handleCreateNewTodo}
          disabled={hasTodo}
        >Criar<PlusCircle size={16} /></button>
      </form>
      <div className={styles.todosList}>
        <header>
          <span>Tarefas criadas <span>{todos.length}</span></span>
          <span>Tarefas concluídas <span>{todosComplete.length}</span></span>
        </header>
        <div>
          <form className={styles.todoContent}>
            {
              todos.map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    onDeleteTodo={deleteTodo}
                    todoComplete={handleSelectTodoCompleted}
                  />
                )
              })
            }

            <div className={todos.length === 0 ? styles.noneTodos : styles.noneTodoHidden}>
              <img src={clipboard} alt="adicione um todo" />

              <p>
                <strong>Você ainda não tem tarefas cadastradas</strong>
              </p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}