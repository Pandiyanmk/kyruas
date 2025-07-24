import { pdfurl } from "../Screens/viewfiles/PDFViewScreen"
import { routes } from "../Values/Routes"
import { URI, localEnum } from "../store/LocalDataStore"
import subjectSubject from '../Testsjson/StudentAllStatus.json';

export const teacherHomeworkJson = {

	"status": "OK",
	"message": "SUCCESS",
	"ClassId": 121,
	"ClassName": "ITA-PLEA-Grade 4 - C",
	"HomeWorkId": 798,
	"HomeWorkName": "Grade 4 Conversation Week 29",
	"HomeWorkDescription": "<p><span style=\"color:#0000cd\"><span style=\"font-size:14px\"><strong><u>உரையாடல் பயிற்சி: (2 &ndash; 4 நிமிடங்கள்)</u></strong></span></span></p>\n\n<ul>\n\t<li><span style=\"font-size:14px\">ஆசிரியர் உரையாடல் தலைப்பை கொடுக்கலாம் அல்லது மாணவர் உரையாடல் தலைப்பைத் தேர்ந்தெடுக்கலாம். மாணவர்கள் தலைப்பிற்கேற்ப பெற்றோர், உறவினர் அல்லது நண்பர்களுடன் பேச்சுத் தமிழில் கலந்துரையாடி, அதை ஒலிப்பதிவு செய்து ஆசிரியருக்கு அனுப்பவும். மாணவர்கள் தனியாகவும் பேசலாம். உரையாடல் பதிவேட்டில் பெற்றோர் கையொப்பம் இட வேண்டும். ஒருமுறை பயன்படுத்திய தலைப்பை மீண்டும் பயன்படுத்துவதைத் தவிர்க்கவும். எழுத்துத் தமிழில் பேசுவதைக் கூடியவரை தவிர்க்கவும். ஓரிரு சொற்கள் ஆங்கிலத்தில் பேசுவது தவறில்லை.</span></li>\n</ul>\n\n<p style=\"margin-left:40px\"><span style=\"font-size:14px\"><strong><u>குறிப்பு:</u></strong>&nbsp;உரையாடல் தலைப்பு உதாரணங்கள் பாடத்திட்டத்தின் இறுதியில் கொடுக்கப்பட்டுள்ளன. ஆசிரியர்கள் அதனை தேவைக்கேற்ப பயன்படுத்தலாம்.</span></p>\n\n<ul>\n\t<li><span style=\"font-size:14px\"><strong>Note: &nbsp;Only Audio files are allowed to upload. The maximum file size allowed is 50MB. Please use the recording option available on the portal to record and submit.</strong></span></li>\n</ul>\n",
	"EnrolledStudents": 9,
	"TurnedInStudents": 0,
	"GradedStudents": 0,
	"PendingStudents": 9,
	"TurnedInStudentDetails": {
		"StudentDetails": [
			{
				"Status": "Active",
				"StudentId": 1411,
				"StudentName": "Aditi Satheesh"
			}
		]
	},
	"GradedStudentDetails": {
		"StudentDetails": [
			{
				"Status": "Active",
				"StudentId": 1411,
				"StudentName": "Aditi Satheesh"
			}
		]
	},
	"ReturnedStudentDetails": {
		"StudentDetails": [
			{
				"Status": "Active",
				"StudentId": 1411,
				"StudentName": "Aditi Satheesh"
			}
		]
	},
	"PendingStudentDetails": {
		"StudentDetails": [
			{
				"Status": "Active",
				"StudentId": 1411,
				"StudentName": "Aditi Satheesh"
			},
			{
				"Status": "Active",
				"StudentId": 1069,
				"StudentName": "Anuj Aravind"
			},
			{
				"Status": "Active",
				"StudentId": 1428,
				"StudentName": "Ariya Bala"
			},
			{
				"Status": "Active",
				"StudentId": 1208,
				"StudentName": "Dhrti Karthikeyan"
			},
			{
				"Status": "Active",
				"StudentId": 3735,
				"StudentName": "Kavin Prasanna"
			},
			{
				"Status": "Active",
				"StudentId": 1231,
				"StudentName": "Riana Santiago"
			},
			{
				"Status": "Active",
				"StudentId": 1062,
				"StudentName": "Sarvesh Thirunavukkarasu"
			},
			{
				"Status": "Active",
				"StudentId": 1162,
				"StudentName": "Vishwa Ramkumar"
			},
			{
				"Status": "Active",
				"StudentId": 386,
				"StudentName": "Yashika Kalaiselvam"
			}
		]
	}
}

