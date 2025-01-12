import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.Config";
import { useNavigation } from "@react-navigation/native";
import { CustomInput } from "./common/CustomInput";
import { CustomButton } from "./common/CustomButton";
import { COLORS, FONTS, SPACING } from "../theme/theme";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("UploadPhoto");
    } catch (err) {
      setError("E-posta veya şifre hatalı!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Kitchen Wizard</Text>
          <Text style={styles.subtitle}>Mutfağınızın Sihirbazı</Text>
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            value={email}
            onChangeText={setEmail}
            placeholder="E-posta"
            keyboardType="email-address"
            error={error}
          />
          
          <CustomInput
            value={password}
            onChangeText={setPassword}
            placeholder="Şifre"
            secureTextEntry
          />

          <CustomButton
            title="Giriş Yap"
            onPress={handleSignIn}
            fullWidth
          />

          <CustomButton
            title="Hesabın yok mu? Üye Ol"
            onPress={() => navigation.navigate("SignUp")}
            variant="outline"
            fullWidth
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: SPACING.xxl,
    marginBottom: SPACING.xl,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
  },
  formContainer: {
    paddingHorizontal: SPACING.xl,
  },
});

export default LoginScreen;