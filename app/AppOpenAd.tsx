import { AdEventType, AppOpenAd, BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";


let appOpenAd: AppOpenAd | null = null;
const adUnitId = 'ca-app-pub-1726341387159051/8345265629';

export const loadAppOpenAd = async () => {
  appOpenAd = AppOpenAd.createForAdRequest(__DEV__ ? TestIds.APP_OPEN : adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  appOpenAd.addAdEventListener(AdEventType.LOADED, ()=>  console.log('App Open Ad Loaded'));
  appOpenAd.addAdEventListener(AdEventType.CLOSED, ()=>{
    console.log('App Open Ad Closed');
    loadAppOpenAd();
  })

  try {
    await appOpenAd.load();
    console.log('App Open Ad loaded successfully');
  } catch (error) {
    console.error('Failed to load App Open Ad:', error);
  }
};

export const showAppOpenAd = () => {
  if (appOpenAd?.loaded) {
    appOpenAd.show();
  } else {
    console.log('App Open Ad not ready to show.');
  }
};
