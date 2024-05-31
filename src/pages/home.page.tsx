import { Header } from '@/entities/header';
import { Radar } from '@/entities/radar';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { CustomButton } from '@/shared/ui/custom-button'
import axios from 'axios';
import { API_HOST } from '@/app/app.settings';
import { useLobby } from '@/app/stores/useLobby';

const locationData = {
  lat: 59.957441,
  lng: 30.308091
};

export const HomePage = () => {
  const { lobbyID, setLobbyID } = useLobby();

  const createLobby = async () => {
    const jsonData = {
      location: JSON.stringify(locationData)
    };

    try {
      const response = await axios.post(`${API_HOST}/api/v1/lobby`, jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = response.data;
      console.info(data);
      if (data.id) {
        setLobbyID(lobbyID);
      } else {
        console.error('Response did not contain an "id" field');
      }
    } catch (error) {
      console.error('There was a problem with your axios operation:', error);
    }
  };
  return (
    <View className='flex-1 mt-10'>
      <Header />
      <View className='flex-1 bg-whit items-center'>
        <Radar className='h-3/5 w-screen' />
        <View>
          <Text className='text-xl text-muted text-center'>Куда пойти сегодня?</Text>
          <Text className='text-3xl text-center font-normal'>
            Открывайте новые места для прогулок
          </Text>
        </View>
        <View className='flex-row gap-5 py-10'>
          <CustomButton>Одному</CustomButton>
          <CustomButton onPress={createLobby} type='primary'>С компанией</CustomButton>
        </View>
      </View>
    </View>
  );
};
