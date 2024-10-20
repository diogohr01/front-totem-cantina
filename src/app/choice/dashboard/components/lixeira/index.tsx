"use client";
import { FaTrashAlt } from 'react-icons/fa'; 
import styles from './styles.module.scss'
import { useFormStatus} from 'react-dom';

interface Props {
    onClick: () => void;  
}

export default function lixeira({ onClick }: Props) {
    const { pending } = useFormStatus();
    return (
        <button 
            type='button' 
            disabled={pending} 
            className={styles.trashButton} 
            onClick={onClick}
        >
            {pending ? 'Carregando' : <FaTrashAlt />} 
        </button>
    );
}