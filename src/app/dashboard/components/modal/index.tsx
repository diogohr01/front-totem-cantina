"use client"
import styles from './styles.module.scss'
import { X } from 'lucide-react'
import { OrderContext } from '@/providers/order'
import { use } from 'react'

export function ModalOrder(){
      const {onRequestClose, order, onRequestFinish} = use(OrderContext)
      return(
            <>
            <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                  <button className={styles.dialogBack} onClick={onRequestClose}>
                        <X size={35} color='#FF3f4b'/>
                  </button>
                  <article className={styles.container}>
                       <h2>Detalhes do pedido</h2>
                       <span className={styles.table}>
                        Pedido <b>{order[0].order.table}</b>
                        
                        </span>
                        {order.map(item => (
                              <section className={styles.item}>
                              <b>{item.produto.name}</b>
                              <span>Quantidade: {item.amount}</span>  
                            
                              </section> 
                        ))}
                        <b> <span>{order[0].order.paid ? "Pago: SUCESSO" : "Pago: PENDENTE"}</span></b>


             { /*  <button className={styles.buttonOrder} onClick={()=>onRequestFinish(order[0].order.id)}>Concluir um pedido</button> */}
                  </article>
            </section>
                  teste
            </dialog>
            </>
      )
}