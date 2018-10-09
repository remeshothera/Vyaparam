import React, { Component } from 'react'
import { StyleSheet, View , Text,FlatList,Image,ScrollView,StatusBar,TouchableOpacity,Dimensions } from 'react-native'
import PropTypes from 'prop-types';
import { ReactiveBase ,DataSearch ,ReactiveList } from '@appbaseio/reactivesearch-native';
import { Font } from 'expo';

const { width: deviceWidth } = Dimensions.get('window');

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  static propTypes = {
    logout: PropTypes.func
  }

  onAllData = items => (
		<FlatList
			style={styles.listContainer}
			data={items || []}
			keyExtractor={ (item, index) => index.toString() }
			renderItem={
				({ item }) => this.itemCardMarkup(item)
			}
		/>
	)

  itemCardMarkup = bookData => (
		<TouchableOpacity
			onPress=
      {() => {
        /* 1. Navigate to the Details route with params */
        this.props.navigation.navigate('Details', {
          bookTitle: bookData.title,
        });
      }}
		>
			<View style={[styles.fullWidth, styles.booksRow]}>
				<View style={styles.booksRowContainer}>
					<Image
						source={{
							uri: bookData.image_medium,
						}}
						style={styles.booksImage}
					/>
				</View>
				<View style={styles.bookInfoSection}>
					<Text style={styles.bookTitle}>
						{bookData.title}
					</Text>
					<Text style={styles.bookAuthorSection}>
						<Text style={styles.bookAuthor}>
							{bookData.authors}
						</Text>
					</Text>
					<Text style={styles.bookPublication}>
						Pub {bookData.original_publication_year}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)

  render () {
    const { navigate } = this.props.navigation; 

    return (
      <React.Fragment>
        <ReactiveBase
        app="good-books-ds"
        credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d">
        <ScrollView>
          <View style={styles.container}>
            <DataSearch
              componentId="searchbox"
              dataField={[
                'original_title',
                'original_title.search',
                'authors',
                'authors.search',
              ]}
              placeholder="Search for items"
              autosuggest={false}
            />
            <ReactiveList
              componentId="results"
              dataField="original_title"
              size={7}
              showResultStats={false}
              pagination={true}
              react={{
                and: 'searchbox',
              }}
              onAllData={this.onAllData}
            />
          </View>
        </ScrollView>
      </ReactiveBase>
    </React.Fragment>
    )
  }
}

const styles =StyleSheet.create({
	topBarSpacer: {
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#1A237E',
	},
	fullWidth: {
		width: deviceWidth,
	},
	controls: {
    padding:20,
		paddingTop: 0,
		backgroundColor: '#3cb371',
		alignItems: 'stretch',
	},
	results: {
    padding:20,
	},
	componentContainer: {
		backgroundColor: '#ECEFF1',
		marginHorizontal: 8,
		marginVertical: 8,
	},
	headerSeperator: {
		backgroundColor:'#1A237E',
		padding: 8,
	},
	listContainer: {
		width: '100%',
		marginTop: -25,
	},
	booksRow: {
		flex: 1,
		flexDirection: 'row',
		paddingVertical: 15,
		borderBottomColor: '#E6E6E6',
		borderBottomWidth: 0.5,
	},
	booksRowContainer: {
		flex: 1,
		flexGrow: 1,
		paddingLeft: 15,
	},
	booksImage: {
		height: null,
		width: null,
		flex: 1,
	},
	bookInfoSection: {
		flex: 1,
		flexGrow: 2,
		flexWrap: 'wrap',
		padding: 15,
	},
	bookTitle: {
		fontWeight: '800',
		fontSize: 18,
	},
	bookAuthorSection: {
		paddingTop: 2,
	},
	bookAuthor: {
		color: 'grey',
	},
	bookPublication: {
		paddingTop: 7,
	},
	bookStars: {
		flex: 1,
		flexDirection: 'row',
		paddingTop: 5,
	},
	bookRatings: {
		marginTop: -2,
		paddingLeft: 5,
	},
});
