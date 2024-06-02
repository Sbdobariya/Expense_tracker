import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainNavigatorType, RootPage} from '../../../navigation/type';

export const useExportData = () => {
  const navigation = useNavigation<NavigationProp<MainNavigatorType>>();

  const onBackPress = () => {
    navigation.goBack();
  };

  return {
    onBackPress,
  };
};
