"use client";
import { FaTrashAlt } from 'react-icons/fa';
import styles from './styles.module.scss'; // Certifique-se de que esse arquivo tenha a classe 'trashButton'
import { useFormStatus } from 'react-dom'; // Verifique se esse hook realmente existe, pode ser necessário corrigir o import.

interface Props {
  onClick: () => void;
  name: String;
}

export default function Lixeira({ onClick, name }: Props) {

  const pending = false; 

  return (
    <>
      
        <button
          type='button'
          disabled={pending}
          className={styles.trashButton}
          onClick={onClick}
        >
          {name}{pending ? 'Carregando' : <FaTrashAlt size={30} />}
        </button>
      
    </>
  );
}
