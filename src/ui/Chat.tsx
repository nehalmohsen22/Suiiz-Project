import axios from 'axios';
import Pusher from 'pusher-js';
import { useEffect, useRef, useState } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [sendMessage, setSendMessage] = useState([]);
  const inputRef = useRef(null);
  // const fetchMessage = async () => {
  //   await axios.post('/api/pusher/', {
  //     message: message,
  //     setMessage('')
  //   });
  // };

  const handelSending = async (e) => {
    e.preventDefault();

    await axios.post('/api/pusher', { message });
    // await fetchMessage();

    if (inputRef.current !== null) inputRef.current.reset();
  };

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('74b83b4b3cf043d70186', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('chat-suiiz');
    channel.bind('message', (data) => {
      setSendMessage((prev) => {
        return [...prev, data.message];
      });
    });
    return () => {
      pusher.unsubscribe('chat-suiiz');
    };
  }, []);

  return (
    <div className=" h-auto w-full">
      <div className="mx-auto my-5 min-h-[700px] w-[800px] rounded-2xl bg-blue-100 p-5 shadow-md shadow-blue-500">
        {sendMessage.map((item, i) => {
          return (
            <div key={i}>
              <h3 className="my-1 text-xl">user1</h3>
              <p className="inline rounded-xl bg-stone-600 p-[7px] text-base text-white shadow-md shadow-stone-300">
                {item}
              </p>
            </div>
          );
        })}
      </div>
      <form className="text-center" onSubmit={handelSending} ref={inputRef}>
        <input
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          type="text"
          placeholder="type here"
          className=" rounded-lg bg-amber-100  p-1 text-3xl outline-none focus:shadow-sm focus:shadow-black"
        />
        <button
          type="submit"
          className="mx-2 w-20 rounded-lg bg-blue-500 text-3xl text-white hover:bg-blue-400 hover:shadow-sm hover:shadow-black"
        >
          send
        </button>
      </form>
    </div>
  );
};

export default Chat;
