import React, { useEffect, useContext, useState } from "react"
import { View, Text } from "react-native"
import Modal from 'react-native-modal';

export default function CustomModal({ isVisible, Message }) {
  const [showModal, setShowModal] = useState(false)


  return (
    <View>
      <Modal isVisible={isVisible}>
        <View style={{ flex: 0.2, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', alignContent: 'center', borderRadius: 5 }}>
          <Text style={{ fontSize: 18 }}>{Message}</Text>
        </View>
      </Modal>
    </View>
  );
}