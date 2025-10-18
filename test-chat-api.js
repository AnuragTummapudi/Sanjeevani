// Simple test script for the chat API
const testChatAPI = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{
          text: "What's my blood pressure?",
          sender: "user"
        }]
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Chat API Test Successful!');
      console.log('Response:', data.message);
    } else {
      console.log('❌ Chat API Test Failed!');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
    }
  } catch (error) {
    console.log('❌ Chat API Test Error:', error.message);
  }
};

// Run the test
testChatAPI();
