import {
  View,
  Image,
  TextInput,
  Pressable
} from 'react-native';
import { AddIcon } from './icon/add';
import { ImageSelectorDrawer, openBottomSheetModal } from './bottom-drawer';
import { useRef } from 'react';
import { CustomText } from '@/shared/ui/custom-text';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ImageFile } from '@/app/app.settings';

interface ProfileProps {
  name: string;
  setName: (name: string) => void;
  avatar: ImageFile;
  setAvatar: (avatar: ImageFile) => void;
}

export const Profile = ({ avatar, setAvatar, name, setName }: ProfileProps) => {
  const bottomSheetSourceSelectRef = useRef<BottomSheetModal>(null);

  return (
    <View
      style={{
        rowGap: 14,
      }}
      className='flex relative justify-center items-center h-5/6 w-full'
    >
      <View>
        <View className='bg-secondary h-[25vh] w-[25vh] rounded-full justify-center items-center'>
          <Image className='h-2/3 w-2/3' source={avatar.src} />
          <Pressable
            onPress={() => {
              openBottomSheetModal(bottomSheetSourceSelectRef);
            }}
            className='bg-black h-[6vh] w-[6vh] rounded-full absolute bottom-0 right-4 justify-center items-center'
          >
            <AddIcon />
          </Pressable>
        </View>
        <ImageSelectorDrawer
          bottomSheetSourceSelectRef={bottomSheetSourceSelectRef}
          setImage={setAvatar}
        />
      </View>

      <CustomText className='text-2xl'>Ваше имя</CustomText>
      <TextInput
        className='font-inter w-[85%] h-16 px-6 border-[#EFEFEF] text-2xl rounded-xl border-2'
        onChangeText={(input) => setName(input)}
        value={name}
      />
    </View>
  );
};