//Pending /Submitted / Returned / Graded
export const teacherHomeworkStatusDetails = {
	"status": "OK",
	"message": "SUCCESS",
	"ClassId": 129,
	"ClassName": "ITA-PLEA-Grade 5 - E",
	"StudentId": 1930,
	"StudentName": "Aadhira Karthik",
	"StudentProfile": "",
	"HomeWorkId": 933,
	"HomeWorkName": "Grade 5 Conversation Week 1",
	"HomeWorkDescription": "<p><span style=\"color:#0000cd\"><strong><span style=\"font-size:16px\"><u>உரையாடல் பயிற்சி: (3-4 நிமிடங்கள்)</u></span></strong></span></p>\n\n<ul>\n\t<li><span style=\"font-size:14px\">ஆசிரியர்&nbsp;உரையாடல் தலைப்பைக் கொடுக்கலாம். அல்லது மாணவர் உரையாடல் தலைப்பைத் தேர்ந்தெடுக்கலாம்.</span></li>\n\t<li><span style=\"font-size:14px\">மாணவர்கள் தலைப்பிற்கேற்ப பெற்றோர்,&nbsp;உறவினர் அல்லது நண்பர்களுடன் பேச்சுத் தமிழில் கலந்துரையாடி, அதை ஒலிப்பதிவு செய்து ஆசிரியருக்கு அனுப்பவும்.</span></li>\n\t<li><span style=\"font-size:14px\">மாணவர்கள் தனியாகவும் பேசலாம்.</span></li>\n\t<li><span style=\"font-size:14px\">உரையாடல் பதிவேட்டில் பெற்றோர் கையொப்பம் இடவேண்டும்.</span></li>\n\t<li><span style=\"font-size:14px\">ஒருமுறை பயன்படுத்திய தலைப்பை மீண்டும் பயன்படுத்துவதைத் தவிர்க்கவும்.</span></li>\n\t<li><span style=\"font-size:14px\">எழுத்துத் தமிழில் பேசுவதைக் கூடியவரை தவிர்க்கவும். ஓரிரு சொற்கள் ஆங்கிலத்தில் பேசுவது தவறில்லை.</span></li>\n</ul>\n\n<p style=\"margin-left: 40px;\"><span style=\"font-size:14px\"><strong><u>குறிப்பு:</u>&nbsp;</strong>உரையாடல் தலைப்பு உதாரணங்கள் பாடத்திட்டத்தின் இறுதியில் கொடுக்கப்பட்டுள்ளன. ஆசிரியர்கள் அதனை தேவைக்கேற்பப் பயன்படுத்தலாம்.</span></p>\n\n<ul>\n\t<li><span style=\"font-size:14px\"><strong>Note: &nbsp;Only Audio files are allowed to upload. The maximum file size allowed is 50MB. Please use the recording option available on the portal to record and submit the homework.</strong></span></li>\n</ul>\n",
	"StartDate": "13-08-2023",
	"DueDate": "20-08-2023",
	"AdditionalInfo": "",
	"TotalHWMarks": 5,
	"HomeWorkStatus": "Graded",
	"SupportingFiles": {
		"FileDetails": [
			{
				"FileId": 1318,
				"FileDisplayName": "15507_27-08-2023-09-01-47.wav",
				"FileType": "wav",
				"FileURL": "/LNAssignments/1044/15507_27-08-2023-09-01-47.wav"
			}
		]
	},
	"HomeWorkHistory": {
		"SRGDetails": [
			{
				"Status": "Enrolled",
				"StatusDate": "18-08-2023 05:12:48",
				"Comments": "Homework Enrolled"
			},
			{
				"Status": "Turned in Late",
				"StatusDate": "27-08-2023 03:31:52",
				"Comments": "Turned in Late done"
			},
			{
				"Status": "Graded",
				"StatusDate": "29-09-2023 06:20:00",
				"Comments": ""
			},
			{
				"Status": "Returned",
				"StatusDate": "27-08-2023 06:20:04",
				"Comments": ""
			},
			{
				"Status": "Graded",
				"StatusDate": "27-08-2023 06:23:24",
				"Comments": ""
			},
			{
				"Status": "Returned",
				"StatusDate": "27-08-2023 06:23:28",
				"Comments": ""
			},
			{
				"Status": "Graded",
				"StatusDate": "27-08-2023 06:24:59",
				"Comments": ""
			},
			{
				"Status": "Returned",
				"StatusDate": "27-08-2023 06:25:03",
				"Comments": ""
			},
			{
				"Status": "Graded",
				"StatusDate": "27-08-2023 06:25:30",
				"Comments": ""
			},
			{
				"Status": "Returned",
				"StatusDate": "27-08-2023 06:25:34",
				"Comments": ""
			},
			{
				"Status": "Graded",
				"StatusDate": "27-08-2023 06:26:50",
				"Comments": ""
			}
		]
	},
	"LastGradedScore": 5.00,
	"LastGradedComments": ""
}




export const statusDynamicallyUpdate = (type: any) => {
	console.log(type);

	switch (type) {
		case routes.returened_screen: {
			teacherHomeworkStatusDetails.HomeWorkStatus = 'Returned'
			break
		}
		case routes.pending: {
			teacherHomeworkStatusDetails.HomeWorkStatus = 'Pending'
			break
		}
		case routes.graded_screen: {
			teacherHomeworkStatusDetails.HomeWorkStatus = 'Graded'
			break
		}
		default: {
			teacherHomeworkStatusDetails.HomeWorkStatus = 'Submitted'

		}
	}
}



export const statusDynamicallyStudentUpdate = (type: any) => {
	console.log(type);

	switch (type) {
		case routes.returened_screen: {
			subjectSubject.HomeWorkStatus = 'Returned'
			break
		}
		case routes.pending: {
			subjectSubject.HomeWorkStatus = 'Pending'
			break
		}
		case routes.draft_Screen: {
			subjectSubject.HomeWorkStatus = 'Draft'
			break
		}
		case routes.graded_screen: {
			subjectSubject.HomeWorkStatus = 'Graded'
			break
		}
		default: {
			subjectSubject.HomeWorkStatus = 'Submitted'

		}
	}
}




