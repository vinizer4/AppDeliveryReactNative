import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity } from 'react-native';
import { AdminCategoryListScreen } from '../views/admin/category/list/CategoryList';
import { AdminOrderListScreen } from '../views/admin/order/list/OrderList';
import { ProfileInfoScreen } from '../views/profile/info/ProfileInfo';
import { AdminCategoryNavigator } from './AdminCategoryNavigator';
import { AdminOrderStackNavigator } from './AdminOrderStackNavigator';

const Tab = createBottomTabNavigator();

export const AdminTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      
      <Tab.Screen 
        name="AdminCategoryNavigator" 
        component={AdminCategoryNavigator} 
        options={ ({route, navigation}) => (
          {
            title: 'Categorias',
            tabBarLabel: 'Categorias',
            tabBarIcon: () => (
              <Image
                source={ require('../../../assets/list.png') }
                style={{ width: 25, height: 25 }}
                />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('AdminCategoryCreateScreen')}>
                <Image 
                  source={ require('../../../assets/add.png') }
                  style={{ width:35, height: 35, marginRight: 15 }}
                />
              </TouchableOpacity>
            )
          }
        )}
      />
      
      <Tab.Screen 
        name="AdminOrderStackNavigator" 
        component={AdminOrderStackNavigator} 
        options={{
          title: 'Pedidos',
          tabBarLabel: 'Pedidos',
          tabBarIcon: ({ color }) => (
            <Image
              source={ require('../../../assets/orders.png') }
              style={{ width: 25, height: 25 }}
              />
          )
        }}
      />
      
      <Tab.Screen 
        name="ProfileInfoScreen" 
        component={ProfileInfoScreen} 
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={ require('../../../assets/user_menu.png') }
              style={{ width: 25, height: 25 }}
              />
          )
        }}
      />

    </Tab.Navigator>
  );
}