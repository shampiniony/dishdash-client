import { useLobby } from '@/app/stores/lobby.store';
import { SwipeCard } from '@/entities/swiped-card/swipe-card';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ICard } from '@/entities/swiped-card/card.interface';

const apiHost = 'https://dishdash.ru';

interface Socket {
  on(event: string, callback: (...args: any[]) => void): this;
  emit(event: string, ...args: any[]): this;
  disconnect(): this;
}

export const SwipeSection = ({ ...props }) => {
  const { lobbyID } = useLobby();
  const [socket, setSocket] = useState<Socket | null>(null);

  const [cards, setCards] = useState<ICard[]>([
    {
      id: 1,
      title: 'Вольчек 1',
      description: 'Lorem ipsum',
      shortDescription: 'Lorem ipsum',
      location: 'Петроградская 49',
      address: 'Петроградская 49',
      type: 'CAFE',
      price: 900,
      image:
        'https://avatars.mds.yandex.net/i?id=334b3e7b14fc60313dd2da2c1925815b93b4ed80-12579803-images-thumbs&n=13',
    },
    {
      id: 2,
      title: 'Дворик 1',
      description: 'Lorem ipsum',
      shortDescription: 'Lorem ipsum',
      location: 'Петроградская 49',
      address: 'Петроградская 49',
      type: 'CAFE',
      price: 900,
      image:
        'https://avatars.mds.yandex.net/i?id=c875f729e9669aea8af1af136c58450f1a7872cb-9856874-images-thumbs&n=13',
    },
    {
      id: 3,
      title: 'Вольчек 1',
      description: 'Lorem ipsum',
      shortDescription: 'Lorem ipsum',
      location: 'Петроградская 49',
      address: 'Петроградская 49',
      type: 'CAFE',
      price: 900,
      image:
        'https://avatars.mds.yandex.net/i?id=334b3e7b14fc60313dd2da2c1925815b93b4ed80-12579803-images-thumbs&n=13',
    },
    {
      id: 4,
      title: 'Дворик 1',
      description: 'Lorem ipsum',
      shortDescription: 'Lorem ipsum',
      location: 'Петроградская 49',
      address: 'Петроградская 49',
      type: 'CAFE',
      price: 900,
      image:
        'https://avatars.mds.yandex.net/i?id=c875f729e9669aea8af1af136c58450f1a7872cb-9856874-images-thumbs&n=13',
    },
    // {
    //   id: 3,
    //   title: 'Блоик 3',
    //   description: 'Lorem ipsum',
    //   shortDescription: 'Lorem ipsum',
    //   location: 'Петроградская 49',
    //   address: 'Петроградская 49',
    //   type: 'CAFE',
    //   price: 900,
    //   image: require('./assets/fuck.jpg')
    // },
    // {
    //   id: 4,
    //   title: 'Голик 1',
    //   description: 'Lorem ipsum',
    //   shortDescription: 'Lorem ipsum',
    //   location: 'Петроградская 49',
    //   address: 'Петроградская 49',
    //   type: 'CAFE',
    //   price: 900,
    //   image: require('./assets/fuck.jpg')
    // }
  ]);

  // useEffect(() => {
  //   const newSocket = io(apiHost, {
  //     transports: ['websocket'],
  //     reconnectionAttempts: 5,
  //     timeout: 20000,
  //   });
  //   setSocket(newSocket);

  //   newSocket.on('connect', () => {
  //     newSocket.emit('joinLobby', JSON.stringify({ lobbyID }));
  //   });

  //   newSocket.on('card', (data) => {
  //     const cardData = data["card"];
  //     setCards((prevCards) => [...prevCards, cardData]);
  //     console.info(cards)
  //   });

  //   newSocket.on('match', (data) => {
  //     const matchData = data["card"];
  //     setCards((prevCards) => [...prevCards, matchData]);
  //     console.info(cards)
  //   });

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, [lobbyID]);

  const handleSwipe = (id: number) => {
    setTimeout(() => {
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
      socket?.emit('swipe', JSON.stringify({ swipeType: 'DISLIKE' }));
    }, 100);
  };

  const visibleCards = cards.slice(0, 3);

  return (
    <View className='h-full justify-center'>
      <View className='h-3/4'>
        {visibleCards.map((value, index) => (
          <SwipeCard
            key={cards[index].id}
            index={index}
            card={cards[index]}
            onSwipe={handleSwipe}
          />
        ))}
      </View>
    </View>
  );
};

{
  /* <View className='flex-row h-[20%] w-4/5 mx-auto justify-around'>
        <ButtonIcon styles={{
          backgroundColor: 'rgb(220, 220, 220)'
        }}>
          <CrossIcon color='black'/>
        </ButtonIcon>
        <ButtonIcon
          onPress={ () => {} }
          styles={{
            backgroundColor: 'black'
          }}
        >
          <HeartIcon color='white'/>
        </ButtonIcon>
      </View> */
}
