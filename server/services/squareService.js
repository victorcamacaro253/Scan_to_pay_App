import { Client ,Environment} from 'square'; // Correct import for the Client class
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';


dotenv.config();

const squareClient = new Client ({
    accessToken : 'EAAAlq1cyyp4pK1tRbLLTwTLkaJq6IeZ82ADSVkc_kj1O5Oq4ygg8jIinUXKv3SM',
    Environment: Environment.Sandbox,

   
})

class SquareService {

 static async createPayment (items){
    const totalAmount = items.reduce((total,item)=> total + item.amount * item.quantity,0);

    const idempotencyKey = uuidv4(); // Generate a unique idempotency key

    const payment = await squareClient.paymentsApi.createPayment({
        idempotencyKey,
        sourceId: 'sandbox-sq0idb-Q4fqE5AUE2TVNxXDpwJyfw', // Add this property with the value 'NO_SOURCE'

        amountMoney:{
            amount : totalAmount,
            currency:'USD',
        },
        autocomplete:'true',
    })
 return payment 
 }

}


export default SquareService;