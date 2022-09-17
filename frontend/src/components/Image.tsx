import {View, Image} from "native-base";
import React from "react";

const Picture = ({ source, width, height }: any) => {
    return(
        <View style={{width:width ? width :  null, height: height  ? height : null}}>
            <Image 
                source={{uri: source}}
                alt="image"
            />
        </View>
    )
}

export default Picture;