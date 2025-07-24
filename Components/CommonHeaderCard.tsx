import { Text, View } from "react-native"
import { colors } from "../Values/AppColores"
import { summaryList, workUploadList } from "../store/LocalDataStore"
import { ClassSummmaryTopItem } from "./GameItem"
import { colorScheme, style } from "../Values/AppStyles"
import { Card } from "react-native-paper"

export const CommonHeaderCard = ({ isVisible = true, isStudentVisible = true, data = summaryList }) => {

    console.log("Helooooooooo");
    return <Card style={[{
        borderRadius: 10, marginHorizontal: 16, marginTop: 10,
        backgroundColor: colorScheme() === 'dark' ? colors.light_grey : colors.white
    }]}><View style={[{ borderRadius: 10, marginHorizontal: 16, marginTop: 10 }]}>

            <View style={{ width: '100%', justifyContent: "space-between", alignContent: "space-between", flexDirection: 'row', padding: 16 }}>
                <Text style={[style.textStyle, { color: 'black' }]}>{isVisible && isStudentVisible ? "W3-Essay" : ""} </Text>
                <Text style={[style.textStyle, { color: 'black' }]}> {isVisible ? "Subject" : ""}</Text>
                <Text style={[style.textStyle, { fontWeight: "bold", color: 'black' }]}>3A</Text>
            </View>
            
            <View style={{ marginHorizontal: 8, paddingVertical: 16, justifyContent: "center", flexDirection: "row" }}>
                <ClassSummmaryTopItem item={data[0]} bgColor={colors.lightBlue} totalItem={4.5} onClick={() => { }} />
                <ClassSummmaryTopItem item={data[1]} bgColor={colors.dirtyWhite} totalItem={4.5} onClick={() => { }} />
                <ClassSummmaryTopItem item={data[3]} bgColor={colors.mint} totalItem={4.5} onClick={() => { }} />
                <ClassSummmaryTopItem item={data[2]} bgColor={colors.lightRed} totalItem={4.5} onClick={() => { }} />
            </View>
        </View></Card>
}



export const StudendCommonHeaderCard = ({ isVisible = true, totalItem = 3,
    isStudentVisible = true, data = workUploadList, title = "", subject = "Subject", className = '' }) => {
        
        console.log("StudendCommonHeaderCard",className);
    return <Card style={[{
        borderRadius: 10, marginHorizontal: 6, marginTop: 10,
        backgroundColor: colorScheme() === 'dark' ? colors.light_grey : colors.white
    }]}><View style={[{ borderRadius: 10, marginHorizontal: 8, marginTop: 10 }]}>

            <View style={{ width: '100%', justifyContent: "space-between", alignContent: "space-between", flexDirection: 'row', overflow: "hidden", gap: 8, paddingBottom: 12}}>
                {/* <Text style={[style.textStyle, { color: 'black',  }]}>{isVisible && isStudentVisible ? "W3-Essay" : className} </Text> */}
                <Text style={[style.textStyle, { color: 'black' }]}> {isVisible ? subject : ""}</Text>
                <Text style={[style.textStyle, { fontWeight: "bold", color: 'black' }]}>{title}</Text>
            </View>

            <View style={{paddingBottom: 20, justifyContent: "space-between", flexDirection: "row" }}>
                {data.map((item) => <ClassSummmaryTopItem item={item} totalItem={totalItem} bgColor={item.bgColor} onClick={() => { }} />)}
            </View>
        </View></Card>
}