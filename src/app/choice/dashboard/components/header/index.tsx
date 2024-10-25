"use client";
import Link from 'next/link';
import styles from './styles.module.scss'; // Certifique-se de que esse arquivo tenha as classes do header
import Image from 'next/image';
import logoImgCafe from '/public/logoCafe.svg';
import { LogOutIcon } from 'lucide-react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


export function Header() {
  const router = useRouter();

  async function handleLogout() {
    deleteCookie('session', { path: '/' });
    toast.success("Deslogado com sucesso");
    router.replace('/');
  }


  return (
    <header className={styles.headerContainer}>
    </header>
  );
}
