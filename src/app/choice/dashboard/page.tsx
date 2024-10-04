"use client"

import { api } from '@/services/api'
import styles from './styles.module.scss'
import { getCookieClient } from '@/lib/cookieClient';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import image from "../dashboard/img/MassaPastel500g-2-1000x1167.jpg"
import Image from 'next/image';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import { Button } from '../dashboard/components/button';


interface Products {
  id: string;
  name: string;
  price: number;
  description: string;
  banner: string;
}

interface SelectedProduct extends Products {
  quantity: number;
}

interface ChoiceProducts {
  selectedProducts: SelectedProduct[];
}

interface Order {
  table: string;
  name?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Products[] | null>(null)
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [choiceProducts, setChoiceProducts] = useState<ChoiceProducts>({ selectedProducts: [] });
  const searchParams = useSearchParams()



  async function fetchProducts() {
    const token = getCookieClient();
    try {
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data.map((product: Products) => ({
        ...product,
        price: parseFloat(product.price.toString())
      })));
    } catch (error) {
      console.error("Erro ao buscar os dados dos produtos:", error);
    }
  }

  const handleQuantityChange = (id: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change)
    }));
  };

  const getProducts = (): ChoiceProducts => {
    const selectedProducts: SelectedProduct[] = [];     
    for (const [id, quantity] of Object.entries(quantities)) {
      const product = products?.find(p => p.id === id);
      if (product && quantity > 0) {
        selectedProducts.push({
          ...product,
          quantity
        });
      }
    }
    return { selectedProducts };
  };

  useEffect(() => {
    fetchProducts();
   
  }, []);

  useEffect(() => {
    const result = getProducts();
    setChoiceProducts(result);
  }, [quantities, products]);

  
  async function itemOrder() {
    const token = getCookieClient();
    
    try {
     
      for (const product of choiceProducts.selectedProducts) {
        const search = searchParams.get('id')
        const itemData = {
          order_id: search,
          product_id: product.id,
          amount: product.quantity
        }

        const response = await api.post('/order/add', itemData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
       
 
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  }
  

  return (
    <main className={styles.container}>
      <section className={styles.containerHeader}>
        <div className={styles.main}>
          <article className={styles.article}>
            {products?.map((item, index) => (
              <option key={item.id} value={index}>
                <span className={styles.rankingProdutos}>
                  <span className={styles.ranking}> {item.name} </span>
                  <span className={styles.image} onClick={() => handleQuantityChange(item.id, 1)} >
                    <Image src={image} alt="Imagem de pasteis" className="custom-image" quality={100} width={270} height={260} style={{objectFit: "cover", borderRadius: "5px"}} />
                  </span>
                  <div className={styles.footerCard}>
                    <span className={styles.productPrice}>R$ {item.price.toFixed(2)}</span>
                    <div className={styles.icon}>
                      <IoMdRemoveCircleOutline size={25} onClick={() => handleQuantityChange(item.id, -1)}/>
                      {quantities[item.id] || 0}
                      <IoMdAddCircleOutline size={25} onClick={() => handleQuantityChange(item.id, 1)} />
                    </div>
                  </div>
                </span>
              </option>
            ))}
          </article>
          <div className={styles.closeOrder} onClick={itemOrder}>
          <Button name='Fechar pedido'/>
          </div>
        </div>
      </section>
    </main>
  );
}
