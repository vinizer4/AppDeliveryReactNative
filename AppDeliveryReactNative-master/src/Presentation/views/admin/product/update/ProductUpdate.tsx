import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ToastAndroid, ScrollView } from 'react-native';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import { ModalPickImage } from '../../../../components/ModalPickImage';
import { RoundedButton } from '../../../../components/RoundedButton';
import { MyColors, MyStyles } from '../../../../theme/AppTheme';
import styles from './Styles';
import useViewModel from './ViewModel';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator';
import { ModalPickMultipleImage } from '../../../../components/ModalPickMultipleImage';

interface Props extends StackScreenProps<ProductStackParamList, 'AdminProductUpdateScreen'>{};

export const AdminProductUpdateScreen = ({navigation, route}: Props) => {

  const { category, product } = route.params;
  const { name, description, responseMessage, loading, image1, image2, image3, price, onChange, takePhoto, pickImage, updateProduct } = useViewModel(product, category);
  const [modalVisible, setModalVisible] = useState(false);
  const [numberImage, setNumberImage] = useState(1);

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage])
  

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity 
              onPress={() => {
                setNumberImage(1)
                setModalVisible(true)
              }}
          >
              {
                image1 == ''
                ? <Image
                  style={ styles.image }
                  source={ require('../../../../../../assets/image_new.png') }
                  />
                : <Image 
                    source={{ uri: image1 }}
                    style={ styles.image }
                  />
              }
          </TouchableOpacity>
          
          <TouchableOpacity 
              onPress={() => {
                setNumberImage(2)
                setModalVisible(true)
              }}
          >
              {
                image2 == ''
                ? <Image
                  style={ styles.image }
                  source={ require('../../../../../../assets/image_new.png') }
                  />
                : <Image 
                    source={{ uri: image2 }}
                    style={ styles.image }
                  />
              }
          </TouchableOpacity>

          <TouchableOpacity 
              onPress={() => {
                setNumberImage(3)
                setModalVisible(true)
              }}
          >
              {
                image3 == ''
                ? <Image
                  style={ styles.image }
                  source={ require('../../../../../../assets/image_new.png') }
                  />
                : <Image 
                    source={{ uri: image3 }}
                    style={ styles.image }
                  />
              }
          </TouchableOpacity>
        </View>
        
        <View style={ styles.form }>
            <ScrollView>
              <View style={styles.categoryInfo}>
                <Image
                  style={styles.imageCategory}
                  source={ require('../../../../../../assets/menu.png') }
                  />
                <Text style={styles.textCategory}>Categoria Seleccionada</Text>
                <Text>{ category.name }</Text>
              </View>

              <CustomTextInput 
                  placeholder='Nombre de la producto'
                  image={ require('../../../../../../assets/categories.png')}
                  keyboardType='default'
                  property='name'
                  value={name}
                  onChangeText={ onChange }
              />
              <CustomTextInput 
                  placeholder='Descripcion'
                  image={ require('../../../../../../assets/description.png')}
                  keyboardType='default'
                  property='description'
                  value={description}
                  onChangeText={ onChange }
              />
              
              <CustomTextInput 
                  placeholder='Precio'
                  image={ require('../../../../../../assets/price.png')}
                  keyboardType='numeric'
                  property='price'
                  value={`${price}`}
                  onChangeText={ onChange }
              />

              <View style={styles.buttonContainer}>
                  <RoundedButton 
                      text='ACTUALIZAR PRODUCTO'
                      onPress={() => updateProduct()}
                  />
              </View>
              
            </ScrollView>

        </View>

        


        <ModalPickMultipleImage
          openGallery={ pickImage }
          openCamera={ takePhoto }
          modalUseState={ modalVisible }
          setModalUseState={ setModalVisible }
          numberImage={ numberImage }
          />

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
