"use client"
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Button } from '../choice/dashboard/components/button';
import styles from './page.module.scss'

export default function Dashboard() {
  const router = useRouter();

   async function itemOrder() {
    const token = getCookieClient();
    const randomTable = Math.floor(Math.random() * 1000) + 1;
    const orderData = {
      table: randomTable,
    };

    try {
      const response = await api.post('/order', orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newOrderId = response.data.id;
      

      router.push(`/choice/dashboard?id=${newOrderId}`);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  }

  return (
    <>
      <div className={styles.main} >
        <div className={styles.order} onClick={itemOrder}>
          <Button name='Começar pedido'/>
        </div>
        <Button name='Criar usuário admin'/>
      </div>
    </>
  );
}