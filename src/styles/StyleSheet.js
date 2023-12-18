import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 5,
        borderColor: '#176B87',
        backgroundColor: '#fff',
      },
      buttonCategoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#00A9FF',
        height: 112,
      },
      buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 5,
        borderColor: '#00A9FF',
        height: 112,
      },
      textStyle: {
        marginLeft: 30,
        fontSize: 20,
      },
      titleStyle: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 20,
        color: '#33A1FF',
        fontWeight: '600',
      },
      contentHomeTextStyle: {
        marginLeft: 20,
        marginRight: 15,
        fontSize: 12,
        color: '#006399',
        fontWeight: '600'
      },
      contentHomeContainer: {
        height: 75,
      },
      contentStyle: {
        marginTop: 15,
        marginLeft: 30,
        fontSize: 10,
        color: '#3085C3',
        fontWeight: '600',
        alignSelf: 'flex-end',
      },
      headerButtonContainer: {
        height: 40, 
        width: 100, 
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      categoryScreenPostCountStyle: {
        marginRight: 40,
        fontSize: 15,
        color: '#006399',
        fontWeight: '600'
      },
      postScreenContentStyle: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        alignSelf: 'flex-start',
        fontSize: 16,
        color: '#176B87',
        fontWeight: '600',
        textAlign: 'justify'
      }
  });