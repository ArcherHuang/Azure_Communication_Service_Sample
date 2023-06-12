require('dotenv').config();
const { EmailClient } = require("@azure/communication-email");

const connectionString = process.env.AZURE_COMMUNICATION_SERVICE_CONNECTION_STRING;
const emailClient = new EmailClient(connectionString);

async function sendEmail(subject, plainText, receiver) {
  const message = {
    senderAddress: process.env.AZURE_COMMUNICATION_SERVICE_SENDER_ADDRESS,
    content: {
      subject,
      html: plainText,
    },
    recipients: {
      to: receiver,
    },
  };

  const poller = await emailClient.beginSend(message);
  const response = await poller.pollUntilDone();
  console.log(`response: ${JSON.stringify(response)}`);
}

const context = `<html>
<body>
<h2>What is Azure Communication Services?</h2>
<table style="width:100%; border:1px solid black; font-size: 18px;">
  <tr style="background-color:#191970; color:white;">
    <th>服務</th>
    <th>說明</th>
    <th>支援格式</th>
  </tr>
  <tr>
    <td style="border:1px solid black;">Azure Communication Services</td>
    <td style="border:1px solid black;">
    Azure 通訊服務提供多頻道通訊 API，可新增語音、視訊、聊天、文字簡訊/手機簡訊、電子郵件等內容至您的所有應用程式
      [ 
      <a href="https://azure.microsoft.com/zh-tw/products/communication-services">
        Link
      </a>
      ]。
    </td>
    <td style="border:1px solid black;">
      <ul>
        <li>Voice and Video Calling</li>
        <li>Rich Text Chat</li>
        <li>SMS</li>
        <li>Email</li>
      </ul>
    </td>
  </tr>
</table>

<p>Azure / 通訊服務 </p>

</body>
</html>`

const receiver = [
  {
    address: "mmosconii@gmail.com",
    displayName: "Archer",
  },
]
sendEmail("我是主旨", context, receiver);