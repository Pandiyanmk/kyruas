/* ********************************************************************************************************************************
      NAME		: CoinWordGame
      DESC		:"I have added a new component named 'coinword' to the code.".
      AUTHOR		: Pravin	
      CREATE DATE	: 08/12/2023	
        MODIFIED BY : 
******************************************************************************************************************************** */
import { View, Button, Image, TextInput, TouchableOpacity, ScrollView, Text, FlatList, Appearance, StyleSheet, Dimensions, Alert, Modal } from "react-native"
import { strings } from "../Localization"
import { colorScheme, style as getStyles } from "../Values/AppStyles"
import { colors } from "../Values/AppColores"
import React, { useState, useEffect } from 'react';
import { fontFamily, cheersIcon } from "../store/LocalDataStore";
import { GameprogressView } from "./Modales";
import coinwordmaster from "../Testsjson/coinwordmaster.json"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CourseSummaryScreen } from "../Screens/course/CourseSummaryScreen";
import { userInformation } from "../store/UserStorage";
import { onShare, useDarkMode, useKeyboard } from "../utils/Extentions";
import { CommonButton } from "../Global/Buttons";
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
export const CoinWordGame = ({ interest_name, navigation }) => {
  let style;
  style = getStyles()
  const theme = useSelector(state => state.appState.theme)

  useEffect(() => {
    colorScheme(theme)
    style = getStyles()
  }, [theme])
  const isKeyboardOpen = useKeyboard();
  var [previousValues, setPreviousValues] = useState([]);
  // Declare a state variable of input-type and its initial value is empty
  const [inputValue, setInputValue] = useState('');
  // Declare a state variable of previousValues and its initial value is empty set
  var [previousValues, setPreviousValues] = useState([]);
  const [gameFinish, setfinish] = useState(false);
  // Declare a state variable of finish button  and its initial value is false
  const [newgame, setnew] = useState(false);
  // Declare a state variable of score card  and its initial value is false
  const [scorecard, setscorecode] = useState(false);
  //const [currentQuestionIndex, setCurrentQuestionIndex] = useState(currentGame);
  // const [userattempts, setUserAttempts] = useState(1);

  // declare a progress value and its initial variable is 0
  // const [gameCount, setGameCount] = useState(1);
  // const [totalGames, setTotalGames] = useState(6); // Total games for each level
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentInterest, setCurrentInterest] = useState(0);
  // const [shuffledLetters, setShuffledLetters] = useState([]);
  // const [innerCircle, setInnerCircle] = useState();
  const [userScore, setUserScore] = useState(0);
  const circleRadius = 137; // Adjust this value based on your requirement
  const textFontSize = 21; 
  const innertextFontSize = 27;


  const [meaningfulWordModalVisible, setMeaningfulWordModalVisible] = useState(false);
  const [meaningfulWord, setMeaningfulWord] = useState('');
  const [shoot, setShoot] = useState(false);
  const [confettiOrigin, setConfettiOrigin] = useState({ x: 0, y: 0 });
  // const [coinwordmaster, setcoinwordmaster] = useState([]);
  //  const [game_ans, setgameans] = useState('');
   const [tamilextraword, setextraword] = useState([]);
   const [getquestion_id, setquestion_id] = useState([]);
   const [gameLevel, setlevel] = useState('');
   const [coinwordmaster, setCoinwordmaster] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subarray, setSubarray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [innerCircle, setInnerCircle] = useState('');
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [gameAns, setGameAns] = useState('');
  const [interest, setInterest] = useState('');
  const [gamediffculity, setdiffculity] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [level, setLevel] = useState('');
  const [userAttempts, setUserAttempts] = useState(0);
  // const [maxAttempts, setMaxAttempts] = useState(3); 
  useEffect(() => {
    fetchCoinWordMaster();
  }, []);

  const fetchCoinWordMaster = async () => {
    const apiUrl = 'https://mobapp.banyanpro.com/api/gameview/GetCoinwordMaster/';
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const coinwordmaster = response.data.CoinWordMaster;
      setCoinwordmaster(coinwordmaster);
      setSubarray(createSubarray(interest_name, coinwordmaster));
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch data from the API', error);
      setIsLoading(false);
    }
  };

  const handleDonePress = () => {
    setUserScore(0);
    navigation.goBack();
  };

  // const calculateProgress = () => {
  //   return gameCount / totalGames;
  // };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const getQuestions = (level, difficulty, interests, coinwordmaster) => {
    return coinwordmaster.filter(
      (question) =>
        question.level === level &&
        question.difficulty === difficulty &&
        question.interest_name === interests
    );
  };

  const createSubarray = (interest, coinwordmaster) => {
    const subarray = [];
    const uniqueLevels = [...new Set(coinwordmaster.map((question) => question.level))];
    uniqueLevels.forEach((level) => {
      const difficulties = ['simple', 'medium', 'complex'];
      difficulties.forEach((difficulty) => {
        subarray.push(...getQuestions(level, difficulty, interest, coinwordmaster).slice(0, 2));
      });
    });
    return subarray;
  };

  const loadNextQuestion = () => {
    if (currentIndex < subarray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert('You have completed the game!', '', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    }
  };
   console.log("datas1",subarray)

  const updateCurrentQuestion = () => {
    const currentQuestion = subarray[currentIndex];
    if (currentQuestion) {
      const { game_outerletter, game_centerletter, answer, interest_name, question_id, level,difficulty } = currentQuestion;
      setInnerCircle(game_centerletter);
      setShuffledLetters(game_outerletter.split(',').map(item => item.trim()));
      setGameAns(answer);
      setInterest(interest_name);
      setdiffculity(difficulty);
      setQuestionId(question_id);
      setLevel(level);
      console.log("answer")
    } else {
      console.log('currentQuestion is undefined');
    }
  };
  console.log("gameanswer",gameAns)
  useEffect(() => {
    updateCurrentQuestion();
  }, [currentIndex, subarray]);

  useEffect(() => {
    if (coinwordmaster.length > 0) {
      setSubarray(createSubarray(interest_name, coinwordmaster));
    }
  }, [coinwordmaster]);
  

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    saveGameLevel(level);
  }, [level]);

    // UseEffect to load the previous game state when the component mounts
  useEffect(() => {
    loadGameState();
  }, []);

