import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS, FONTS, SHADOWS, SPACING } from '../../theme/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CustomButton = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const getButtonStyles = () => {
    const baseStyle = [styles.button];
    
    if (variant === 'primary') {
      baseStyle.push(styles.primaryButton);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.secondaryButton);
    } else if (variant === 'outline') {
      baseStyle.push(styles.outlineButton);
    }

    if (size === 'small') {
      baseStyle.push(styles.smallButton);
    } else if (size === 'large') {
      baseStyle.push(styles.largeButton);
    }

    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }

    if (disabled) {
      baseStyle.push(styles.disabled);
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.buttonContent}>
        {icon && (
          <Icon
            name={icon}
            size={24}
            color={variant === 'outline' ? COLORS.primary : COLORS.text.inverse}
            style={styles.icon}
          />
        )}
        <Text style={[
          styles.buttonText,
          variant === 'outline' && styles.outlineButtonText,
          textStyle
        ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    ...SHADOWS.medium,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: SPACING.sm,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    height: 55,
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
    height: 55,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    height: 55,
  },
  smallButton: {
    height: 40,
    paddingHorizontal: SPACING.md,
  },
  largeButton: {
    height: 60,
    paddingHorizontal: SPACING.xl,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: COLORS.text.inverse,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  outlineButtonText: {
    color: COLORS.primary,
  },
}); 