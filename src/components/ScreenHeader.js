import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, TouchableOpacity, View } from 'react-native';

function screenHeader({ title, leftIcon = 'menu', rightIcon, onLeftPress, onRightPress }) {
  return (
    <View
      style={{
        backgroundColor: '#075FDE',
        minHeight: 88,
        paddingTop: 42,
        paddingHorizontal: 18,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={onLeftPress} style={{ width: 30 }}>
        <Ionicons name={leftIcon} size={25} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={{ color: '#FFFFFF', fontFamily: 'PoppinsSemiBold', fontSize: 16 }}>{title}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={onRightPress} style={{ width: 30, alignItems: 'flex-end' }}>
        {rightIcon ? <Ionicons name={rightIcon} size={24} color="#FFFFFF" /> : null}
      </TouchableOpacity>
    </View>
  );
}

export default screenHeader;
