import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import Contacts from "react-native-contacts";
import Header from "../../../core/components/ContactScreen/Header";
import SearchBar from "../../../core/components/ContactScreen/SearchBar";
import ListItem from "../../../core/components/ContactScreen/ListItem";
import Avatar from "../../../core/components/ContactScreen/Avatar";

const Contact = () => {
  const [contacts, setContacts] = useState(null);
  const [isLoadding, setIsLoading] = useState(true);
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search");
  useEffect(() => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to view your contacts.",
      }).then(() => {
        loadContacts();
      });
    } else {
      loadContacts();
    }
  }, []);

  //console.log(contacts);
  const loadContacts = async () => {
    Contacts.getAll((err, contacts) => {
      if (err === "denied") {
        console.warn("Permission to access contacts was denied");
      } else {
        setContacts(contacts);
        setIsLoading(false);
      }
    });
    Contacts.getCount((count) => {
      setSearchPlaceholder(`Search ${count} contacts`);
    });
  };

  const getAvatarInitials = (textString) => {
    if (!textString) {
      return "";
    }
    const text = textString.trim();
    const textSplit = text.split(" ");
    if (textSplit.length <= 1) {
      return text.charAt(0);
    }
    const initials =
      textSplit[0].charAt(0) + " " + textSplit[textSplit.length - 1].charAt(0);
    return initials;
  };

  const searchContact = (text) => {};

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#00BFFF" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <View style={styles.container}>
          <Header source={Avatar} />
          <SearchBar
            searchPlaceholder={searchPlaceholder}
            onChangeText={searchContact}
          />
        </View>

        {isLoadding === true ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.recordID}
            renderItem={(item) => {
              return (
                <>
                  <ListItem
                    leftElement={
                      <Avatar
                        img={
                          item.item.hasThumbnail
                            ? { uri: item.item.thumbnailPath }
                            : undefined
                        }
                        placeholder={getAvatarInitials(
                          `${item.item.givenName} ${item.item.familyName}`
                        )}
                        width={40}
                        height={40}
                      />
                    }
                    key={item.item.recordID}
                    title={`${item.item.givenName} ${item.item.familyName}`}
                    description={`${item.item.company}`}
                    onDelete={() =>
                      Contacts.deleteContact(item.item, () => {
                        loadContacts();
                      })
                    }
                  />
                </>
              );
            }}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    //flex: 1,
  },
  spinner: {},
});

export default Contact;
