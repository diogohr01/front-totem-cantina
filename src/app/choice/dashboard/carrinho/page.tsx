"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import styles from './page.module.scss';

interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
}

export default function ShoppingCart() {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [quantities, setQuantities] = useState<{[key: string]: number}>({});

    useEffect(() => {
        // Simulating product fetch
        setProducts([
            { id: '1', name: 'Basic T-shirt', price: '49.99', description: 'Comfortable cotton t-shirt', banner: '/img/tshirt.jpg' },
            { id: '2', name: 'Jeans', price: '79.99', description: 'Classic blue jeans', banner: '/img/jeans.jpg' },
            { id: '3', name: 'Sneakers', price: '89.99', description: 'Casual sneakers', banner: '/img/sneakers.jpg' },
            { id: '4', name: 'Hat', price: '29.99', description: 'Stylish hat', banner: '/img/hat.jpg' },
        ]);
    }, []);

    const handleQuantityChange = (id: string, change: number) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + change)
        }));
    };

    return (
        <main className={styles.container}>
            <section className={styles.containerHeader}>
                <div className={styles.main}>
                    <article className={styles.article}>
                        {products?.map((item) => (
                            <div key={item.id} className={styles.rankingProdutos}>
                                <span className={styles.ranking}>{item.name}</span>
                                <span className={styles.image}>
                                    <Image 
                                        src={item.banner} 
                                        alt={item.name} 
                                        width={270} 
                                        height={260} 
                                        style={{objectFit: "cover", borderRadius: "5px"}}
                                    />
                                </span>
                                <div className={styles.footerCard}>
                                    <span className={styles.productPrice}>R$ {item.price}</span>
                                    <div className={styles.icon}>
                                        <IoMdRemoveCircleOutline 
                                            size={25} 
                                            onClick={() => handleQuantityChange(item.id, -1)}
                                        />
                                        {quantities[item.id] || 0}
                                        <IoMdAddCircleOutline 
                                            size={25} 
                                            onClick={() => handleQuantityChange(item.id, 1)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </article>
                </div>
            </section>
        </main>
    );
}