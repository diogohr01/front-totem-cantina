import { Orders } from "../components/orders";
import { api } from "@/services/api";
import { getCookiesServer } from "@/lib/cookieServer";
import { OrderProps } from "@/lib/order.type";


async function getOrders(): Promise<OrderProps[] | []>{
      try{
            const token = getCookiesServer();
            const response = await api.get('/order', {
                  headers:{
                        Authorization: `Bearer ${token}`
                  }
            })
            console.log(response.data)

            return response.data || []
      }catch(err){ 
            console.log(err);
            return [];
            
      }
}

export default async function OrdersTable(){

      const orders = await getOrders();

      console.log(orders)
      return(
            <div>
                 <Orders orders={orders}/>
            </div>
      )
}