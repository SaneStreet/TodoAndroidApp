import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
	FlatList,
	StyleSheet,
	Text,
	View,
	Alert,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import Header from "./components/Header";
import TodoItem from "./components/todoItem";
import AddTodo from "./components/addTodo";
import Sandbox from "./components/sandbox";

export default function App() {
	const [todos, setTodos] = useState([
		{ text: "Delivery from Zooplus", key: 1 },
		{ text: "Create Review App", key: 2 },
		{ text: "Play Hades on Xbox", key: 3 },
	]);

	const pressHandler = (key) => {
		setTodos((prevTodos) => {
			return prevTodos.filter((todo) => todo.key != key);
		});
	};

	const submitHandler = (text) => {
		if (text.length > 3) {
			setTodos((prevTodos) => {
				return [
					{ text: text, key: Math.random().toString() },
					...prevTodos,
				];
			});
		} else {
			Alert.alert("Oops!", "Items must be over 3 character(s) long.", [
				{
					text: "Understood",
					onPress: () => console.log("Alert closed"),
				},
			]);
		}
	};

	return (
    // <Sandbox />
		<TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('Keyboard dismissed.');
    }}>
			<View style={styles.container}>
				{/* header */}
				<Header />
				<View style={styles.content}>
					{/* to form */}
					<AddTodo submitHandler={submitHandler} />
					<View style={styles.list}>
						<FlatList
							data={todos}
							renderItem={({ item }) => (
								<TodoItem
									item={item}
									pressHandler={pressHandler}
								/>
							)}
						/>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "skyblue",
	},
	content: {
		padding: 40,
    // backgroundColor: 'pink',
    flex: 1,
	},
	list: {
		marginTop: 20,
    // backgroundColor: 'yellow',
    flex: 1,
	},
});
