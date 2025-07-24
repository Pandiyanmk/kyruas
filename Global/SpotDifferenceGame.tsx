import { View, Button, Image, TextInput, TouchableOpacity, Text, FlatList, Appearance, StyleSheet, Dimensions, ImageBackground } from "react-native"
import { strings } from "../Localization"
import { colorScheme, style } from "../Values/AppStyles"
import { colors } from "../Values/AppColores"
import React, { useState } from 'react';




export const SpotDifferenceGame = () => {

    const [select, isSelected] = useState(0)


    return <View style={{ flex: 1, gap: 30 }}>
        <TouchableOpacity onPress={() => {
            isSelected(1)
        }} style={{ flex: 1, width: '100%' }}><ImageBackground source={{ uri: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={{ flex: 1, width: '100%' }} resizeMode='cover'>

                {
                    select == 1 ? <View style={{ flex: 1, width: '100%', backgroundColor: '#1B98E08C' }} /> : null}

            </ImageBackground></TouchableOpacity>

        <TouchableOpacity onPress={() => {
            isSelected(2)
        }} style={{ flex: 1, width: '100%' }}><ImageBackground source={{ uri: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={{ flex: 1, width: '100%' }} resizeMode='cover' >

                {
                    select == 2 ? <View style={{ flex: 1, width: '100%', backgroundColor: '#1B98E08C' }} /> : null}

            </ImageBackground></TouchableOpacity>
    </View>
}