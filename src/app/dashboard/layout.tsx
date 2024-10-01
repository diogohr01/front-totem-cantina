import { Header } from "./components/header"
import { OrderProvider } from "@/providers/order"
import { Footer } from "./components/footer"

export default function DashboardLayout({children}: {children: React.ReactNode}){
      return(
            <>
            <Header/>
            <OrderProvider>
            {children}
            </OrderProvider>
            <Footer/>
            </>
      )
}