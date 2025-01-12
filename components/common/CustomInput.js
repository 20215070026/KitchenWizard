import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../theme/theme';

export const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          style
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.text.secondary}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize || 'none'}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.surface,
    height: 55,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.xs,
  },
}); 