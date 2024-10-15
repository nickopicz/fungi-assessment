export const sendMessageToBackend = async (message: string, onStreamUpdate) => {
    const controller = new AbortController();
    const timeout = 15000;  // 15 seconds timeout

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch('http://127.0.0.1:8000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
            signal: controller.signal,  // Add abort signal for timeout
        });

        clearTimeout(timeoutId);  // Clear the timeout once the response is received

        if (!response.body) {
            throw new Error('No response body');
        }

        if (response.status === 404) {
            throw new Error("Resource not found (404)");
        } else if (response.status === 500) {
            throw new Error("Server error (500)");
        } else if (response.status !== 200) {
            throw new Error(`Unexpected error: ${response.status}`);
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
        clearTimeout(timeoutId);  // Ensure timeout is cleared in case of error
        if (error.name === 'AbortError') {
            console.error('Request timed out');
            return 'Request timed out. Please try again.';
        } else {
            console.error('Error with streaming from backend:', error);
            return 'Sorry, this request could not be fulfilled at the moment.';
        }
    }
};
