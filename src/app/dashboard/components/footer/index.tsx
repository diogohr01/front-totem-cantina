"use client"
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import logoImgCafe from '/public/logoCafe.svg'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function Footer(){
      const router = useRouter();
      async function handleLogout(){
            deleteCookie('session', {path: '/'})
            toast.success("Deslogado com sucesso")
            router.replace('/')

      }
      return(
            <footer className={styles.footerContainer}>
                  
            </footer>
      )
}
