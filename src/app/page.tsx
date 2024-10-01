import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from '/public/logo.svg'
import Link from 'next/link'
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import {cookies} from 'next/headers'
import logoImgCafe from '/public/logoCafe.svg'


export default function Home() {
  async function handleLogin(formData: FormData){
    "use server"
    const pin = formData.get('pin')
  

    if(pin === null){
      return;
    }
    try{
      const response = await api.post('/sessionPin',{
       pin: Number(pin)
      })
      if(!response.data.token){

        return;
        
      }
      console.log(response.data)
      const expressTime =  60 * 60 * 24 * 30 * 1000;
      cookies().set("session", response.data.token,{
        maxAge: expressTime,
        path: '/',
        httpOnly: false,
        secure: false
        //secure: process.env.NODE_ENV === 'production'  - USA EM PRODUÇÃO

      })

    }catch(err){
      console.log('error')
      console.log(err)
      return;
    }
    
   redirect('/dashboard') 
  } 
  return (
   <>
   <div className={styles.containerCenter}>
    <Image
    src={logoImgCafe}
    alt="Logo da pizzaria" 
    />
    <section className={styles.login}>
      <form action={handleLogin}>
        <input type="number" required name="pin" placeholder="Digite seu pin..." className={styles.input}/>
    
        <button type="submit" className={styles.button}>Acessar</button>
      </form>
     
    </section>
   </div>
   </>
  );
}
