import {StyleSheet, View} from 'react-native';
import React from 'react';
import DateTimePicker, {DateType} from 'react-native-ui-datepicker';
import Modal from 'react-native-modal';

interface CalenderModalProps {
  isVisible: boolean;
  toggleModal: () => void;
  setRange: React.Dispatch<
    React.SetStateAction<{
      startDate: DateType;
      endDate: DateType;
    }>
  >;
  range: {
    startDate: DateType;
    endDate: DateType;
  };
}

const CalenderModal: React.FC<CalenderModalProps> = ({
  isVisible,
  toggleModal,
  setRange,
  range,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={toggleModal}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.calenderView}>
            <DateTimePicker
              mode={'range'}
              startDate={range.startDate}
              endDate={range.endDate}
              displayFullDays
              onChange={params => {
                setRange(params);
              }}
              selectedTextStyle={styles.selectedText}
              selectedItemColor={'#E63757'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CalenderModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  subContainer: {
    alignItems: 'center',
  },
  calenderView: {
    width: 330,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 0},
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
