export interface OrderProps {
      id: string;
      table: number;
      name?: string; // Pode ser opcional, já que no modelo o campo é opcional
      draft: boolean;
      status: boolean;
      paid: boolean;
      qrcode?: string; // Opcional, já que no modelo pode ser null
      txid?: string; // Opcional, já que no modelo pode ser null
      dataFechamento?: Date; // Opcional, já que no modelo pode ser null
     
    }
    