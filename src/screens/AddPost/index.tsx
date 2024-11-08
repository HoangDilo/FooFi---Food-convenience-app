import {ScrollView, TextInput, View} from 'react-native';
import React from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters/extend';
import colorsConstant from '@/constants/colors.constant';
import HeaderStack from '@/components/HeaderStack';
import {useTranslation} from 'react-i18next';
import Typo from '@/components/Typo';
import IconXML from '@/components/IconXML';
import NoImage from '@/assets/icons/NoImage';
import ImagePlus from '@/assets/icons/ImagePlus';

const AddPost = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.screen}>
      <HeaderStack title={t('add_post.title')} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <View>
          <View style={styles.imageDishTop}>
            <Typo style={styles.label}>{t('add_post.dish_image')}:</Typo>
            <IconXML icon={ImagePlus} width={scale(24)} height={scale(24)} />
          </View>
          <View style={styles.noImageContainer}>
            <IconXML
              icon={NoImage}
              width={scale(40)}
              height={scale(40)}
              style={styles.emptyImage}
            />
            <Typo style={styles.noImageLabel}>{t('add_post.no_image')}</Typo>
          </View>
        </View>
        <View>
          <Typo style={styles.label}>{t('add_post.label_dish_name')}:</Typo>
          <TextInput
            style={styles.dishName}
            cursorColor={colorsConstant.primary}
            placeholderTextColor={colorsConstant.gray_4}
            placeholder={t('add_post.dish_name_placeholder')}
          />
        </View>
        <View>
          <Typo style={styles.label}>{t('add_post.dish_desc')}:</Typo>
          <TextInput
            style={styles.dishDesc}
            cursorColor={colorsConstant.primary}
            placeholderTextColor={colorsConstant.gray_4}
            placeholder={t('add_post.dish_desc_placeholder')}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddPost;

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colorsConstant.background,
  },
  scrollView: {
    marginTop: '12@s',
  },
  container: {
    paddingHorizontal: '24@s',
    gap: '16@s',
  },
  dishName: {
    borderWidth: '1@s',
    borderColor: colorsConstant.gray_4,
    borderRadius: '20@s',
    paddingVertical: '4@s',
    paddingHorizontal: '16@s',
    fontSize: '16@s',
    color: colorsConstant.black_2,
  },
  label: {
    fontWeight: '500',
    fontSize: '16@s',
    color: colorsConstant.black_2,
    marginLeft: '8@s',
    marginBottom: '8@s',
  },
  emptyImage: {
    alignSelf: 'center',
  },
  noImageLabel: {
    fontWeight: '600',
    color: colorsConstant.gray_4,
    alignSelf: 'center',
    fontSize: '14@s',
  },
  imageDishTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noImageContainer: {
    marginTop: '4@s',
    backgroundColor: colorsConstant.gray_3,
    padding: '32@s',
    borderRadius: '16@s',
  },
  dishDesc: {
    borderWidth: '1@s',
    borderColor: colorsConstant.gray_4,
    borderRadius: '16@s',
    paddingVertical: '12@s',
    paddingHorizontal: '16@s',
    fontSize: '16@s',
    color: colorsConstant.black_2,
    height: '120@vs',
  },
});
