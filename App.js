import React, { useEffect, useState } from 'react';
import { View, Button, Alert, TextInput } from 'react-native';
import messaging, { firebase } from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
const constTopic = 'NewTest';
const App = () => {

  useEffect(() => {
    requestPermission()

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("Messgae " + remoteMessage.notification.title + "\n" + "body" + remoteMessage.notification.body)
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
 firebase.messaging().subscribeToTopic(constTopic);
    return unsubscribe;
  }, [])
  const getFCMToken = () => {
   firebase. messaging().getToken().then((fcmtoken) => {

      console.log('fcm token', fcmtoken)
    })
  }

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();

  }

  const onDisplayLocalNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Your scuress fully register',
      body: 'Main body content of the notification',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  const onDisplayRemoteNotification = async () => {
   
     await messaging().getToken().then((remoteMessage)=>{
     console.log('token recieved' + remoteMessage)
        try {
          messaging.NotificationAndroidVisibility.VISIBILITY_PUBLIC
        } catch (error) {
          
        } 
    })

    
   
    // Create a channel (required for Android)
  
  }



  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
       
      <Button title="Display Local Notification" onPress={()=>getFCMToken()} />
      <View style={{ marginTop: 10 }}>
       
        <Button title="Display Remote Notification" onPress={onDisplayLocalNotification} />
      </View>
    </View>
  )
}

export default App