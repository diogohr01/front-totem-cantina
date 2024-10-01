"use client"
import { use } from 'react'
import styles from './styles.module.scss'
import { RefreshCw } from 'lucide-react'
import { OrderProps } from '@/lib/order.type'
import { ModalOrder } from '../modal'
import { OrderContext } from '@/providers/order'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


interface Props {
      orders: OrderProps[]
}

export function Orders({ orders }: Props) {
      const { isOpen, onRequestOpen } = use(OrderContext)
      const router = useRouter();

      async function handleDetailOrder(order_id: string) {
            await onRequestOpen(order_id)

      }
      function handleRefreshOrders() {

            router.refresh();
            toast.success('Pedidos atualizados com sucesso')
      }

      return (
            <>
                  <main className={styles.container}>
                        <section className={styles.containerHeader}>
                              <h1>Ultimos pedidos</h1>
                              <button onClick={handleRefreshOrders} className={styles.refresh}>
                                    <RefreshCw size={24} color='#fd8a07' />
                              </button>
                        </section>

                        <section className={styles.listOrders}>
                              {orders && orders.length > 0 ? (
                                    orders.map(order => (
                                          <button
                                                className={styles.orderItem}
                                                key={order.id}
                                                onClick={() => handleDetailOrder(order.id)}
                                          >
                                                <div className={styles.tag}></div>
                                                <span>Pedido: {order.table}</span>
                                          </button>
                                    ))
                              ) : (
                                    <p className={styles.notOrders}>Nenhum pedido recente...</p>
                              )}

                        </section>

                  </main>

                  {isOpen && <ModalOrder />}
            </>
      )
}