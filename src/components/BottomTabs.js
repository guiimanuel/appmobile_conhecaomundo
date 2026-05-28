import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, TouchableOpacity, View } from 'react-native';

const tabs = [
  { route: 'Home', label: 'Inicio', icon: 'home-outline', activeIcon: 'home' },
  { route: 'Favorite', label: 'Favoritos', icon: 'heart-outline', activeIcon: 'heart' },
  { route: 'Profile', label: 'Perfil', icon: 'person-outline', activeIcon: 'person' },
];

function BottomTabs({ active, navigation }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopColor: '#E6EBF2',
        borderTopWidth: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 8,
        paddingBottom: 10,
      }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.route;

        return (
          <TouchableOpacity
            key={tab.route}
            activeOpacity={0.75}
            onPress={() => navigation.navigate(tab.route)}
            style={{ flex: 1, alignItems: 'center', gap: 3 }}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={23}
              color={isActive ? '#0B67DE' : '#4F5C6E'}
            />
            <Text style={{ color: isActive ? '#0B67DE' : '#4F5C6E', fontFamily: 'PoppinsRegular', fontSize: 11 }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomTabs;
