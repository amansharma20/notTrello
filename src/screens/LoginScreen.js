/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import { colors } from '../../notTrello/constants';

export default function LoginScreen() {

  const { signInWithGoogle, isLoading } = useAuth();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.themeBackground} barStyle='light-content' />
      <Image
        style={{
          resizeMode: 'contain', width: 350, height: 350, alignSelf: 'center'
        }}
        source={require('../../notTrello/assets/icons/notTrello.png')} />
      <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'normal', alignSelf: 'center' }}>{isLoading ? 'Loading...' : ''}</Text>
      <TouchableOpacity style={styles.loginButton} onPress={signInWithGoogle} >
        <Image
          style={{
            resizeMode: 'contain', width: 30, height: 30, alignSelf: 'center'
          }}
          source={require('../../notTrello/assets/icons/preview.png')} />
        <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>Sign In with Google</Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeBackground,
    justifyContent: 'space-between',
    paddingVertical: 100
  },
  loginButton: {
    backgroundColor: colors.themePink,
    alignSelf: 'center',
    width: '60%',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
