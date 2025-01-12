import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.Config"; // Firebase config dosyasını import et
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Kullanıcı Kaydı Başarılı:", userCredential.user);
      setSuccess("Üyelik başarıyla oluşturuldu!");
      setError("");

      // Başarılı kayıt sonrası Login ekranına yönlendir
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000); // 2 saniye bekletme
    } catch (err) {
      console.error("Kayıt Hatası:", err);
      setError("Üye olurken bir hata oluştu! E-postayı kontrol edin.");
      setSuccess("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {success && <Text style={styles.success}>{success}</Text>}
      <Button title="Üye Ol" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 4,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  success: {
    color: "green",
    marginBottom: 10,
  },
});

export default SignUpScreen;
