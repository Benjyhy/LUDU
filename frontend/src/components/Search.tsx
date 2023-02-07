import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Switch } from 'react-native-paper';
import findRoutes from '../navigation/appRoutes/findRoutes';
import * as RootNavigation from '../navigation/rootNavigation';
import appRoutes from '../navigation/appRoutes';
import { lowGray, primaryColor } from '../utils/const';

const Search = () => {
  const [isMap, setIsMap] = useState(true);
  const routesToDisplaySearchComponent = [
    findRoutes.HOME_FEED,
    findRoutes.MAP_VIEW,
  ];
  let currentRoute;

  if (
    RootNavigation.navigationRef.getCurrentRoute()?.name ===
    appRoutes.TAB_NAVIGATOR
  ) {
    currentRoute = findRoutes.HOME_FEED;
  } else {
    currentRoute = RootNavigation.navigationRef.getCurrentRoute()
      ?.name as findRoutes;
  }

  const handleToggle = () => {
    setIsMap(!isMap);
    const targetedRoute = isMap ? findRoutes.MAP_VIEW : findRoutes.HOME_FEED;
    RootNavigation.navigate(targetedRoute, {});
  };

  if (!routesToDisplaySearchComponent.includes(currentRoute)) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
      }}
    >
      <TextInput
        placeholder="Lille"
        mode={'flat'}
        activeOutlineColor={`${primaryColor}`}
        outlineColor={`${lowGray}`}
        selectionColor={`${primaryColor}`}
        underlineColor="transparent"
        style={{
          width: '80%',
          height: 30,
        }}
        theme={{
          colors: {
            primary: `transparent`,
          },
        }}
      />
      <Switch
        onValueChange={handleToggle}
        value={!isMap}
        color={primaryColor}
        style={{ height: 30, width: '20%' }}
      />
    </View>
  );
};

export default Search;
