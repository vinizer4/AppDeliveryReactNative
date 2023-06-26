import React, { useState, useContext } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { CreateCategoryUseCase } from '../../../../../Domain/useCases/category/CreateCategory';
import { CategoryContext } from '../../../../context/CategoryContext';
import { Category } from '../../../../../Domain/entities/Category';
import { ProductContext } from '../../../../context/ProductContext';

const AdminProductCreateViewModel = (category: Category) => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        image1: '',
        image2: '',
        image3: '',
        price: 0,
        id_category: category.id,
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [file1, setFile1] = useState<ImagePicker.ImageInfo>()
    const [file2, setFile2] = useState<ImagePicker.ImageInfo>()
    const [file3, setFile3] = useState<ImagePicker.ImageInfo>()
    const { create } = useContext(ProductContext);

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const createProduct = async () => {
        console.log('PRODUCTO FORMULARIO: ' + JSON.stringify(values));
        
        let files = [];
        files.push(file1!);
        files.push(file2!);
        files.push(file3!);

        setLoading(true);
        const response = await create(values, files);
        setLoading(false);
        setResponseMessage(response.message);
        if (response.success) {
            resetForm();
        }
    }

    const pickImage = async (numberImage: number) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {

            if (numberImage == 1) {
                onChange('image1', result.assets[0].uri); 
                setFile1(result.assets[0]);
            }
            else if (numberImage == 2) {
                onChange('image2', result.assets[0].uri); 
                setFile2(result.assets[0]);
            }
            else if (numberImage == 3) {
                onChange('image3', result.assets[0].uri); 
                setFile3(result.assets[0]);
            }

        }
    }
    
    const takePhoto = async (numberImage: number) => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            if (numberImage == 1) {
                onChange('image1', result.assets[0].uri); 
                setFile1(result.assets[0]);
            }
            else if (numberImage == 2) {
                onChange('image2', result.assets[0].uri); 
                setFile2(result.assets[0]);
            }
            else if (numberImage == 3) {
                onChange('image3', result.assets[0].uri); 
                setFile3(result.assets[0]);
            }
        }
    }

    const resetForm = async () => {
        setValues({
            name: '',
            description: '',
            image1: '',
            image2: '',
            image3: '',
            price: 0,
            id_category: category.id,
        })
    }

    return {
        ...values,
        onChange,
        takePhoto,
        pickImage,
        createProduct,
        loading,
        responseMessage
    }
}

export default AdminProductCreateViewModel;