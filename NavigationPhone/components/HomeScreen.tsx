import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const HomeScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.HomeContainer}>
      <Image
        source={require("../assets/Vsmart-Xanh.png")}
        resizeMode="contain"
        style={{
          height: 400,
          borderWidth: 1,
        }}
      />
      <Text style={{ fontSize: 18, marginTop: 20 }}>
        Điện thoại Vsmart Joy 3 - Hàng chính hãng
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <AntDesign name="star" size={24} color="yellow" />
        <AntDesign name="star" size={24} color="yellow" />
        <AntDesign name="star" size={24} color="yellow" />
        <AntDesign name="star" size={24} color="yellow" />
        <AntDesign name="star" size={24} color="yellow" />
        <TouchableOpacity style={{ paddingLeft: 40 }}>
          <Text>(Xem 828 đánh giá)</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>1.790.000 đ</Text>
        <Text style={{ paddingLeft: 90, fontSize: 18, fontWeight: "bold" }}>
          1.790.000 đ
        </Text>
      </View>
      <Text style={{ fontSize: 16, fontWeight: "bold", color: "red" }}>
        Ở đâu rẻ hơn hoàn tiền
        <AntDesign name="question-circle" size={24} color="black" />
      </Text>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          padding: 5,
          marginTop: 14,
        }}
        onPress={() => navigation.navigate("Color")}
      >
        <Text style={{ fontSize: 18 }}>4 MÀU - CHỌN MÀU</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          padding: 5,
          marginTop: 26,
          backgroundColor: "red",
        }}
      >
        <Text style={{ fontSize: 24, color: "#fff" }}>CHỌN MUA</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
