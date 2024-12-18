import { Pressable, Text } from 'react-native'
import React from 'react'

interface ButtonProps {
  title: string;
  action?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, action }) => {
  return (
    <Pressable
      onPress={action}
      className="bg-[#FF1E00] rounded-3xl justify-center items-center py-5 w-3/4"
    >
      <Text className="text-white font-bold text-lg">{title}</Text>
    </Pressable>
  );
};

export default Button;
