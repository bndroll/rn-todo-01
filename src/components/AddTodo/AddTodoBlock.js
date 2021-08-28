import React, {useState} from "react"
import {Alert, StyleSheet, TextInput, TouchableOpacity, View, Keyboard, Dimensions} from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import {AntDesign} from '@expo/vector-icons'

import {THEME} from "../../themes/theme"
import {AppButton} from "../ui/AppButton";


export const AddTodoBlock = ({addTodo}) => {
    const [value, setValue] = useState('')

    const onAddPress = () => {
        if (value.trim().length > 2) {
            addTodo(value)
            setValue('')
            Keyboard.dismiss()
        } else {
            Alert.alert('Ошибка',
                `Минимальная длина названия 3 символа. Сейчас ${value.trim().length} символов`)
        }
    }
    const onClearPress = () => {
        setValue('')
    }

    return (
        <View style={styles.block}>
            <AppButton styleButton={{...styles.button}}
                       styleText={styles.buttonText}
                       pressFunc={onClearPress}>
                <MaterialIcons name="delete" size={24} color={THEME.DANGER_COLOR} />
            </AppButton>

            <TextInput style={styles.input}
                       onChangeText={setValue}
                       maxLength={64}
                       autoCorrect={false}
                       value={value} />

            <AppButton styleButton={{...styles.button}}
                       styleText={styles.buttonText}
                       pressFunc={onAddPress}>
                <AntDesign name="pluscircle" size={24} color={THEME.GREEN_COLOR} />
            </AppButton>
        </View>
    )
}

const styles  = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    input: {
        flex: 1,
        paddingVertical: Dimensions.get('window').height / 50,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: THEME.BORDER_BUTTONS_COLOR,
        fontSize: 20,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: Dimensions.get('window').width / 30,
        paddingVertical: Dimensions.get('window').height / 50,
        borderRadius: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: THEME.BORDER_BUTTONS_COLOR,
    },
    buttonText: {
        fontSize: 20,
    },
})