import { useState } from "react";
import api from "../api/axiosInstance";
import { HttpStatusCode } from "axios";
import { extractError } from "../utils/ResponseUtil";
import './../styles/SendActivationTokenPage.css';

function SendActivationTokenPage() {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post("send-activation-token", { email });

            if (response.status !== HttpStatusCode.Ok) {
                throw new Error("An error occurred, please try again");
            }

            setSuccessMessage("Activation token sent successfully!");
            setErrorMessage(""); 
            console.log(response);
        } catch (error) {
            const errorMessage = extractError(error.response?.data) || error.message;
            setErrorMessage(errorMessage);
            console.log(error);
        }
    };

    return (
        <div className="page-container">
            {successMessage ? (
                <div className="success-message-container">
                    <p className="success-message">{successMessage}</p>
                </div>
            ) : (
                <div className="email-container">
                    <h1>Resend Activation Code</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email" className="required">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit" className="login-btn">Send Activation Token</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default SendActivationTokenPage;
