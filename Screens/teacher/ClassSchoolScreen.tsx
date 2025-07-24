

import { FlatList, Text, View } from "react-native"
import { strings } from "../../Localization"
import { style } from "../../Values/AppStyles"
import { useEffect } from "react"
import { routes } from "../../Values/Routes"
import { classschollList, enrolledList } from "../../store/LocalDataStore"
import { ClassAndSchoolItem, InrolledInflate } from "../../Components/GameItem"

export const ClassSchoolScreen = ({ navigation }) => {


    return <View style={[style.viewBox]}>

        <FlatList 
            data={classschollList}
            renderItem={({ item, index }) => (
                <ClassAndSchoolItem item={item} onClick={() => {
                    navigation.navigate(routes.homwwork_summary_sreen, { title: item.title })
                }} />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
        />

    </View>
}