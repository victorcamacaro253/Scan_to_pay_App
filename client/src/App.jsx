// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentForm from './paymentForm';
import PaymentConfirmation from './components/confirmationPayment';
import PaymentConfirmationStripe from './components/confirmationPaymentStripe';
import PaymentInterface from './components/PaymentInterface';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PaymentForm/>} />
                <Route path="/payment-confirmation" element={<PaymentConfirmation/>} />
                <Route path="/payment-stripe-confirmation" element={<PaymentConfirmationStripe/>}/>
                <Route path="/payment-interface" element={<PaymentInterface/>} />
            </Routes>
        </Router>
    );
}

export default App;
