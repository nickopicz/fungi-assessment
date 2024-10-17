// Function to send a message to the backend and handle streaming responses
interface Error {
    name: string
}

export const sendMessageToBackend = async (message: string, onStreamUpdate) => {
    const controller = new AbortController();  // Create an AbortController to handle request timeout
    const timeout = 15000;  // Set a timeout limit of 15 seconds

    // Set a timeout to abort the request if it takes too long
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Send a POST request to the backend
        const response = await fetch('http://127.0.0.1:8000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),  // Send the message in the request body
            signal: controller.signal,  // Attach the abort signal to handle timeout
        });

        // Clear the timeout once a response is received, so it doesn't trigger unnecessarily
        clearTimeout(timeoutId);

        // Check if the response body exists, if not, throw an error
        if (!response.body) {
            throw new Error('No response body');
        }

        // Handle specific HTTP error statuses
        if (response.status === 404) {
            throw new Error("Resource not found (404)");  // Handle 404 errors
        } else if (response.status === 500) {
            throw new Error("Server error (500)");  // Handle 500 errors
        } else if (response.status !== 200) {
            throw new Error(`Unexpected error: ${response.status}`);  // Handle other unexpected statuses
        }

        const reader = response.body.getReader();  // Get a reader to stream the response body
        const decoder = new TextDecoder();  // Create a text decoder to decode streamed chunks
        let receivedText = '';  // Variable to accumulate the streamed chunks

        // Stream the response data chunk by chunk
        while (true) {
            const { done, value } = await reader.read();  // Read the next chunk of data
            if (done) break;  // If the reader is done, exit the loop

            const chunk = decoder.decode(value, { stream: true });  // Decode the chunk
            receivedText += chunk;  // Append the chunk to the accumulated text

            // Call the callback function to progressively update the UI
            onStreamUpdate(receivedText);
        }

        return receivedText;  // Return the final accumulated response after full streaming

    } catch (error) {
        clearTimeout(timeoutId);  // Clear the timeout in case of an error

        // Check if the error was caused by a timeout (request abortion)
        if (error.name === 'AbortError') {
            console.error('Request timed out');  // Log the timeout error
            return 'Request timed out. Please try again.';  // Return a timeout message
        } else {
            console.error('Error with streaming from backend:', error);  // Log other errors
            return 'Sorry, this request could not be fulfilled at the moment.';  // Return a generic error message
        }
    }
};
