const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT ||8000;

app.use(express.json());

// Define route to send SMS using POST method
app.post('/send-sms', async (req, res) => {
    const { phone, otp } = req.body; // Extract phone number and OTP from request body

    // Validate input
    if (!phone ) {
        return res.status(400).send('Phone number and OTP are required');
    }

    // Payload data
    const payload = {
        UserID: 'oneportfoliobiz',
        Password: 'goqx3126GO',
        SenderID: 'OHASST',
        Phno: phone,
        Msg: `OTP for registration on www.onehealthassist.com is ${otp}. Please enter this to verify your identity and proceed with the registration request. OHASST`,
        EntityID: '1701168423100090492',
        TemplateID: '1707168441354581402'
    };

    try {
        console.log('Payload:', payload); // Log the payload for debugging
        const response = await axios.post('http://nimbusit.biz/api/SmsApi/SendSingleApi', payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response.data); 
        res.send(response.data); 
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message); // Log detailed error information
        res.status(500).send('Error sending SMS'); // Send error response to the client
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
