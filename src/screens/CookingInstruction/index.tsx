// import {StyleSheet, Text, View} from 'react-native';
// import React, {useEffect} from 'react';
// import {useDispatch} from 'react-redux';
// import {setIsBottomTabHidden} from '@/store/reducers/system.reducer';

// const CookingInstruction = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     setTimeout(() => {
//       dispatch(setIsBottomTabHidden(false));
//     }, 200);
//   }, []);

//   return (
//     <View>
//       <Text>CookingInstruction</Text>
//     </View>
//   );
// };

// export default CookingInstruction;

// const styles = StyleSheet.create({});

import React, { useRef, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const MyComponent = () => {
  // Ref to access Bottom Sheet
  const bottomSheetRef = useRef(null);

  // Snap points for Bottom Sheet
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // Create a callback to render the backdrop
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={1}
        style={{backgroundColor: 'black'}}
        appearsOnIndex={-1} // Appears when the bottom sheet is at index 0 or higher
        onPress={() => console.log('Backdrop pressed!')} // This works on press
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1} // Initial open state of the sheet (1 means it opens halfway)
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop} // Add backdrop here
        enablePanDownToClose
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MyComponent;

