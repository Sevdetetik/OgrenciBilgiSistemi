import React from 'react';
import { View, Text, Button } from 'react-native';

// Example reusable component
export const ButtonComponent = ({ title, onPress }) => (
  <Button title={title} onPress={onPress} />
);

// Another example reusable component
export const HeaderComponent = ({ title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

// Exporting all components
export { ButtonComponent, HeaderComponent };