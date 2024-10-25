import { Header } from "./dashboard/components/header"
import { OrderProvider } from "@/providers/order"

export default function OrderLayout({children}: {children: React.ReactNode}){
      return(
            <>
            <Header/>
            <OrderProvider>
            {children}
            </OrderProvider>
            </>
      )
}