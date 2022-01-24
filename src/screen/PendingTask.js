import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Animated,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import DatePicker from "react-native-datepicker";
import DropDownPicker from "react-native-dropdown-picker";
import TaskCreateModal from "../component/TaskCreateModal";

const PendingTask = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const [description, setDescription] = useState(null);
  const [task, setTask] = useState(null);
  const [taskdate, setTaskDate] = useState("");
  const [taskdurationStartdate, setTaskDurationStartDate] = useState("");
  const [taskdurationenddate, setTaskDurationEndDate] = useState("");
  const [assigned, setAssigned] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const items = [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "Low" },
  ];
  const [prio, setPrio] = useState(null);

  const [list, setList] = useState([]);
  const [Complete, setCompleted] = useState([]);

  const handle = () => {
    const obj = {
      task,
      description,
      taskdate,
      assigned,
      taskdurationStartdate,
      taskdurationenddate,
      prio,
      status: "pending",
    };
    setList((list) => [...list, obj]);
    setTask(null);
    setDescription(null);
    setTaskDate(null);
    setTaskDurationStartDate(null);
    setTaskDurationEndDate(null);
    setAssigned(null);
    setPrio(null);
    setOpen(false);
    setModalVisible(false);
    setValue([]);
  };

  const changeStatus = (index) => {
    if (index.status == "pending") {
      index.status = "completed";
    } else {
      index.status = "pending";
    }
    const value = list.findIndex((item) => item.task === index.task);
    // setCompleted((Complete) => [...Complete, list[value]]);
    list[value] = index;
    setList((list) => [...list]);
  };

  return (
    <View style={{ flex: 1 }}>
      {list.length > 0 ? (
        <TaskCreateModal item={list} changeStatus={changeStatus} />
      ) : null}
      <View style={[styles.floatingButtonStyle, { backgroundColor: "red" }]}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AnimatedIcon
            name="plus"
            type="MaterialCommunityIcons"
            style={{
              color: "white",
              fontSize: 32,
            }}
          />
        </TouchableOpacity>
      </View>
      {modalVisible ? (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <ScrollView style={{ backgroundColor: "#fff" }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.AddTask}>Add Task</Text>

                  <View style={styles.main}>
                    <Text style={{ fontSize: 15 }}>Task</Text>
                    <TextInput
                      maxLength={10}
                      style={styles.inputtask}
                      onChangeText={setTask}
                      value={task}
                      placeholder="Task Tilte"
                    />
                  </View>
                  <View style={styles.main}>
                    <Text style={{ fontSize: 15 }}>Task Description</Text>
                    <TextInput
                      style={styles.inputtask}
                      onChangeText={setDescription}
                      value={description}
                      placeholder="Task Description"
                      multiline={true}
                    />
                  </View>
                  <View style={styles.main}>
                    <Text style={{ fontSize: 15 }}>Task Date</Text>
                    <DatePicker
                      style={styles.datePickerStyle}
                      date={taskdate}
                      mode="date"
                      placeholder="select date"
                      format="DD-MMMM-YYYY"
                      minDate="01-01-2020"
                      maxDate="01-01-2050"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                          marginLeft: 0,
                        },
                        dateInput: {
                          marginLeft: 36,
                        },
                      }}
                      onDateChange={(date) => {
                        setTaskDate(date);
                      }}
                    />
                  </View>
                  <View style={styles.main}>
                    <Text style={{ fontSize: 15 }}>Task Assigned To</Text>
                    <TextInput
                      style={styles.inputtask}
                      onChangeText={setAssigned}
                      value={assigned}
                      placeholder="Assigned To"
                      multiline={true}
                    />
                  </View>
                  <View style={styles.main}>
                    <Text style={{ fontSize: 15 }}>Task Priority</Text>
                    <DropDownPicker
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      onChangeValue={setPrio}
                    />
                  </View>
                  <View style={styles.main}>
                    <Text style={{ fontSize: 15 }}>Task Duration</Text>
                    <View style={styles.main1}>
                      <DatePicker
                        style={styles.datePickerStyle1}
                        date={taskdurationStartdate}
                        mode="date"
                        placeholder="select date"
                        format="DD-MMMM-YYYY"
                        minDate="01-01-2020"
                        maxDate="01-01-2050"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: "absolute",
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                          },
                          dateInput: {
                            marginLeft: 36,
                          },
                        }}
                        onDateChange={(date) => {
                          setTaskDurationStartDate(date);
                        }}
                      />
                      <Text
                        style={{
                          marginHorizontal: 1,
                          textAlign: "center",
                          alignSelf: "center",
                        }}
                      >
                        --
                      </Text>
                      <DatePicker
                        style={styles.datePickerStyle1}
                        date={taskdurationenddate}
                        mode="date"
                        placeholder="select date"
                        format="DD-MMMM-YYYY"
                        minDate="01-01-2020"
                        maxDate="01-01-2050"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: "absolute",
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                          },
                          dateInput: {
                            marginLeft: 36,
                          },
                        }}
                        onDateChange={(date) => {
                          setTaskDurationEndDate(date);
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.main}>
                    <Button onPress={() => handle()} title="Click" />
                  </View>
                </View>
              </View>
            </ScrollView>
          </Modal>
        </View>
      ) : null}
    </View>
  );
};

export default PendingTask;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  floatingButtonStyle: {
    height: 48,
    width: 48,
    zIndex: 99999,
    position: "absolute",
    bottom: 20,
    right: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 4,

    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  AddTask: {
    fontSize: 20,
    color: "#B0B0B0",
    width: "100%",
    textAlign: "center",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    marginTop: 20,
    borderRadius: 10,
  },
  inputtask: {
    borderWidth: 1,
    borderColor: "#000",
    height: 50,
    padding: 10,
    borderRadius: 10,
  },
  main: {
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    height: 70,
  },
  main1: {
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    height: 40,
    flexDirection: "row",
  },
  datePickerStyle1: {
    width: "48%",
    justifyContent: "space-between",
  },
  datePickerStyle: {
    width: "50%",
    justifyContent: "space-between",
  },
});
