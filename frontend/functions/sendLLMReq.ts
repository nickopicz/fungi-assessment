export const sendMessageToBackend = async (message, onStreamUpdate) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
        });

        if (!response.body) {
            throw new Error('No response body');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let receivedText = '';

        // Stream data
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            receivedText += chunk;

            // Call the callback function to update the UI progressively
            onStreamUpdate(receivedText);
        }

        return receivedText;  // Final response after full streaming
    } catch (error) {
        console.error('Error with streaming from backend:', error);
        return 'Error communicating with the server';
    }
};
