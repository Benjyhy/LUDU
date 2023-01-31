import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { InlineTextIcon } from "../../components/InlineTextIcon";
import { bgColor } from "../../utils/colors";
import Layout from "../Layout";
import AvatarMe from "../me/Avatar";
import LinkTab from "../me/LinkTab";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from '@expo/vector-icons'; 

const MeScreen = () => {
    const username =  "Paul"
    const avatarUri = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fplay-lh.googleusercontent.com%2FIeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3&imgrefurl=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dclub.pixelbox.instasquare%26hl%3Dfr&tbnid=UpFlDg0yKYcSKM&vet=12ahUKEwjl-feyle38AhWQWKQEHVZNAdAQMygAegUIARC8AQ..i&docid=vdqGgIPlepjDJM&w=512&h=512&q=square%20img&ved=2ahUKEwjl-feyle38AhWQWKQEHVZNAdAQMygAegUIARC8AQ";

    return ( 
        <Layout title={"Profil"}>
            <View style={{ flexDirection: "column", justifyContent: "center", alignItems:"center", backgroundColor: bgColor}}>
                <AvatarMe avatarUri={avatarUri} username={username} />
                <Text variant="bodyMedium">Change your avatar</Text>
                <LinkTab icon="lol" label="Ton guide Ludu"/>
                <View style={{ width:"100%" ,marginVertical:8, flexDirection: "row", justifyContent: "space-between", alignItems:"center", backgroundColor: "#fff"}}>
                <InlineTextIcon text="About ludu" icon="location"/>
                <View style={{flexDirection: "row", justifyContent: "center", alignItems:"center", }}>
                    <Text style={{marginLeft:4, color:bgColor}}>LOL</Text>
                    <Button>
                    <MaterialIcons name={"keyboard-arrow-right"} color={bgColor} size={24} />
                    </Button>
                </View>
                </View>
        </View>
        </Layout>
    )
};

export default MeScreen;