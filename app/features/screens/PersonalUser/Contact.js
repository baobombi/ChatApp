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

const Contact = (props) => {
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
  const searchContact = (text) => {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === "" || text === null) {
      //console.log("da di vao day");
      loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
        setContacts(contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text, (err, contacts) => {
        setContacts(contacts);
      });
    }
  };

  let swipedCardRef = null;
  const onOpen = (ref) => {
    if (swipedCardRef) swipedCardRef.current.close();
    swipedCardRef = ref;
  };
  const onClose = (ref) => {
    if (ref == swipedCardRef) {
      swipedCardRef = null;
    }
  };
  const addNewContact = () => {
    var newPerson = {
      emailAddresses: [
        {
          label: "work",
          email: "mrniet@example.com",
        },
      ],
      familyName: "Nietzsche",
      givenName: "Friedrich",
      phoneNumbers: [
        {
          label: "mobile",
          number: "(555) 555-5555",
        },
      ],
    };
    Contacts.addContact(newPerson, (err) => {
      if (err) {
        throw err;
      }
      loadContacts();
    });
  };
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#00BFFF" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <View style={styles.container}>
          <Header source={Avatar} addNewContact={addNewContact} />
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
            renderItem={({ item, index }) => {
              return (
                <ListItem
                  leftElement={
                    <Avatar
                      img={
                        item.hasThumbnail
                          ? { uri: item.item.thumbnailPath }
                          : undefined
                      }
                      placeholder={getAvatarInitials(
                        `${item.givenName} ${item.familyName}`
                      )}
                      width={40}
                      height={40}
                    />
                  }
                  index={item}
                  //key={item.recordID}
                  onOpen={onOpen}
                  onClose={onClose}
                  title={`${item.givenName} ${item.familyName}`}
                  description={`${item.company}`}
                  onPress={() => props.navigation.navigate("ChatRoomNavigator")}
                  onDelete={() =>
                    Contacts.deleteContact(item, () => {
                      loadContacts();
                    })
                  }
                />
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
