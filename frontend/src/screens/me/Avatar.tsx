import * as React from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { primaryColor } from '../../utils/colors';

const AvatarMe = ({avatarUri, username}: {avatarUri: string, username: string}) => {

    const AvatarWithUri = () => {
        return <Avatar.Image size={84} source={{uri: avatarUri}} />
    }

    const AvatarLess = () => {
        return <Avatar.Text size={84} label={username.slice(0,2).toUpperCase()}  color='white'
        style={{ backgroundColor: primaryColor }} />
    }

    return (
        <View style={{marginBottom:4}}>
            {avatarUri.length !== 0 ? <AvatarWithUri/> : <AvatarLess/>}
        </View>
    )
}

export default AvatarMe