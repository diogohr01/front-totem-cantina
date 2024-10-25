"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';

interface Products {
    id: string;
    name: string;
    price: number; // Certifique-se de que seja número
    quantidade: number; // Certifique-se de que seja número
}

export default function ShoppingCart() {
    const [products, setProducts] = useState<Products[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const searchParams = useSearchParams();

    const fetchProducts = async () => {
        const token = getCookieClient();
        const search = searchParams.get("id");

        try {
            const response = await api.get(`/products/order?order_id=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const transformedProducts = response.data.map((product: Products) => ({
                ...product,
                price: parseFloat(product.price.toString()) 
            }));

            setProducts(transformedProducts);

            const initialQuantities = transformedProducts.reduce((acc: { [key: string]: number }, product: Products) => {
                acc[product.id] = product.quantidade;
                return acc;
            }, {});

            setQuantities(initialQuantities);
        } catch (error) {
            console.error("Erro ao buscar os dados dos produtos:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [searchParams]); 

    const handleQuantityChange = (id: string, change: number) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + change) 
        }));
    };

    return (
        <div>
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>Preço: R$ {product.price}</p>
                        <p>Quantidade: {quantities[product.id]}</p>
                        <button onClick={() => handleQuantityChange(product.id, -1)}>Diminuir</button>
                        <button onClick={() => handleQuantityChange(product.id, 1)}>Aumentar</button>
                    </div>
                ))
            ) : (
                <p>Carregando produtos...</p>
            )}
        </div>
    );
}
