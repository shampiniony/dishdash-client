import { HomePage } from '@/pages/home.page';
import { SwipePage } from '@/pages/swipes.page';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import useSocket from '@/entities/swipes/hooks/useSocket';

export default function App() {
  const [input, setInput] = useState(JSON.stringify({lobbyID: 1}));
  const { messages, sendMessage } = useSocket("echo");

  const handleSubmit = () => {
    sendMessage(input);
  };

  return (
    <>
      <View className='flex-1 mt-10'>
        <Pressable className='bg-red-300' onPress={handleSubmit}>
          <Text>Send</Text>
        </Pressable>
        <View className='w-96 h-96 bg-blue-300'>
        {
          messages.map((text, index) => <Text key={index}>hello: { text }</Text>)
        }
        </View>
      </View>
      {/* <SwipePage /> */}
      {/* <HomePage/> */}
    </>
  );
}
