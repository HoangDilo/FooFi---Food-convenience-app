// import {FlatList, Pressable, View} from 'react-native';
// import React, {useCallback, useState} from 'react';
// import {scale, ScaledSheet} from 'react-native-size-matters/extend';
// import colorsConstant from '@/constants/colors.constant';
// import HeaderStack from '@/components/HeaderStack';
// import {useTranslation} from 'react-i18next';
// import HomeSearch from '../Home/HomeSearch';
// import {IPost} from '@/types/otherchefs.type';
// import ItemPostOtherChefs from '@/components/ItemPostOtherChefs';
// import {RouteProp, useRoute} from '@react-navigation/native';
// import {RootStackParamList} from '@/types/navigation.type';
// import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
// import IconXML from '@/components/IconXML';
// import Filter from '@/assets/icons/Filter';

// const posts: IPost[] = [
//   {
//     id: 1,
//     is_standard: false,
//     description: 'A delicious Italian pasta recipe.',
//     published_time: '2024-10-19T14:46:47.669Z',
//     likes: 120,
//     is_liked: true,
//     language: 'English',
//     user_info: {
//       id: 101,
//       name: 'Alice Smith',
//       avt_url:
//         'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
//     },
//     dish_info: {
//       id: 201,
//       name: 'Spaghetti Carbonara',
//       img_url:
//         'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg',
//       duration: 30,
//     },
//   },
//   {
//     id: 2,
//     is_standard: false,
//     description: 'Spicy and flavorful Indian curry.',
//     published_time: '2024-10-17T10:15:00',
//     likes: 230,
//     is_liked: false,
//     language: 'Hindi',
//     user_info: {
//       id: 102,
//       name: 'Rahul Verma',
//       avt_url:
//         'https://img.freepik.com/free-psd/expressive-man-gesturing_23-2150198787.jpg',
//     },
//     dish_info: {
//       id: 202,
//       name: 'Chicken Curry',
//       img_url:
//         'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg',
//       duration: 45,
//     },
//   },
//   {
//     id: 3,
//     is_standard: false,
//     description: 'Quick and easy vegan salad recipe.',
//     published_time: '2024-10-16T12:00:00',
//     likes: 75,
//     is_liked: true,
//     language: 'English',
//     user_info: {
//       id: 103,
//       name: 'Emily Johnson',
//       avt_url:
//         'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg',
//     },
//     dish_info: {
//       id: 203,
//       name: 'Vegan Quinoa Salad',
//       img_url:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCkom1wMfJJeGRc7rwJa-Rkwgk7TkhuuG9w&s',
//       duration: 15,
//     },
//   },
//   {
//     id: 4,
//     is_standard: false,
//     description: 'A traditional Japanese sushi recipe.',
//     published_time: '2024-10-15T18:45:00',
//     likes: 310,
//     is_liked: true,
//     language: 'Japanese',
//     user_info: {
//       id: 104,
//       name: 'Hiroshi Tanaka',
//       avt_url:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0WxAubQyY-WaN8W-esXaxi_SfTKpjHYIf9w&s',
//     },
//     dish_info: {
//       id: 204,
//       name: 'Sushi Rolls',
//       img_url:
//         'https://www.refrigeratedfrozenfood.com/ext/resources/NEW_RD_Website/DefaultImages/default-pasta.jpg?1430942591',
//       duration: 50,
//     },
//   },
//   {
//     id: 5,
//     is_standard: false,
//     description: 'Sweet and refreshing tropical smoothie.',
//     published_time: '2024-10-14T08:00:00',
//     likes: 95,
//     is_liked: false,
//     language: 'English',
//     user_info: {
//       id: 105,
//       name: 'David Green',
//       avt_url:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAlv4JkKPHtDKYZTdKQP_m6MyKkh0lcI3IA&s',
//     },
//     dish_info: {
//       id: 205,
//       name: 'Mango Pineapple Smoothie',
//       img_url:
//         'https://media.cnn.com/api/v1/images/stellar/prod/160524092144-vietnam-street-food-bot-chien.jpg?q=w_1110,c_fill',
//       duration: 10,
//     },
//   },
//   {
//     id: 6,
//     is_standard: false,
//     description: 'Hearty French beef stew recipe.',
//     published_time: '2024-10-13T20:30:00',
//     likes: 150,
//     is_liked: true,
//     language: 'French',
//     user_info: {
//       id: 106,
//       name: 'Claire Dubois',
//       avt_url: 'https://image.vnreview.vn/12/29/122965.jpg',
//     },
//     dish_info: {
//       id: 206,
//       name: 'Boeuf Bourguignon',
//       img_url:
//         'https://cdn.britannica.com/98/235798-050-3C3BA15D/Hamburger-and-french-fries-paper-box.jpg',
//       duration: 180,
//     },
//   },
//   {
//     id: 7,
//     is_standard: false,
//     description: 'Classic American cheeseburger recipe.',
//     published_time: '2024-10-12T14:00:00',
//     likes: 210,
//     is_liked: false,
//     language: 'English',
//     user_info: {
//       id: 107,
//       name: 'John Miller',
//       avt_url:
//         'https://assets.vogue.com/photos/65418f5726fcdeb5a090adf8/master/w_2560%2Cc_limit/1530545900',
//     },
//     dish_info: {
//       id: 207,
//       name: 'Cheeseburger',
//       img_url: 'https://example.com/dish7.jpg',
//       duration: 25,
//     },
//   },
//   {
//     id: 8,
//     is_standard: false,
//     description: 'Traditional Chinese dumplings.',
//     published_time: '2024-10-11T17:00:00',
//     likes: 275,
//     is_liked: true,
//     language: 'Chinese',
//     user_info: {
//       id: 108,
//       name: 'Li Wei',
//       avt_url:
//         'https://www.usmagazine.com/wp-content/uploads/2021/06/Joshua-Bassett-male-celebrities-proud-feminists.jpg?quality=40&strip=all',
//     },
//     dish_info: {
//       id: 208,
//       name: 'Jiaozi Dumplings',
//       img_url: 'https://example.com/dish8.jpg',
//       duration: 60,
//     },
//   },
//   {
//     id: 9,
//     is_standard: false,
//     description: 'Easy-to-make Mexican taco recipe.',
//     published_time: '2024-10-10T13:00:00',
//     likes: 180,
//     is_liked: false,
//     language: 'Spanish',
//     user_info: {
//       id: 109,
//       name: 'Carlos Sanchez',
//       avt_url:
//         'https://townsquare.media/site/10/files/2024/03/attachment-gettyimages-1797937533.jpg?w=780&q=75',
//     },
//     dish_info: {
//       id: 209,
//       name: 'Chicken Tacos',
//       img_url: 'https://example.com/dish9.jpg',
//       duration: 20,
//     },
//   },
//   {
//     id: 10,
//     is_standard: false,
//     description: 'A flavorful Middle Eastern falafel recipe.',
//     published_time: '2024-10-09T11:30:00',
//     likes: 240,
//     is_liked: true,
//     language: 'Arabic',
//     user_info: {
//       id: 110,
//       name: 'Ahmed Al-Farsi',
//       avt_url:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR520v8ZKYDXHuCqd1lrWWmGElUgqDDccpRpw&s',
//     },
//     dish_info: {
//       id: 210,
//       name: 'Falafel',
//       img_url: 'https://example.com/dish10.jpg',
//       duration: 40,
//     },
//   },
// ];

// const SearchScreen = () => {
//   const {t} = useTranslation();
//   const {params} = useRoute<RouteProp<RootStackParamList, 'search'>>();

//   const [searchValue, setSearchValue] = useState(params?.query || '');

//   const handleLoadMore = useCallback(() => {}, []);

//   const handleSearch = useCallback(() => {}, []);

//   const handleOpenFilter = useCallback(() => {}, []);

//   return (
//     <View style={styles.screen}>
//       <HeaderStack title={t('home.search')} />
//       <View style={styles.container}>
//         <View style={styles.searchWrapper}>
//           <View style={styles.top}>
//             <HomeSearch
//               isShowLabel={false}
//               isShowButtonSearch={false}
//               searchIconPosition="right"
//               value={searchValue}
//               onChange={setSearchValue}
//               onSearch={handleSearch}
//             />
//             <Pressable
//               style={styles.iconFilterWrapper}
//               onPress={handleOpenFilter}>
//               <IconXML
//                 icon={Filter}
//                 width={scale(28)}
//                 height={scale(28)}
//                 style={styles.iconFilter}
//               />
//             </Pressable>
//           </View>
//           <View style={styles.filter}>
//             <View style={styles.itemFilter}></View>
//           </View>
//         </View>
//         <FlatList
//           contentContainerStyle={styles.flatListContainer}
//           data={posts}
//           keyExtractor={item => `${item.id}`}
//           renderItem={({item}) => <ItemPostOtherChefs post={item} />}
//           showsVerticalScrollIndicator={false}
//           onEndReached={handleLoadMore}
//         />
//       </View>
//       <View style={styles.bottomSheetWrapper}>
//         <BottomSheet snapPoints={[120]} enableDynamicSizing={true}>
//           <BottomSheetScrollView
//             style={styles.bottomSheetScrollView}
//             contentContainerStyle={styles.bottomSheetScrollViewContainer}>
//             <View style={{backgroundColor: 'red', height: 40}}></View>
//           </BottomSheetScrollView>
//         </BottomSheet>
//       </View>
//     </View>
//   );
// };

// export default SearchScreen;

// const styles = ScaledSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: colorsConstant.background,
//     position: 'relative',
//   },
//   container: {
//     flex: 1,
//   },
//   searchWrapper: {
//     paddingHorizontal: '12@s',
//     marginBottom: '24@s',
//   },
//   top: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: '12@s',
//   },
//   flatListContainer: {
//     gap: '36@s',
//     paddingBottom: '32@s',
//     paddingTop: '12@s',
//     backgroundColor: colorsConstant.background,
//   },
//   filter: {
//     flexDirection: 'row',
//   },
//   iconFilter: {},
//   iconFilterWrapper: {
//     borderRadius: 999,
//     shadowColor: colorsConstant.shadow,
//     backgroundColor: '#FFF',
//     padding: '6@s',
//     elevation: 4,
//     shadowOffset: {
//       width: 3,
//       height: 3,
//     },
//   },
//   bottomSheetWrapper: {
//     position: 'absolute',
//     flex: 1,
//     zIndex: 2,
//   },
//   bottomSheetScrollView: {},
//   bottomSheetScrollViewContainer: {},
// });

import React, {useCallback, useRef, useMemo} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

const App = () => {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const data = useMemo(
    () =>
      Array(7)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );
  const snapPoints = useMemo(() => ['25%'], []);

  // callbacks
  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    item => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    [],
  );
  return (
    <GestureHandlerRootView style={styles.container}>
      <Button title="Snap To 90%" onPress={() => handleSnapPress(1)} />
      <Button title="Snap To 50%" onPress={() => handleSnapPress(0)} />
      <Button title="Close" onPress={() => handleClosePress()} />
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={true}
        onChange={handleSheetChange}
        enablePanDownToClose>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {data.map(renderItem)}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});

export default App;
