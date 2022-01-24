import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

const TaskCreateModal = ({ item, changeStatus }) => {
  const [selectedPrinter, setSelectedPrinter] = useState();
  const handle = (index) => {
    changeStatus(index);
  };

  const fun = (obj) => {
    let constactList = [];
    let array = [];
    array.push(obj);
    array.map((e) => {
      let html = `
      <p>Task :- ${e.task}</p></br>
      <p>Description :- ${e.description}</p></br>
      <p>TaskDate :- ${e.taskdate}</p></br>
      <p>Assigned :- ${e.assigned}</p></br>
      <p>TaskDurationStartDate :- ${e.taskdurationStartdate}   -  TaskDurationEndDate :- ${e.taskdurationenddate}</p></br>
      <p>Priority :- ${e.prio}</p></br>
      `;
      constactList.push(html);
    });
    return constactList;
  };

  const genratedHTML = (item) => {
    return `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body style="text-align: center;">
      <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
        pdf created!
      </h1>
      ${item.join("")}
    </body>
  </html>
  `;
  };

  // const print = async () => {
  //   await Print.printAsync({
  //     html,
  //     printerUrl: selectedPrinter?.url,
  //   });
  // };

  const printToFile = async (index) => {
    const { uri } = await Print.printToFileAsync({
      html: genratedHTML(fun(item[index])),
    });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  // const selectPrinter = async () => {
  //   const printer = await Print.selectPrinterAsync();
  //   setSelectedPrinter(printer);
  // };

  return (
    <ScrollView>
      <View>
        {item.map((ele, index) => (
          <View
            key={index}
            style={{
              backgroundColor: ele.status == "pending" ? "#ccc" : "pink",
              padding: 15,
              margin: 10,
              marginTop: 20,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", flex: 1 }}>
              {ele.task ? <Text>Task Name :- {ele.task}</Text> : null}
              <View
                style={{
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  flex: 1,
                  left: 25,
                }}
              >
                <TouchableOpacity onPress={() => printToFile(index)}>
                  <Icon name="download" size={20} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignSelf: "flex-end",
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() => handle(ele)}
                  style={{ alignSelf: "flex-end" }}
                >
                  {ele.status == "pending" ? (
                    <Text style={{ color: "blue" }}>Pending</Text>
                  ) : (
                    <Text style={{ color: "blue" }}>Completed</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {ele.description ? (
              <Text style={{ marginTop: 10 }} numberOfLines={2}>
                Task Description: - {ele.description}
              </Text>
            ) : null}
            {ele.taskdate ? (
              <Text style={{ marginTop: 10 }}>Task Date :- {ele.taskdate}</Text>
            ) : null}
            {ele.assigned ? (
              <Text style={{ marginTop: 10 }} numberOfLines={1}>
                Task Assigned :- {ele.assigned}
              </Text>
            ) : null}
            {ele.prio.length > 0 ? (
              <Text style={{ marginTop: 10 }}>Task Priority :- {ele.prio}</Text>
            ) : null}

            {ele.taskdurationStartdate && ele.taskdurationenddate ? (
              <Text style={{ marginTop: 10 }}>
                Task Duration :- {ele.taskdurationStartdate} -{" "}
                {ele.taskdurationenddate}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TaskCreateModal;
