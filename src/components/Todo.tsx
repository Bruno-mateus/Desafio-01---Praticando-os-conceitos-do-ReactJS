import styles from './todo.module.css'
import { Trash, Check } from 'phosphor-react'
import { ChangeEvent } from 'react';


interface ITodo {
  id: string;
  content: string;
  isComplete: boolean;
}

interface TodoProps {
  todo: ITodo;
  onDeleteTodo: (todo: ITodo) => void;
  todoComplete(event: ChangeEvent<HTMLInputElement>): void;
}

export function Todo({ todo, onDeleteTodo, todoComplete }: TodoProps) {
  return (
    <div className={styles.todo}>

      <label className={styles.container} >
        <input type="checkbox" value={todo.id} checked={todo.isComplete} onChange={(e) => todoComplete(e)} />
        <span className={styles.checkmark}><Check /></span>
        <p>{todo.content}</p>
      </label>
      <button
        onClick={() => onDeleteTodo(todo)}
      ><Trash size={20} color={'var(--gray-300)'} /></button>
    </div>
  )
}