import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextComponent } from "~/componenets/atoms/TextComponent";

export default function Explore() {
  return (
    <View style={styles.container}>
      <TextComponent
        preset="title"
        untranslatedText="Explore"
        style={{ paddingBottom: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import React from "react";
// import { Image } from "expo-image";
// import MapView from "react-native-maps";

// export default function Explore() {
//   return (
//     <View style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <Image
//           source={require("../../../assets/appicon.png")}
//           style={styles.logo}
//         />
//         <TouchableOpacity>
//           <Text style={styles.changeLocation}>Change location</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Map Section */}
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       />

//       {/* Nearby Restaurants */}
//       <View style={styles.nearbyContainer}>
//         <Text style={styles.nearbyText}>Nearby QR Cuisines</Text>
//         <View style={styles.restaurantList}>
//           <Text>Ren Thai Restaurant (50 vacant)</Text>
//           <Button title="Book now" onPress={() => {}} />
//         </View>
//       </View>

//       {/* Services Section */}
//       <View style={styles.servicesContainer}>
//         <TouchableOpacity style={styles.serviceButton}>
//           <Text style={styles.buttonText}>Scan Table</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.serviceButton}>
//           <Text style={styles.buttonText}>Quick Reserve Table</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.serviceButton}>
//           <Text style={styles.buttonText}>Apply Now</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   logo: {
//     width: 100,
//     height: 50,
//   },
//   changeLocation: {
//     fontSize: 14,
//     color: "#007AFF",
//   },
//   map: {
//     height: 250,
//     marginBottom: 16,
//   },
//   nearbyContainer: {
//     marginBottom: 16,
//   },
//   nearbyText: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   restaurantList: {
//     backgroundColor: "#f5f5f5",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 8,
//   },
//   servicesContainer: {
//     marginTop: 16,
//   },
//   serviceButton: {
//     backgroundColor: "#FF6F00",
//     padding: 12,
//     marginBottom: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });
