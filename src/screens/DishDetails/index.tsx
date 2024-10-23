import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters/extend';
import FastImage from 'react-native-fast-image';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '@/types/navigation.type';
import {deviceWidth} from '@/constants/device.constant';
import IconXML from '@/components/IconXML';
import BackWhite from '@/assets/icons/BackWhite';
import {useDispatch} from 'react-redux';
import {setCurrentRoute, setIsScrolling} from '@/store/reducers/system.reducer';
import {STACK} from '@/constants/screens.constant';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BlackGradientWrapperTop from '@/components/BlackGradientWrapperTop';
import Typo from '@/components/Typo';
import DotWhite from '@/assets/icons/DotWhite';
import {useTranslation} from 'react-i18next';
import BlackGradientWrapper from '@/components/BlackGradientWrapper';
import colorsConstant from '@/constants/colors.constant';
import ApproveMarker from '@/components/ApproveMarker';
import IngredientRequired from './IngredientRequired';
import {IDishDetailsInfo} from '@/types/otherchefs.type';
import SpicesRequired from './SpicesRequired';
import {EUnit} from '@/enums/kitchen.enum';
import Animated, {
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import ToolsRequired from './ToolsRequired';

const FAKE_INFO: IDishDetailsInfo = {
  post: {
    id: 1,
    is_standard: true,
    is_liked: true,
    published_time: 'abc',
    language: 'en',
    dish_info: {
      id: 1,
      name: 'abc',
      img_url: 'abc',
      duration: 40,
    },
  },
  list_ingredient: [
    {
      id: 1,
      name_en: 'Flour',
      name_vi: 'Bột mì',
      img_url: 'https://ezcloud.vn/wp-content/uploads/2024/02/flour-la-gi.webp',
      unit: EUnit.GRAM,
      quantity: 0,
      is_available: true,
    },
    {
      id: 2,
      name_en: 'Sugar',
      name_vi: 'Đường',
      img_url:
        'https://www.tasteofhome.com/wp-content/uploads/2019/11/sugar-shutterstock_615908132.jpg',
      unit: EUnit.GRAM,
      quantity: 0,
      is_available: false,
    },
    {
      id: 3,
      name_en: 'Egg',
      name_vi: 'Trứng',
      img_url:
        'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/health-benefits-of-eggs-1296x728-feature.jpg?w=1155&h=1528',
      unit: null, // No specific unit for countable items like eggs
      quantity: 0,
      is_available: true,
    },
    {
      id: 4,
      name_en: 'Milk',
      name_vi: 'Sữa',
      img_url:
        'https://hips.hearstapps.com/hmg-prod/images/filling-of-a-glass-of-milk-in-a-glass-glass-with-royalty-free-image-1707769552.jpg',
      unit: EUnit.ML,
      quantity: 0,
      is_available: true,
    },
    {
      id: 5,
      name_en: 'Butter',
      name_vi: 'Bơ',
      img_url:
        'https://cdn.tgdd.vn/2020/07/CookProduct/cach-lam-bo-butter-bang-kem-tuoi-heavy-cream-1-1200x676.jpg',
      unit: EUnit.GRAM,
      quantity: 0,
      is_available: true,
    },
    {
      id: 6,
      name_en: 'Salt',
      name_vi: 'Muối',
      img_url:
        'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322745/salt-shaker.jpg',
      unit: EUnit.GRAM,
      quantity: 0,
      is_available: false,
    },
    {
      id: 7,
      name_en: 'Baking Powder',
      name_vi: 'Bột nở',
      img_url:
        'https://www.seriouseats.com/thmb/eMPfsLI7D9h1UxnuoDWTmd_K7tM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2015__12__20151201-baking-powder-vicky-wasik-2-bc534b7950894f70844dd914295d5951.jpg',
      unit: EUnit.GRAM,
      quantity: 0,
      is_available: true,
    },
    {
      id: 8,
      name_en: 'Vanilla Extract',
      name_vi: 'Tinh chất vani',
      img_url:
        'https://www.clubhouse.ca/-/media/project/oneweb/clubhouseca/products/00066200004637_a1c1.png?rev=dce770297c5e439b9ba51ad0e946340b&vd=20220428T152526Z&extension=webp&hash=FE74673E0B47B5C3AE1A57688C989134',
      unit: EUnit.ML,
      quantity: 0,
      is_available: true,
    },
    {
      id: 9,
      name_en: 'Chicken Breast',
      name_vi: 'Ức gà',
      img_url:
        'https://rastellis.com/cdn/shop/products/Organic-Chicken-Beasts-2.jpg?v=1701718077&width=1946',
      unit: EUnit.GRAM,
      quantity: 0,
      is_available: true,
    },
    {
      id: 10,
      name_en: 'Olive Oil',
      name_vi: 'Dầu ô liu',
      img_url:
        'https://cdn-prod.medicalnewstoday.com/content/images/articles/321/321246/olive-oil-in-a-bottle-which-may-be-used-on-the-face.jpg',
      unit: EUnit.ML,
      quantity: 0,
      is_available: true,
    },
  ],
  list_spices: [
    {
      id: 1,
      name_en: 'def',
      name_vi: 'def',
      img_url: 'abc',
      is_available: true,
    },
  ],
  list_tools: [
    {
      id: 1,
      name_en: 'def',
      name_vi: 'def',
      img_url: 'abc',
      is_available: false,
    },
  ],
};

const DishDetails = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'dish_details'>>();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();

  const animation = useSharedValue(0);

  const translateX = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(animation.value, [0, 1], [-40, 0]),
        },
      ],
    };
  });

  const [data, setData] = useState<IDishDetailsInfo>();

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (event.nativeEvent.contentOffset.y > insets.top + verticalScale(48)) {
        dispatch(setIsScrolling(true));
      } else {
        dispatch(setIsScrolling(false));
      }
    },
    [dispatch, insets.top],
  );

  const animationEffect = useCallback(() => {
    animation.value = withDelay(
      300,
      withTiming(1, {
        duration: 500,
        reduceMotion: ReduceMotion.System,
        easing: Easing.inOut(Easing.cubic),
      }),
    );
  }, [animation]);

  useFocusEffect(
    useCallback(() => {
      dispatch(setCurrentRoute(STACK.DISH_DETAILS));
      dispatch(setIsScrolling(false));
    }, [dispatch]),
  );

  useEffect(() => {
    setData(FAKE_INFO);
    animationEffect();
  }, [animationEffect]);

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      style={styles.scrollView}
      onScroll={handleScroll}>
      <View style={styles.banner}>
        <BlackGradientWrapper width={deviceWidth} height={scale(120)}>
          <BlackGradientWrapperTop
            width={deviceWidth}
            height={insets.top + verticalScale(48)}>
            <FastImage
              source={{
                uri: params.dish_info.img_url,
                priority: 'high',
                cache: 'immutable',
              }}
              style={styles.dishImage}
            />
          </BlackGradientWrapperTop>
        </BlackGradientWrapper>
        <Animated.View
          style={[{opacity: animation}, styles.backButton, translateX]}>
          <IconXML
            icon={BackWhite}
            width={scale(42)}
            height={scale(42)}
            style={[
              {
                top: insets.top + verticalScale(8),
              },
            ]}
            onPress={() => navigation.goBack()}
          />
        </Animated.View>

        <Animated.View
          style={[styles.dishContainer, translateX, {opacity: animation}]}>
          <View style={styles.textDish}>
            <View style={styles.durationWrapper}>
              <IconXML icon={DotWhite} width={scale(6)} height={scale(6)} />
              <Typo style={styles.duration}>
                {params.dish_info.duration}{' '}
                {t('time.minute', {
                  s: params.dish_info.duration > 1 ? 's' : '',
                })}
              </Typo>
            </View>
            <Typo style={styles.dishName} numberOfLines={4}>
              {params.dish_info.name}
            </Typo>
          </View>
          <View style={styles.whiteLine} />
        </Animated.View>
        {params.is_standard && <ApproveMarker />}
      </View>
      <View style={styles.mainContainer}>
        {!params.is_standard && (
          <View style={styles.postInfo}>
            <View style={styles.postInfoTop}>
              <FastImage
                source={{uri: params.user_info?.avt_url}}
                style={styles.avatar}
              />
              <View style={styles.postInfoTexts}>
                <Typo style={styles.userName}>{params.user_info?.name}</Typo>
                <Typo style={styles.publishTime}>{params?.published_time}</Typo>
              </View>
            </View>
            <Typo style={styles.description}>{params.description}</Typo>
          </View>
        )}
        {data && (
          <>
            <IngredientRequired listIngredients={data.list_ingredient} />
            <SpicesRequired listSpices={data.list_spices} />
            <ToolsRequired listTools={data.list_tools} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default DishDetails;

const styles = ScaledSheet.create({
  screen: {
    position: 'relative',
    backgroundColor: colorsConstant.background,
  },
  scrollView: {
    backgroundColor: colorsConstant.background,
  },
  banner: {
    position: 'relative',
  },
  dishImage: {
    width: deviceWidth,
    height: '320@s',
  },
  backButton: {
    position: 'absolute',
    left: '16@s',
    zIndex: 2,
  },
  dishContainer: {
    position: 'absolute',
    bottom: '36@s',
    zIndex: 2,
    maxWidth: '90%',
  },
  dishName: {
    fontSize: '28@s',
    fontWeight: '600',
    color: '#FFF',
  },
  whiteLine: {
    height: '2@s',
    backgroundColor: '#FFF',
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  textDish: {
    alignItems: 'flex-start',
    marginLeft: '16@s',
    marginRight: '8@s',
    marginBottom: '4@s',
  },
  duration: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: '18@s',
  },
  durationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12@s',
  },
  postInfoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12@s',
  },
  avatar: {
    width: '48@s',
    height: '48@s',
    borderRadius: 999,
  },
  userName: {
    color: colorsConstant.black_1,
    fontWeight: '600',
    fontSize: '16@s',
  },
  publishTime: {
    color: colorsConstant.gray_1,
    fontSize: '14@s',
  },
  postInfoTexts: {},
  postInfo: {
    gap: '8@s',
  },
  description: {
    fontSize: '16@s',
    color: colorsConstant.black_2,
  },
  mainContainer: {
    paddingHorizontal: '20@s',
    paddingVertical: '12@s',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: colorsConstant.background,
    transform: [
      {
        translateY: -16,
      },
    ],
    zIndex: 2,
  },
});