// Function to load game state from AsyncStorage
  const loadGameState = async () => {
    try {
      const storedGameState = await AsyncStorage.getItem('gameState');
      if (storedGameState) {
        const parsedState = JSON.parse(storedGameState);
        console.log('Data from AsyncStorage:', storedGameState);
        setCurrentIndex(parsedState.currentIndex);
        setPreviousValues(parsedState.previousValues);
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
  };

  // Function to save game state to AsyncStorage
  const saveGameState = async () => {
    try {
      const gameState = JSON.stringify({ currentIndex, previousValues });
      await AsyncStorage.setItem('gameState', gameState);
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  };

  const clearPreviousAnswers = async () => {
    try {
      await AsyncStorage.removeItem('gameState');
      setPreviousValues([]);
    } catch (error) {
      console.error('Error clearing previous answers:', error);
    }
  };

  // UseEffect to save the current game state whenever it changes
  useEffect(() => {
    saveGameState();
  }, [currentIndex, previousValues]);


  const saveGameLevel = async (level) => {
    try {
      await AsyncStorage.setItem('gameLevel', level.toString());
      console.log('Game level saved successfully');
    } catch (error) {
      console.error('Error saving game level:', error);
    }
  };

  const getLevelData = (clevel, cdifficulty, cinterest, coinwordmaster) => {
    return coinwordmaster.filter(
      (question) => 
        question.level === clevel && 
        question.difficulty === cdifficulty && 
        question.interest_name === cinterest
    );
  };
  const maxAttempts = 5;
  let attempts = 0
  // let userAttempts = 1;
  let questionattempts = 0;
  let noattempts = 2;
  const handleButton = () => {
    const currentQuestion = subarray[currentIndex];
    if (!currentQuestion) {
      console.error('Current question is undefined');
      return;
    }
  
    const { level, difficulty, interest_name } = currentQuestion;
    const nextIndexDifficulty = subarray[currentIndex + 1]?.difficulty;
          // Check if the button at index 0 is clicked
          const isIndexZero = currentIndex === 0;


          if (isIndexZero) {
       
             attempts++;
       
           }
  
    const result = getLevelData(level, difficulty, interest_name, coinwordmaster);
    const findIndexOfCurrent = result.findIndex(
      (question) =>
        question.level === currentQuestion.level &&
        question.difficulty === currentQuestion.difficulty &&
        question.game_centerletter === currentQuestion.game_centerletter &&
        question.game_outerletter === currentQuestion.game_outerletter &&
        question.answer === currentQuestion.answer &&
        question.interest_name === currentQuestion.interest_name
    );
 
  
    if (findIndexOfCurrent !== -1) {
      if (findIndexOfCurrent === result.length - 1) {
        Alert.alert('Info', 'SORRY NO MORE GAME ON THIS DIFFICULTY AND LEVEL');
      } else {
        const updatedSubarray = [...subarray];
        updatedSubarray[currentIndex] = result[findIndexOfCurrent + 1];
        if (difficulty === nextIndexDifficulty) {
          if (findIndexOfCurrent + 2 <= result.length - 1) {
            updatedSubarray[currentIndex + 1] = result[findIndexOfCurrent + 2];
          } else {
            updatedSubarray.splice(currentIndex + 1, 1);
          }
        }
        setSubarray(updatedSubarray);
      }
    }
    
    questionattempts++
    if (isIndexZero && attempts > maxAttempts) {
          Alert.alert('Info', 'NO MORE GAMES');
        }
  
    setUserAttempts((prevAttempts) => prevAttempts + 1);
   
  
    if (userAttempts == noattempts) {
      const difficulties = ['simple', 'medium', 'complex'];
      const indexOfMedium = difficulties.findIndex((difficulty) => difficulty === difficulty);
      const indexMinusOne = indexOfMedium - 1;
  
      if (indexMinusOne >= 0) {
        const elementAtIndexMinusOne = difficulties[indexMinusOne];
        const answeredArray = subarray.filter(
          (item) =>
            item.difficulty === elementAtIndexMinusOne &&
            item.level === level &&
            item.interest_name === interest_name
        );
  
        const unanswered = coinwordmaster.filter(
          (item) =>
            !answeredArray.includes(item) &&
            item.difficulty === elementAtIndexMinusOne &&
            item.level === level &&
            item.interest_name === interest_name
        );
  
        const randomIndex = Math.floor(Math.random() * unanswered.length);
        const newSubarrayItem = unanswered[randomIndex];
  
        const indexOfElement = subarray.findIndex(
          (item) =>
            item.difficulty === elementAtIndexMinusOne &&
            item.level === level &&
            item.interest_name === interest_name
        );
  
        const nextIndex = indexOfElement !== -1 ? indexOfElement + 1 : -1;
  
        if (nextIndex !== -1) {
          const updatedSubarray = [...subarray];
          updatedSubarray[nextIndex] = newSubarrayItem;
          setSubarray(updatedSubarray);
        }
        setCurrentIndex(currentIndex - 1);
      }
    }
                  setPreviousValues([]);
                  setInputValue('');
                  setUserScore(0);
                  setdbcount(0);
                  setEnteredAnswers([])
                  setnew(false)
                  clearPreviousAnswers(); 
  };
  
 

  const checkMeaningfulWord = async (word) => {

    try {
      // const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
       const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);

      if (response.ok) {
        const responseBody = await response.json();

        if (Array.isArray(responseBody) && responseBody.length > 0) {
          setMeaningfulWord(word);
          setMeaningfulWordModalVisible(true);
          setShoot(true);
          // Automatically close the modal after 2 seconds
          setTimeout(() => {
            setMeaningfulWordModalVisible(false);
            // setShoot(false); // Stop shooting confetti
          }, 3000);
          //  setPreviousValues(word);
        } else {
          console.log('Not a Meaningful Word:', word);
        }
      } else if (response.status === 404) {
        console.log('Word not found in the dictionary:', word);
      } else {
        console.error('Error checking word meaning. Status:', response.status);
      }
    } catch (error) {
      console.error('Error checking word meaning:', error);
    }
  };


  const inputString =gameAns;
  var array = inputString.split(",");
  console.log(array)
  console.log(array.length)

  let scoreIncrement = 0;

  // Regular expressions for Tamil and English words
  const tamilRegex = /^[\u0B80-\u0BFF\s]+$/;
  const englishRegex = /^[A-Za-z\s]+$/;

  // Function to check if the input contains Tamil or English words
  function containsTamilOrEnglishWords(input) {
    return tamilRegex.test(input) || englishRegex.test(input);
  }

  const isTamil = (text) => {
    const tamilRegex = /^[\u0B80-\u0BFF\u0BC0-\u0BFF\s]+$/;
    return tamilRegex.test(text);
  };


  var outerCircleString = shuffledLetters.join('');
  console.log("outer", outerCircleString)
  const [enteredAnswers, setEnteredAnswers] = useState([]);


  const splitTamilString = (inputString) => {
    const charactersArray = [];
    let currentChar = '';

    for (let i = 0; i < inputString.length; i++) {
      const char = inputString.charAt(i);
      const nextChar = inputString.charAt(i + 1);

      currentChar += char;

      // If the current character and the next character form a combined Tamil letter,
      // move to the next character without pushing the current character into the array.
      if (/[\u0B82-\u0BFA]/.test(char) && /[\u0BBE-\u0BCD]/.test(nextChar)) {
        continue;
      }

      charactersArray.push(currentChar);
      currentChar = '';
    }

    return charactersArray;
  }; 

  // 15/03/2024-Pravin
  // Previously, the handleButton functions struggled to validate both outer and inner 
  // letters effectively. However, with adjustments made to the validation pathway, 
  // it now accurately validates words containing both outer and inner letters, with additional encoding validations for Tamil letters.

  const [dbcount,setdbcount]=useState(0)

  const handleButtonPress = () => {
    if (!inputValue) {
      Alert.alert('Info', 'You have not entered any words, please enter a word!');
      return;
    }

    let sanitizedInput = inputValue.trim().toUpperCase();

    // Split the sanitizedInput into an array of words and split each word into individual Tamil characters
    const wordsArray = sanitizedInput.split(/\s+/).map(word => splitTamilString(word)).flat();
    console.log(wordsArray);

    let isCenterLetterPresent = false;
    
    // Iterate through each word in the list
    for (const word of wordsArray) {
      console.log("Checking word:", word);
      // Check if any character of the innerCircle is present in the word
      if (innerCircle.split('').some(char => word.includes(char))) {
        isCenterLetterPresent = true;
        // Break out of loop if center letter is found in any word
        break;
      }
    }

    console.log("Center Letter Present:", isCenterLetterPresent);
    // Extract the center letter from user input
    let innerLetters = '';
    let remainingLetters = '';
    for (let i = 0; i < sanitizedInput.length; i++) {
      if (innerCircle.includes(sanitizedInput[i])) {
        innerLetters += sanitizedInput[i];
      } else {
        if (i !== sanitizedInput.length - 1) {
          remainingLetters += sanitizedInput[i];
        }
      }
    }

    // Check if all characters in outerCircleString are present in remainingLetters
    let allPresent = false;
    for (let i = 0; i < outerCircleString.length; i++) {
      if (!remainingLetters.includes(outerCircleString[i])) {
        allPresent = true;
        break;
      }
    }
    // Duplicate validation
    if (enteredAnswers.includes(sanitizedInput.trim())) {
      Alert.alert('Duplicate Answer', 'This word has been entered already; please choose a different one.');
      setInputValue('');
      return; // Stop execution if it's a duplicate
    } else {
      setEnteredAnswers(prevEnteredAnswers => [...prevEnteredAnswers, sanitizedInput.trim()]);
    }

    if (allPresent && isCenterLetterPresent) {

      const isCorrect = array.map(answer => answer.trim()).includes(sanitizedInput.trim());
      console.log('Is Correct:', isCorrect);

      if (isCorrect) {
       setdbcount(setdb=>setdb+1)
        let scoreIncrement;
        switch (gamediffculity) {
          case 'simple':
            scoreIncrement = 2;
            break;
          case 'medium':
            scoreIncrement = 4;
            break;
          case 'complex':
            scoreIncrement = 5;
            break;
          default:
            break;
        }

        setUserScore(prevScore => prevScore + scoreIncrement);
        //console.log(userScore)
        handleCorrectAnswer();
      }
      else if (inputValue) {
if(interest=="Tamil"){
  setextraword(inputValue)
}
else{
  checkMeaningfulWord(inputValue);
  let extrascoreIncrement;
        switch (gamediffculity) {
          case 'simple':
            extrascoreIncrement = 5;
            break;
          case 'medium':
            extrascoreIncrement = 10;
            break;
          case 'complex':
            extrascoreIncrement= 15;
            break;
          default:
            break;
        }
        setUserScore(prevScore => prevScore + extrascoreIncrement);
}
        setInputValue('');
        handleCorrectAnswer();
      }
      else {
        Alert.alert('Incorrect Answer', 'Please try another word.');
        setInputValue('');
      }
    } else {
      Alert.alert('Invalid Input', 'Only words using letters from the Inner and Outer Circles are permitted.');
      setInputValue('');
    }
  };
//   var progressValue = calculateProgress();
// console.log("counts",dbcount)
//   useEffect(() => {
//     if (gameCount === totalGames) {
//       // If completed all games for the current level
//       setCurrentLevel(currentLevel + 1); // Update to next level
//       setGameCount(1); // Reset game count for next level
//     }
//   }, [gameCount, totalGames, currentLevel]);

// let gamename="Coinword"
// console.log("extra",tamilextraword)

// useEffect(() => {
//   if (userInformation && userInformation.UserId) {
//     axios
//       .post('http://mobapp.banyanpro.com/api/gameview/PostProgressbar',{
//         user_id: userInformation.UserId,
//         game_name: gamename,
//         levels: level,
//         score: progressValue,
//         interest: interest
//       })
//       .then((response) => {
//         console.log('POST Request Response:', response.data);
//       })
//       .catch((error) => {
//         console.error('POST Request Error:', error.message);
//       })
//   }
// }, []);
var correctAnswersCount = array.length-dbcount;
console.log("counts",correctAnswersCount )

  const firstGameId = 1;
  const ans = "cute"
  const handleCorrectAnswer = () => {
    const updatedValues = [...previousValues, inputValue];
    setPreviousValues(updatedValues);
    console.log(userScore)
    setInputValue('');
    if (dbcount === array.length-1) {
      // Make a POST request
      axios
        .post('https://mobapp.banyanpro.com/api/gameview/PostTransactionCoinwordMaster', {
          //.post('http://192.168.1.4:98/api/gameview/PostTransactionCoinwordMaster',{
          user_id: userInformation.UserId,
          game_id: firstGameId,
          levels: level,
          question_id: questionId,
          score: userScore,
          useranswer: updatedValues,

        })
        .then((response) => {
          // Handle the response as needed
          console.log('POST Request Response:', response.data);

          // Show an alert or perform any other actions
          Alert.alert(
            'Congratulations!',
            'You have completed the Game successfully!',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  // Assuming `loadNextQuestion` is a function that loads the next question
                  loadNextQuestion();
                  // setGameCount(gameCount + 1); // Increment game count
                  // setCurrentInterest(progressValue);
                  setPreviousValues([]);
                  setInputValue('');
                  setUserScore(0);
                  setdbcount(0);
                  setEnteredAnswers([])
                  clearPreviousAnswers();
                },

              },
            ]
          );
  if(interest==="Tamil")
    {
      axios
      .post('http://mobapp.banyanpro.com/api/gameview/PostExtractWordCoinwordMaster',{
        question_id:getquestion_id,
        useranswer:tamilextraword.split(","),
        interest_name :interest 
      })
      .then((response) => {
        console.log('POST Request Response:', response.data);
      })
      .catch((error) => {
        console.error('POST Request Error:', error.message);
      })
    }
    else{
      console.log("not a pass the values")
    }
        })
        .catch((error) => {
          console.error('POST Request Error:', error.message);
          // Handle error as needed
        });
    }
  };

  useEffect(() => {
    console.log('User Score Updated:', userScore);
  }, [userScore]);

  const outerLetterCount = shuffledLetters.length;
  const step = 360 / outerLetterCount;

  const calculatePosition = (index, isInner) => {
    const circle = isInner ? circleRadius / 2 : circleRadius;
    const angle = index * step;
    const radians = angle * (Math.PI / 180);
    const x = circle * Math.cos(radians);
    const y = circle * Math.sin(radians);

    return { x, y };
  };

  const calculateTextPosition = (index, isInner) => {
    const circle = isInner ? circleRadius / 2 : circleRadius;
    const angle = (index + 0.5) * step; // Shifted by 0.5 to position text between partition lines
    const radians = angle * (Math.PI / 180);
    const xOffset = Math.cos(radians) * (circle - textFontSize / 0.6); // Shifting text towards the center
    const yOffset = Math.sin(radians) * (circle - textFontSize / 0.6); // Shifting text towards the center

    return { x: xOffset, y: yOffset };
  };

  const handleReset = () => {
    const shuffled = [...shuffledLetters];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledLetters(shuffled);
  };

  // useEffect(() => {
  //   // setShuffledLetters(initialOuterCircle)
  //   center();
  //   setnew(false)
  // }, [currentQuestion])


  const renderValues = () => {
    return (
      <View style={styles.Scrollcontainer}>
        <ScrollView
          style={styles.ScrollViews}
          contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
          showsHorizontalScrollIndicator={false}>
          {previousValues.map((values, index) => (
            <View key={index} style={styles.ipvalue}>
              <Text style={styles.valuetext}>{values}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  return <View>
    <View style={{ width: '100%', height: 310, overflow: 'hidden', borderWidth: 1 }}>
      {isLoading ? (<GameprogressView />) : (
        <>
          <View style={styles.container}>
          <Svg width={circleRadius * 4} height={circleRadius * 4}>
              {/* Outer Circle */}
              <Circle cx={circleRadius} cy={circleRadius} r={circleRadius} fill="transparent" stroke="black" strokeWidth={2} />

              {/* Inner Circle with Red Background */}
              <Circle cx={circleRadius} cy={circleRadius} r={circleRadius / 2.01} fill="orange" stroke="black" strokeWidth={2} />

              {/* Lines, Letters, and Inner Circle Value */}
              {shuffledLetters.map((letter, index) => {
                const outerPosition = calculatePosition(index, false);
                const innerPosition = calculatePosition(index, true);
                const textPosition = calculateTextPosition(index, false);

                return (
                  <React.Fragment key={index}>
                    {/* Line connecting outer and inner circles */}
                    <Line
                      x1={circleRadius + outerPosition.x}
                      y1={circleRadius + outerPosition.y}
                      x2={circleRadius + innerPosition.x}
                      y2={circleRadius + innerPosition.y}
                      stroke="black"
                      strokeWidth={3}
                    />

                    {/* Inner Circle Element */}
                    <Circle cx={circleRadius + innerPosition.x} cy={circleRadius + innerPosition.y} r={2} fill="black" />

                    {/* Outer Circle Element */}
                    <SvgText
                      x={circleRadius + textPosition.x}
                      y={circleRadius + textPosition.y}
                      textAnchor="middle"
                      fontSize={textFontSize}
                      fill="black"
                    >
                      {letter}
                    </SvgText>
                  </React.Fragment>
                );
              })}

              {/* Center Letter */}
              <SvgText
                x={circleRadius}
                y={circleRadius + circleRadius / 13} // Adjust the vertical position as needed
                textAnchor="middle"
                fontSize={innertextFontSize}
                fill="black"
              >
                {innerCircle}
              </SvgText>
            </Svg>
          </View>
        </>
      )}
      <View style={style.crosssymbol}>
        <TouchableOpacity onPress={handleReset}>
          <Image source={require('../assets/images/refresh.png')}
            style={[{
              tintColor: 'black',
              height: 27,
              width: 26,
              marginEnd: 10
              // height: 34,
              // width: 34,
              // marginLeft: 10,
              // marginRight: 10,
              // // marginEnd: 50,
              // position: 'relative'
            }]} />
        </TouchableOpacity>
      </View>
    </View>
    <View style={[style.shadowCard, style.gameEditTex, { marginTop: 6, marginBottom: 15 }]}>


      <TextInput
        style={[style.textStyle, {
          flex: 1,
          padding: 10,
          color: 'black'
        }]}
        placeholder="Type Something....."
        placeholderTextColor={'grey'}
        value={inputValue}
        onChangeText={handleInputChange}
        autoFocus={true}
      />
      <TouchableOpacity
       onPress={handleButtonPress}
      >
        <Image source={require('../assets/images/send.png')}
          style={[{
            tintColor: 'black',
            height: 24,
            width: 24,
            marginEnd: 10
          }]} />
      </TouchableOpacity>
    </View>
    {renderValues()}

    {!isKeyboardOpen ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 32 }}>
      <CommonButton custom={style.gameBottomButton} text="Finish" onClick={() => {
        setfinish(true)
      }} />
      {/*In this code, I have implemented the Finish functionality */}
      <Modal animationType='slide' transparent={true} visible={gameFinish}>
        <View style={style.finishcontainer}>
          <View style={style.finishmodalBox}>
            <Text style={style.modalText}>Are you certain you wish to finish?</Text>
            <View style={style.Finishbuttons}>
              <TouchableOpacity style={style.closeButton} onPress={() => setfinish(false)}>
                <Text style={style.closeButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.closeButton} onPress={() => setscorecode(true)}>
                <Text style={style.closeButtonText}>Yes</Text>
              </TouchableOpacity>
              <Modal animationType='slide' transparent={true} visible={scorecard}>
                <View style={style.scorecode}>
                  <View style={style.scoremodalBox}>
                    <Text style={style.yourscore}>your Score</Text>
                    <Text style={style.point}>{userScore}</Text>
                    <Image source={cheersIcon} style={{ height: 120, width: 120, marginLeft: 60, marginTop: 10 }} />
                    <Text style={style.gametext}>You have successfully completed level</Text>
                    <TouchableOpacity style={style.donebtn} onPress={handleDonePress
                    }>
                      <Text style={style.doneButtonText}>DONE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </Modal>
      {/*In this code, I have implemented the New Game functionality */}
      <CommonButton custom={style.gameBottomButton} text="New" onClick={() => {
        // navigation.goBack()
        setnew(true)
      }} />
      <Modal animationType='slide' transparent={true} visible={newgame}>
        <View style={style.finishcontainer1}>
          <View style={style.finishmodalBox1}>
            <Text style={style.remainingword}>Just {correctAnswersCount} more words and the victory is yours!!</Text>
            <Text style={style.modalText1}>Do you really wish to begin a new game?</Text>
            <View style={style.Finishbuttons}>
              <TouchableOpacity style={style.closeButton} onPress={() => setnew(false)}>
                <Text style={style.closeButtonText}>Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.closeButton}onPress={handleButton}>
                <Text style={style.closeButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View> : null}
    <Modal
          animationType='slide'
          transparent={true}
          visible={meaningfulWordModalVisible}
          onRequestClose={() => setMeaningfulWordModalVisible(false)}
        >
          <View style={styles.finishcontainer}>
            <View style={styles.modalContent}>
              <Text style={styles.extramodalText}>Meaningful Word: {meaningfulWord}</Text>
            </View>
          </View>
        </Modal>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 34,
    marginTop: 18
  },
  resetButton: {
    marginLeft: 120,
  },

  ScrollViews: {
    height: 130,
    width: 350,
  },
  input: {
    // borderWidth:1,
    height: 50,
    width: 380,
    textAlign: 'left',
    marginVertical: -10,
    marginLeft: 15,
    color: 'black',
    fontSize: 18,
    fontFamily: fontFamily.robotoRegular,
    borderRadius: 10,
    shadowColor: colors.dark_grey,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,

    shadowOffset: { width: 1, height: 5 },
    backgroundColor: colorScheme() === 'dark' ? colors.light_grey : colors.white
  },
  ipvalue: {
    // borderWidth: 1,
    padding: 10,
    height: 50,
    width: 110,
    marginLeft: 40,
    marginTop: 20,
    backgroundColor: colorScheme() === 'dark' ? colors.white : colors.blue,
    color: 'black',
    borderRadius: 10,
    borderBlockColor: 'black'
  },
  valuetext: {
    textAlign: 'center',
    color: colorScheme() === 'dark' ? colors.blue : colors.white,
    fontSize: 20,
    fontFamily: fontFamily.robotoRegular,
    textTransform: 'capitalize'
  },
  finishcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  extramodalText: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: fontFamily.robotoRegular,
    color: 'black',
    textTransform:'uppercase'
  },



});