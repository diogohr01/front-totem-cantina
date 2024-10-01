    "use client"
    import { api } from '@/services/api'
    import styles from './styles.module.scss'
    import { getCookieClient } from '@/lib/cookieClient';
    import { useEffect, useState, useRef } from 'react';
    import { useRouter } from 'next/navigation'
    import image from "../dashboard/img/MassaPastel500g-2-1000x1167.jpg"
    import Image from 'next/image';

    interface SoldData {
        totalValue: number;
    }
    interface Products{
        name:String
        price: String
        description: String
        banner: String
    }


    export default function Dashboard() {
        const [soldData, setSoldData] = useState<SoldData | null>(null);
        const [rankingProduct, setRankingProduct] = useState<{ id: string; produto: string; quantidade: number; price: number }[]>([]);
        const router = useRouter();
        const [segundos, setSegundos] = useState<number>(60);
        const intervalRef = useRef<NodeJS.Timeout | null>(null);
        const [products, setProducts] = useState<Products[] | null>(null)

        async function getSold() {
            const token = getCookieClient();

            try {
                const response = await api.get('/sold', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setSoldData(response.data);
            } catch (error) {
                console.error("Erro ao buscar os dados de vendas:", error);
            }
        }

        async function getRankingProduct() {
            const token = getCookieClient();

            try {
                const response = await api.get('/rankingProduct', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRankingProduct(response.data.produtos);
            } catch (error) {
                console.error("Erro ao buscar os dados do Ranking de produtos:", error);
            }
        }
        async function Products() {
            const token = getCookieClient();

            try {
                const response = await api.get('/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data)
                setProducts(response.data);
            } catch (error) {
                console.error("Erro ao buscar os dados dos produtos:", error);
            }
        }

        function setContagem() {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            setSegundos(60);

            const intervalId = setInterval(() => {
                setSegundos((prevSegundos) => {
                    if (prevSegundos <= 1) {
                        getSold();
                        getRankingProduct();
                        return 60;
                    }
                    return prevSegundos - 1;
                });
            }, 1000);

            intervalRef.current = intervalId;
        }

        function startContagem() {
            router.refresh();
            getSold();
            getRankingProduct();
            setContagem();
        }

        useEffect(() => {
            getSold();
            getRankingProduct();
            setContagem();
            Products();

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
        }, []);

        return (
            <main className={styles.container}>
                <section className={styles.containerHeader}>

                    <div className={styles.main}>
                        <article className={styles.article}>
                        {products?.map((item) => (
                            <span className={styles.rankingProdutos}>
                            <span className={styles.ranking}> {item.name} </span>
                            <span className={styles.image}>
                               <Image src={image} alt="Imagem de pasteis" className="custom-image"  quality={100} width={270} height={260} style={{objectFit: "cover", borderRadius: "5px"}}	 />

                            </span>
                        </span>
                        ))}
                            
                        </article>
                    </div>
                </section>


            </main>
        );
    }

    //olá 