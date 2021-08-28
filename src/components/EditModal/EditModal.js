import React, {useState} from "react"
import {Alert, Dimensions, Keyboard, Modal, StyleSheet, TextInput, View} from "react-native"

import {THEME} from "../../themes/theme"
import {AntDesign} from '@expo/vector-icons'
import {AppButton} from "../ui/AppButton"


export const EditModal = ({visible, cancelModal, value, onSave}) => {
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Ошибка',
                `Минимальная длина названия 3 символа. Сейчас ${title.trim().length} символов`)
        } else {
            onSave(title)
            Keyboard.dismiss()
        }
    }

    const cancelHandler = () => {
        setTitle(value)
        cancelModal()
    }

    return (
        <Modal visible={visible} animationType='fade' >
            <View style={styles.wrapper}>
                <TextInput style={styles.input}
                           autoCorrect={false}
                           maxLength={64}
                           value={title}
                           onChangeText={setTitle}
                           placeholder='Введите новое название' />

                <View style={styles.buttonsContainer}>
                    <AppButton styleButton={{...styles.button, backgroundColor: THEME.GREY_COLOR}}
                               styleText={styles.buttonText}
                               pressFunc={cancelHandler}>
                        <AntDesign name="back" size={24} color="#fff" />
                    </AppButton>

                    <AppButton styleButton={{...styles.button, backgroundColor: THEME.BLUE_COLOR}}
                               styleText={styles.buttonText}
                               pressFunc={saveHandler}>
                        <AntDesign name="check" size={24} color="#fff" />
                    </AppButton>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.BORDER_BUTTONS_COLOR,
        borderBottomWidth: 2,
        width: '80%',
        marginBottom: 20,
        fontSize: 22,
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    button: {
        backgroundColor: THEME.BLUE_COLOR,
        paddingHorizontal: Dimensions.get('window').width / 7,
    },
    buttonText: {},
})

