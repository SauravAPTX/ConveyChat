"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Chat() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string }[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      // Parse incoming messages assumed to be in JSON format
      const incomingMessage = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, incomingMessage]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      const ws = new WebSocket('ws://localhost:3001');
      ws.onopen = () => {
        ws.send(JSON.stringify({ text: message }));
        setMessage('');
      };
      ws.onerror = (error) => {
        console.error('Send message error:', error);
      };
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-3">Real-time Chat</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4 h-96 mb-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 border-b last:border-b-0">
            {msg.text} {/* Displaying text of each message */}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full mb-4"
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Send
      </button>
      <button onClick={() => {
        localStorage.removeItem('token');
        router.push('/');
      }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
        Sign Out
      </button>
      <div>Status: {isConnected ? "Connected" : "Disconnected"}</div>
    </div>
  );
}