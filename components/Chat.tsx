import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getSession } from 'next-auth/client';
import io from 'socket.io-client';
import Header from './Header';
import { debounce } from 'lodash';

const Chat = () => {
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (session) {
      const socket = io('http://socket:3001');
      setSocket(socket);

      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [session]);

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() !== '') {
      socket.emit('message', { user: session.user.email, text: newMessage });
      setNewMessage('');
    }
  }, [newMessage, session, socket]);

  const debouncedSendMessage = useMemo(() => debounce(handleSendMessage, 300), [handleSendMessage]);

  return (
    <div>
      <Header />
      <main>
        <h1>Chat Room</h1>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className="chat-message">
              <strong>{message.user}</strong>: {message.text}
            </div>
          ))}
        </div>
        {session ? (
          <div className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={debouncedSendMessage}>Send</button>
          </div>
        ) : (
          <p>Please log in to participate in the chat.</p>
        )}
      </main>
    </div>
  );
};

export default React.memo(Chat);
