const config = {
  expo: {
    name: 'frontend',
    slug: 'frontend',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSLocationAlwaysAndWhenInUseUsageDescription:
          'Allow Ludu to use your location',
        NSLocatiNSLocationAlwaysUsageDescriptiononAlwaysAndWhenInUseUsageDescription:
          'Allow Ludu to use your location',
        NSLocationWhenInUseUsageDescription: 'Allow Ludu to use your location',
        UIBackgroundModes: ['location', 'fetch'],
        NSPhotoLibraryUsageDescription: 'Allow Ludu to use your photos',
      },
    },
    android: {
      package: 'com.luduTeam.ludu',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      config: {
        googleMaps: {
          apiKey: '',
        },
      },
      permissions: ['LOCATION', 'READ_EXTERNAL_STORAGE'],
    },
    web: {
      favicon: './assets/favicon.png',
    },
    // extra: {
    //   apiUrl: process.env.API_URL,
    // },
  },
};

export default config;
