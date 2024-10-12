export interface MessageResponse {
    response: string;
}

export const sendMessageToBackend = async (message: string): Promise<string> => {
    try {
        const response = await fetch('http://127.0.0.1:8000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
        });

        if (!response.ok) {
            throw new Error('Failed to send message to the backend');
        }
        const data = await response.json();
        console.log("response: ", data["response"])
        return data.response;
    } catch (error) {
        console.error('Error with to backend:', error);
        return 'Error communicating with the server';
    }
};
