import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from 'react-native';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import { ModalPickImage } from '../../../../components/ModalPickImage';
import { RoundedButton } from '../../../../components/RoundedButton';
import { MyColors, MyStyles } from '../../../../theme/AppTheme';
import styles from './Styles';
import useViewModel from './ViewModel';
import { StackScreenProps } from '@react-navigation/stack';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';

interface Props extends StackScreenProps<ClientStackParamList, 'ClientAddressCreateScreen'>{};
export const ClientAddressCreateScreen = ({navigation, route}: Props) => {

  const { address, neighborhood, refPoint, responseMessage, loading, onChange, createAddress, onChangeRefPoint } = useViewModel();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.refPoint) {
      onChangeRefPoint(route.params?.refPoint, route.params?.latitude, route.params?.longitude);
    }
  }, [route.params?.refPoint])
  

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage])
  

  return (
    <View style={styles.container}>
        <TouchableOpacity 
            style={styles.imageContainer}
            onPress={() => setModalVisible(true)}
        >
            <Image
              style={ styles.image }
              source={ require('../../../../../../assets/map.png') }
              />
        </TouchableOpacity>

        <View style={ styles.form }>
            
            <CustomTextInput 
                placeholder='Nombre de la direccion'
                image={ require('../../../../../../assets/location.png')}
                keyboardType='default'
                property='address'
                value={address}
                onChangeText={ onChange }
            />
            <CustomTextInput 
                placeholder='Barrio'
                image={ require('../../../../../../assets/neighborhood.png')}
                keyboardType='default'
                property='neighborhood'
                value={neighborhood}
                onChangeText={ onChange }
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('ClientAddressMapScreen')}
            >
              <CustomTextInput 
                  placeholder='Punto de referencia'
                  image={ require('../../../../../../assets/ref_point.png')}
                  keyboardType='default'
                  property='refPoint'
                  value={refPoint}
                  onChangeText={ onChange }
                  editable={ false }
              />
            </TouchableOpacity>

        </View>

        <View style={styles.buttonContainer}>
            <RoundedButton 
                text='CREAR DIRECCION'
                onPress={() => createAddress()}
            />
        </View>

        {
          loading && 
          <ActivityIndicator 
            style={MyStyles.loading} 
            size="large" 
            color={ MyColors.primary }  
          />
        }
    </View>
  )
}
